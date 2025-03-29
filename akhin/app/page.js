"use client";
import React, { useState, useEffect } from "react";
import { getPromptResponse } from "../server";
import Loader from "./components/loader";
import LineMap from "./components/LineMap.js";
import Roadmap from "./components/Roadmap";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from 'react-toastify';
const Typewriter = ({ text, speed = 100, loop = true }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (loop) {
      setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, speed * 5);
    }
  }, [index, text, speed, loop]);

  return (
    <span className="font-mono text-[24px] md:text-[30px] text-blue-300/80 animate-pulse">
      {displayedText}
    </span>
  );
};

const Page = () => {
  
  const [json, setJson] = useState({
 
});
  const [steps, setSteps] = useState();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("role");
  const { isSignedIn } = useUser();
  

  const Role = [
    "Frontend", "Full Stack Developer", "Backend Developer", "Android Developer", "iOS Developer", "Machine Learning Engineer", "Data Scientist", "Product Manager", "UX/UI Designer", "QA Engineer", "Software Engineer", "DevOps Engineer", "Architect", "Project Manager"
  ];
  
  const Skill = [
    "Web Development", "React", "Node.js", "Frontend Development", "Backend Development", "Full Stack Development", "Machine Learning", "Artificial Intelligence", "Cybersecurity", "Blockchain", "Cloud Computing", "DevOps", "Trading", "Stock Market Analysis", "UI/UX Design", "Mobile App Development", "Game Development", "Python Programming", "JavaScript", "Data Science", "Software Testing", "Project Management", "Database Management", "System Architecture"
  ];

  useEffect(() => {
    if (json?.steps) {
      setSteps(json);
    }
  }, [json]);

  const handleClickButton = async (prompt) => {
    if (!isSignedIn) {
      toast("You must be signed in");
      return;
    }
    setLoading(true);
    try {
      const response = prompt ? await getPromptResponse(prompt) : await getPromptResponse(input);
      setJson(response);
      console.log("Prompt response:", response);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="dark"
        className="mt-16"
      />
      
      <div className="w-full md:w-1/3 h-full skillContainer bg-gradient-to-r from-slate-900/90 to-blue-900/20 backdrop-blur-lg border-r border-white/5 shadow-2xl">
        <div className="w-full md:w-[33vw] h-full pt-[90px] flex flex-col items-center overflow-scroll scrollbar-hide">
          <div className="flex fixed z-[100] pt-16 backdrop-blur-xl w-full md:w-[34vw] bg-gradient-to-b from-slate-900 to-slate-900/95 left-0 border-b border-white/5 shadow-lg">
            <p
              onClick={() => setActiveTab("role")}
              className={`text-[20px] px-4 md:px-8 cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-400 relative group ${
                activeTab === "role" ? "text-blue-400 font-medium" : "text-white/50"
              }`}
            >
              Role based Roadmaps
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transform scale-x-0 transition-transform duration-300 ${
                activeTab === "role" ? "scale-x-100" : "group-hover:scale-x-75"
              }`}></span>
            </p>

            <p
              onClick={() => setActiveTab("skill")}
              className={`text-[20px] px-4 md:px-8 cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-400 relative group ${
                activeTab === "skill" ? "text-blue-400 font-medium" : "text-white/50"
              }`}
            >
              Skill based Roadmaps
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transform scale-x-0 transition-transform duration-300 ${
                activeTab === "skill" ? "scale-x-100" : "group-hover:scale-x-75"
              }`}></span>
            </p>
          </div>
          <div className="pt-[83px] w-full px-4">
            {(activeTab === "role" ? Role : Skill).map((item, index) => (
              <div
                onClick={() => handleClickButton(item)}
                className="group w-full text-white/90 text-[18px] font-light hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-500/20 hover:text-white transition-all duration-500 text-center rounded-xl border border-white/5 backdrop-blur-lg bg-white/5 p-4 mb-3 relative overflow-hidden shadow-lg hover:shadow-blue-500/5"
                key={index}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="relative z-10">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col containerRight w-full md:w-2/3 h-full bg-gradient-to-br from-slate-900/50 via-blue-900/20 to-slate-900/50 backdrop-blur-lg items-center justify-center relative p-4 text-center">
        <div className="transform hover:scale-105 transition-transform duration-500">
          <p className="text-[40px] md:text-[80px] font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg mb-6 tracking-tight">
            Career Roadmaps with AI
          </p>
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 backdrop-blur-md border border-white/5 shadow-lg">
            <Typewriter text={"AI will Generate your Roadmaps..."} loop={true} speed={100} />
          </div>
        </div>
      </div>

      <div className="fixed rounded-2xl bottom-4 w-full md:w-[60vw] md:left-[35vw] bg-gradient-to-r from-slate-900/90 to-slate-800/90 border border-white/10 shadow-2xl backdrop-blur-xl p-4 flex flex-col md:flex-row items-center justify-center">
        <div className="input-container w-full max-w-[90vw] md:max-w-[70vw] flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
          <input
            className="w-full p-4 text-lg font-mono placeholder:text-[18px] md:placeholder:text-[20px] placeholder:text-slate-400 rounded-xl bg-slate-800/50 border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-inner"
            placeholder="Enter the roadmap Prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="w-full md:w-auto backdrop-blur-lg group font-medium flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-8 h-12 text-white text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/20 border border-white/10"
            onClick={() => input.trim() !== "" ? handleClickButton() : toast("Enter valid Input")}
          >
            <span className="group-hover:scale-105 transition-transform duration-300">Generate</span>
          </button>
        </div>
      </div>

      {loading ? <Loader /> : steps?.steps && < LineMap steps={steps} />}
    </div>
  );
};

export default Page;  