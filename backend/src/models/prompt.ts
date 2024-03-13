import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
});

const Prompt = mongoose.model('Prompt', promptSchema);

export default Prompt;