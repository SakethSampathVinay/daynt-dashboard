import mongoose  from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sakethsampath2006:kQSBM1QNe8mBxzOo@cluster0.780eh.mongodb.net/")
        console.log("Connected to MongoDB Successfully");
    } catch(error) {
        console.log("Failed to connect to MongoDB: ", error)
    }
}

export default connectToDB;