import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Quiz(){
    const navigate = useNavigate();
     const [questions, setQuestions] = useState();
     const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
     const [score, setScore] = useState(0);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
        const fetchQuizData = async () => {

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/quiz`)
                console.log(response);
                if(response?.data?.success){
                    setQuestions(response?.data?.data?.questions);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching quiz data:", error)
            }
        }
        fetchQuizData();
     },[]);

     if(isLoading){
        return <div className="text-center text-xl pt-10 bg-gradient-to-br from-blue-500 to-indigo-700 min-h-screen">Loading Quiz...</div>
     }
    return(
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white min-h-screen">
            Quiz section
        </div>
    );
}

export default Quiz;