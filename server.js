// 1️⃣ Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 2️⃣ Initialize Express
const app = express();

// 3️⃣ Middleware
app.use(cors());
app.use(express.json());

// 4️⃣ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://LomMongod:YourPassword@cluster0.gbomscx.mongodb.net/mongotuts?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log("Error:", err));


// 7️⃣ Test route
app.get("/", (req, res) => {
    res.json({ message: "Library API running" });
});

// 8️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));