import mongoose from "mongoose"

const connectToDB = async () => {
  const connectionUrl = "mongodb+srv://kushal:kushal@nextjs-blog-2024.ety0c.mongodb.net/"

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error))

}

export default connectToDB;

