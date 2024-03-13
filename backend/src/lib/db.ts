import mongoose from 'mongoose';

class Database {
    private connection: mongoose.Connection | null;

    constructor() {
        this.connection = null;
    }

    async connect(uri: string): Promise<mongoose.Connection> {
        if (!this.connection) {
            try {
                const conn = await mongoose.connect(uri);
                this.connection = mongoose.connection;

                console.log('Connected to the database');
            } catch (error) {
                console.error('Error connecting to the database:', error);
                throw error;
            }
        }

        return this.connection;
    }

    async disconnect(): Promise<void> {
        if (this.connection) {
            try {
                await mongoose.disconnect();

                console.log('Disconnected from the database');
            } catch (error) {
                console.error('Error disconnecting from the database:', error);
                throw error;
            } finally {
                this.connection = null;
            }
        }
    }
}

const database = new Database();

export default database;
