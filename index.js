const express = require("express")
const mongoose  = require("mongoose")
const bp = require("body-parser")
const transactionRoutes = require("./controllers/transactionController")

const PORT = 5000;
const URL = `mongodb+srv://admin:admin123@cluster0.qdlb3iz.mongodb.net/abc?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.use(bp.json())

app.use("/api", transactionRoutes)

const startServer = async () => {
    await mongoose.connect(URL);
    console.log(`Conected to mongodb database !!`)
    app.listen(PORT,() =>{
        console.log(`Server is running on port ${PORT}`)
    })
}
startServer()

