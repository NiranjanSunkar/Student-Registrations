const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotEnv = require("dotenv");

const app = express();

/* =========================
   Middlewares
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   Environment Config
========================= */
dotEnv.config();

/* =========================
   MongoDB Connection
========================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Database Connected Successfully!"))
  .catch((error) => console.log(error));

/* =========================
   Student Schema & Model
========================= */
const studentSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    department: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

/* =========================
   APIs
========================= */

// Test API
app.get("/", (req, res) => {
  res.send("Student Registration API is running");
});

// ➕ POST: Register Student
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    console.log("Student saved:", student);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📄 GET: Fetch All Students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ❌ DELETE: Remove student by ID
app.delete("/api/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


/* =========================
   Server Start
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


