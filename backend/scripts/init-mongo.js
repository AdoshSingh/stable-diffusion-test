const mongoose = require("mongoose");
const dotenv = require("dotenv");

const promptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
});

const Prompt = mongoose.model('Prompt', promptSchema);

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  prompt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true,
  },
});

const Image = mongoose.model('Image', imageSchema);

dotenv.config();

const mongoURI = process.env.MONGO_URI || "your_default_mongo_uri_here";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const promptsData = [
  "A vast, enchanted forest under a twilight sky, with towering ancient trees, glowing mushrooms, and a clear, meandering stream reflecting the stars above. The atmosphere is magical and serene, with faint, ethereal lights flickering in the distance.",
  "An astronaut exploring a distant alien planet, with bizarre, colorful vegetation and towering rock formations. The sky is a vibrant shade of orange, with two moons visible above. The astronaut's suit is sleek and modern, with glowing elements, and they are examining a glowing, mysterious artifact.",
  "An ethereal portrait of a forest elf, set in an enchanted woodland glade bathed in moonlight. The elf has delicate, pointed ears and is adorned with natural elements like leaves, vines, and flowers woven into their hair. Their expression is serene and wise, and their eyes seem to hold ancient secrets.",
  "A neon-drenched cyberpunk city at night, bustling with life. Skyscrapers stretch into the sky, adorned with holographic advertisements. Rain-slicked streets reflect the neon glow, with crowds of diverse, futuristic inhabitants and flying cars weaving between buildings.",
];

async function insertDocuments() {
  try {

    await Prompt.deleteMany({});
    await Image.deleteMany({});

    const promptDocuments = await Prompt.insertMany(
      promptsData.map((prompt) => ({ prompt }))
    );
    console.log("Prompts inserted");

    const imagesData = promptDocuments.map((promptDoc, index) => ({
      name: `sample_${index + 1}`,
      path: `/samples/sample_${index + 1}.jpg`,
      prompt: promptDoc._id,
    }));

    await Image.insertMany(imagesData);
    console.log("Images inserted");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting documents:", error);
    mongoose.connection.close();
  }
}

insertDocuments();
