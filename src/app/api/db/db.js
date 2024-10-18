export const runtime = 'nodejs'

import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        if(mongoose.connections && mongoose.connections[0].readyState) return
        const {connection} = await mongoose.connect(
            process.env.MONGO_URI
        )

        console.log(`Connected to database: ${connection.host}`);
        
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting Database');
    }
}

