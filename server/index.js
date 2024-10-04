const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const dotenv = require("dotenv");
const userRouter = require("./src/routes/user");

dotenv.config();

app.get("/api", (req, res)=>{
    res.json({message : "Hello from server!"});
});

const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{console.log("Successfully connected to MongoDB");})
    .catch((err)=>{console.log(err);})

app.use(express.json());


app.use("/api/users/", userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);
});