# QuizApp

QuizApp is an interactive quiz application designed to test users' knowledge on various topics. Users can take quizzes, view their results, and review their answers after completing the quiz. The app provides real-time feedback and performance metrics, such as total score and correct/wrong answers.

## Features

- **Interactive Quiz**: Take quizzes with multiple-choice questions and receive a score at the end.
- **Timer**: Answer the quiz within a specified time limit.
- **Dynamic Result Messages**: Receive a dynamic message based on quiz performance (Excellent, Good job, or Keep trying).
- **Quiz Review**: Review answers after completing the quiz.
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop devices.
- **Result Progress Bar**: Display progress of the quiz in a progress bar format.

## Technologies Used

**Frontend** => React, Tailwind CSS
**Backend** => Node.js, Express.js

## API Endpoints
-> GET /api/quiz : Fetch all the quiz questions from the backend(Using Axios)

-> All the data are Stored in Session Storage

## Deployment
**Frontend**: The frontend is deployed on Vercel. You can access the live demo at the following URL:
  - [Frontend URL](https://quiz-app-six-pi-44.vercel.app)

**Backend**: The backend (API) is deployed on Render. It is responsible for fetching quiz data and sending it back to the frontend for display.
  - [Backend URL](https://quiz-app-niqd.onrender.com) 

 -> To see the fetched quiz data, visit: BackendUrl/api/quiz

 -> Render take time to restart the server approximately 40 sec.


## How to Run Locally

1.Clone the repository

**Using command** -> git clone https://github.com/Roshan21p/Quiz-App.git

**For Frontend**
1. cd quizapp
2. cd Frontend
3. npm install
4. npm run dev

**For Backend**
1. cd quizapp
2. cd Backend
3. npm install
4. npm start

## Environment Variables Setup

create .env file in root directory for both frontend and backend

**For Frontend**
VITE_BACKEND_URL= http://localhost:3000 || https://quiz-app-niqd.onrender.com

**For Backend**
FRONTEND_URL=http://localhost:5173

## Google Drive File Support

**Storing Images and Videos at Google Drive**

[Video1](https://drive.google.com/file/d/1QbN2TpKrmacgb4XsPhMzW6WUz5Vi6fYS/view?usp=sharing)
[Video2](https://drive.google.com/file/d/1QeX4khMMMw4APe4qTW1v0Ag7V4I4Ylho/view?usp=sharing)
[Images](https://drive.google.com/file/d/1QfU5rSyTvU8eNGMNVxi3d3ouRUBZS1Sz/view?usp=sharing)

