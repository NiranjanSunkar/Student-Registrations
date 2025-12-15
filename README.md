Student Registration Full-Stack Application

A full-stack web application for managing college student registrations.
Users can add, view, and delete student details through a clean UI connected to a MongoDB database.

Features

Add new student details

View all registered students

Delete student records

RESTful APIs using Express.js

MongoDB database integration

Responsive and professional UI


Tech Stack
Frontend

React.js

HTML5

CSS3

JavaScript

Axios

Backend

Node.js

Express.js

MongoDB

Mongoose

Project Structure
FullStackApp/
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   └── myapp/
│       ├── src/
│       ├── public/
│       └── package.json
│
└── README.md


API Endpoints
Method	Endpoint	Description
POST	/students/registrations	Register a student
GET	/api/students	Fetch all students
DELETE	/api/students/:id	Delete student

Backend Setup
cd Backend
npm install

Frontend Setup
cd Frontend/myapp
npm install
npm start
