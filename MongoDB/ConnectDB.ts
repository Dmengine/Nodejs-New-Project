import mongoose from "mongoose"

export const Connect =  async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGOOSE_URI as string)
        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        console.log("Failed to cvonnect to MongoDB", error)
    }
}