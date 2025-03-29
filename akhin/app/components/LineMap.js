import React, { useState } from "react";
import Roadmap from "./Roadmap";
import College from "./college";

const LineMap = ({ steps, setGoBack }) => {
  const [expandedStep, setExpandedStep] = useState(null);
  const [showRes, setRes] = useState(false);
  const [showCollege, setCollege] = useState(false);

  const getLimitedText = (text, limit = 100) => {
    let firstSentence = text.split(".")[0] + "."; // 
    if (firstSentence.length <= limit) {
      return firstSentence;
    }
    return text.length > limit ? text.slice(0, limit) + "..." : text; 
  };

  return (
    <div className="RoadMap bg-gradient-to-br from-slate-900 via-gray-900/55 to-slate-900 flex flex-col items-center justify-center p-6 w-full h-screen absolute overflow-y-auto">
      {showCollege ? (
        <College json={steps} setCollege={setCollege} />
      ) : !showRes ? (
        <>
          <div className="w-full max-w-6xl relative">
            {/* Main Horizontal Line */}
            <div className="absolute left-0 right-0 top-[50%] h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 z-0 shadow-lg"></div>
            
            {/* Title */}
            <p className="mb-12 text-[36px] font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {steps.steps.title}
            </p>

            {/* Steps */}
            <div className="flex justify-between items-center relative">
              {steps.steps.map((step, index) => {
                const isOddStep = index % 2 !== 0;
                return (
                  <div
                    key={step.step}
                    className="flex flex-col items-center w-1/5 relative group"
                    onMouseEnter={() => setExpandedStep(step.step)}
                    onMouseLeave={() => setExpandedStep(null)}
                  >
                    {/* Step Description */}
                    <div
                      className={`absolute text-center w-48 ${
                        isOddStep ? "bottom-16" : "top-16"
                      }`}
                    >
                      <h3 className="text-[17px] font-light text-blue-100 bg-slate-900/90 rounded-lg p-2">
                        {getLimitedText(step.desc)}
                      </h3>
                      {expandedStep === step.step && (
                        <p
                          className={`text-sm text-white absolute bg-gradient-to-br from-slate-800 to-blue-900 p-4 shadow-xl rounded-xl left-1/2 transform -translate-x-1/2 ${
                            isOddStep ? "-top-24" : "top-12"
                          } w-72 z-20 border border-white/10 transition-all duration-300 ease-in-out`}
                        >
                          {step.roadmapdesc}
                        </p>
                      )}
                    </div>

                    {/* Step Number (Circle) */}
                    <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full shadow-lg font-bold text-lg z-10 group-hover:scale-110 group-hover:shadow-cyan-500/25 transition-all duration-300 border border-white/20">
                      {step.step}
                    </div>

                    {/* Vertical Connector */}
                    <div className="absolute top-[50%] left-1/2 w-0.5 h-12 bg-gradient-to-b from-blue-400 to-cyan-500 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-50"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Bar */}
          <div className="fixed bottom-4 justify-around bg-gradient-to-r from-slate-900 to-blue-900 p-4 border border-white/10 w-[50vw] flex items-center rounded-2xl shadow-2xl gap-4">
            <button 
              onClick={() => {window.location.reload()}} 
              className="flex items-center justify-center w-[150px] h-[50px] rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-white/10 group"
            >
              <span className="group-hover:scale-105 transition-transform duration-300">Go Back</span>
            </button>
            
            <button 
              onClick={() => setCollege(true)} 
              className="flex items-center justify-center w-[150px] h-[50px] rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 border border-white/10 group"
            >
              <span className="group-hover:scale-105 transition-transform duration-300">Colleges</span>
            </button>
            
            <button 
              onClick={() => setRes(true)} 
              className="flex items-center justify-center w-[150px] h-[50px] rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-white/10 group"
            >
              <span className="group-hover:scale-105 transition-transform duration-300">Resources</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center flex-col">
            <Roadmap steps={steps} />
            
            {/* Resources Bottom Bar */}
            <div className="fixed bottom-4 justify-around bg-gradient-to-r from-slate-900 to-blue-900 p-4 border border-white/10 w-[50vw] flex items-center rounded-2xl shadow-2xl gap-4">
              <button 
                onClick={() => {setRes(false)}} 
                className="flex items-center justify-center w-[150px] h-[50px] rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-white/10 group"
              >
                <span className="group-hover:scale-105 transition-transform duration-300">Go Back</span>
              </button>
              
              <button 
                className="flex items-center justify-center w-[150px] h-[50px] rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 border border-white/10 group"
              >
                <span className="group-hover:scale-105 transition-transform duration-300">Resources</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LineMap;
