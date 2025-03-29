"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router
import jsonData from "../questions.json";
import { CarrerDesc } from "@/server";

const STYLES = {
  container: "min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col items-center justify-center p-6",
  card: "bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-blue-200/10",
  heading: "text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200",
  button: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg",
  optionCard: "flex items-center space-x-3 p-4 bg-blue-900/10 backdrop-blur-md rounded-xl hover:bg-blue-800/20 transition-all duration-300 cursor-pointer border border-blue-200/10",
  resultCard: "p-6 bg-blue-900/20 backdrop-blur-md rounded-xl hover:bg-blue-800/30 transition-all duration-300 border border-blue-200/10 shadow-lg",
  resultText: "text-blue-50 leading-relaxed text-lg",
  resultSection: "mb-8 last:mb-0",
  resultCategory: "text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200",
  resultList: "list-disc list-inside space-y-2 text-blue-50 ml-4",
};

const Page = () => {
  const router = useRouter(); // Initialize the router
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [result, setResult] = useState(null); // State to store server response
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button disabled state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setQuestions(jsonData.questions);
      } catch (err) {
        setError("Failed to load questions. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    try {
      const category = questions[currentQuestionIndex].category;
      const question = questions[currentQuestionIndex].questions[0].question;

      setAnswers((prev) => ({
        ...prev,
        [category]: { ...prev[category], [question]: selectedOptions },
      }));

      setSelectedOptions([]);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const SendServer = async (params) => {
    console.log(answers);
    const response = await CarrerDesc(answers); // Get the server response
    return response; // Return the response
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await SendServer();
      setResult(res);
    } catch (error) {
      setError("Failed to submit answers. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatResponseData = (data) => {
    return Object.entries(data).map(([category, details]) => {
      return {
        category,
        question: Object.keys(details)[0],
        answers: Object.values(details)[0]
      };
    });
  };

  if (isLoading) {
    return (
      <div className={STYLES.container}>
        <div className={STYLES.card}>
          <div className="animate-pulse text-blue-200">Loading questions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={STYLES.container}>
        <div className={STYLES.card}>
          <div className="text-red-400 text-center">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className={`${STYLES.button} mt-4`}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className={`${STYLES.container} pt-20`}>
        <div className={`${STYLES.card} w-full max-w-[800px]`}>
          {result ? (
            <>
              <h1 className={`${STYLES.heading} text-4xl mb-10`}>
                Your Profile Summary
              </h1>
              
              {formatResponseData(answers).map((section, index) => (
                <div key={index} className={STYLES.resultCard}>
                  <h2 className={STYLES.resultCategory}>
                    {section.category}
                  </h2>
                  <div className="mb-4">
                    <p className="text-blue-200 mb-2">
                      {section.question}
                    </p>
                    <ul className={STYLES.resultList}>
                      {section.answers.map((answer, idx) => (
                        <li key={idx} className="text-lg leading-relaxed">
                          {answer}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <div className={`${STYLES.resultCard} mt-8 bg-blue-900/30`}>
                <h2 className={STYLES.resultCategory}>
                  Career Suggestions
                </h2>
                <div className="space-y-3">
                  {result.split("\n").map((suggestion, index) => (
                    <p key={index} className="text-lg text-blue-50 leading-relaxed">
                      {suggestion}
                    </p>
                  ))}
                </div>
              </div>

              <button
                onClick={() => router.push("/")}
                className={`${STYLES.button} w-full mt-10 text-lg font-medium`}
              >
                Go Back to Main Page
              </button>
            </>
          ) : (
            <>
              <h1 className={STYLES.heading}>
                Thank you for completing the form!
              </h1>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`${STYLES.button} mt-6 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const currentCategory = questions[currentQuestionIndex];
  const currentQuestion = currentCategory.questions[0];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className={STYLES.container}>
      <div className={`${STYLES.card} w-full max-w-2xl mt-8`}>
        <div className="w-full bg-blue-900/20 backdrop-blur-md rounded-full h-3 mb-8">
          <div
            className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h2 className={STYLES.heading}>{currentCategory.category}</h2>

        <p className="text-xl text-blue-50 text-center mb-8">
          {currentQuestion.question}
        </p>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={STYLES.optionCard}
            >
              <input
                type="checkbox"
                className="w-5 h-5 accent-blue-400"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              <span className="text-blue-50">{option}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedOptions.length === 0}
          className={`${STYLES.button} w-full mt-8 ${
            selectedOptions.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;