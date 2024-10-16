import mongoose from "mongoose";

const connect = async () => {
    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongo bağlantısı başarılı.");
    } catch (error) {
        throw new Error("Mongoose'a bağlanırken hata.");
    }
};

export default connect;