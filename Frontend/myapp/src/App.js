import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    email: "",
    department: "",
    year: "",
    phone: ""
  });

  /* =========================
     FETCH STUDENTS (GET)
  ========================= */
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* =========================
     ADD STUDENT (POST)
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/students", {
        ...formData,
        year: Number(formData.year) // important
      });

      // clear form
      setFormData({
        rollNumber: "",
        name: "",
        email: "",
        department: "",
        year: "",
        phone: ""
      });

      // refresh UI
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student");
    }
  };

  /* =========================
     DELETE STUDENT
  ========================= */
const deleteStudent = async (id) => {
  if (!window.confirm("Are you sure you want to delete this student?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents(); // refresh table
  } catch (error) {
    console.error("Error deleting student:", error);
    alert("Failed to delete student");
  }
};


  return (
    <div className="container">
      <h2>Student Registration</h2>

      {/* 🔹 ADD STUDENT FORM */}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      {/* 🔹 STUDENT TABLE */}
      <h2>Student List</h2>

      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Year</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="7">No students found</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.phone}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;





