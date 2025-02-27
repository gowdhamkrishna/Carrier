import React, { useState } from "react";
import Roadmap from "./Roadmap";

const LineMap = ({ steps,setGoBack }) => {
  const [expandedStep, setExpandedStep] = useState(null);
  const [showRes, setRes] = useState(false);
  const [showCollege,setCollege] = useState(true);


  const getLimitedText = (text, limit = 100) => {
    let firstSentence = text.split(".")[0] + "."; // 
    if (firstSentence.length <= limit) {
      return firstSentence;
    }
    return text.length > limit ? text.slice(0, limit) + "..." : text; 
  };

  return (
    <div className="RoadMap bg-gradient-to-r from-teal-500/20 via-blue-200 to-white flex flex-col items-center bg-white justify-center p-6 w-full h-screen absolute overflow-y-auto">
      {!showRes ? (
        <>
          <div className="w-full max-w-6xl relative">
            {/* Main Horizontal Line */}
            <div className="absolute left-0 right-0 top-[50%] h-1 bg-gray-400 z-0"></div>
            <p className="top-10 text-red-900 text-[30px]">{steps.steps.title}</p>
            {/* Steps */}
            <div className="flex justify-between items-center relative">
              {steps.steps.map((step, index) => {
                const isOddStep = index % 2 !== 0;
                return (
                  <div
                    key={step.step}
                    className="flex flex-col items-center w-1/5 relative"
                    onMouseEnter={() => setExpandedStep(step.step)}
                    onMouseLeave={() => setExpandedStep(null)}
                  >
                    {/* Step Description */}
                    <div
                      className={`absolute text-center w-48 ${isOddStep ? "bottom-16" : "top-16"}`}
                    >
                      <h3 className="text-[17px] font-light text-gray-800">
                        {getLimitedText(step.desc)}
                      </h3>
                      {expandedStep === step.step && (
                        <p
                          className={`text-xs text-gray-600 absolute bg-white p-3 shadow-lg rounded-lg left-1/2 transform -translate-x-1/2 ${
                            isOddStep ? "-top-20" : "top-10"
                          } w-64 z-20`}
                        >
                          {step.roadmapdesc}
                        </p>
                      )}
                    </div>
                    {/* Step Number (Circle) */}
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg font-bold text-lg z-10">
                      {step.step}
                    </div>
                    {/* Vertical Connector */}
                    <div className="absolute top-[50%] left-1/2 w-1 h-10 bg-gray-400 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="fixed bottom-0 justify-around hover:bg-white bg-white/25 p-2 backdrop-blur-lg border border-gray-950/10 w-[50vw] flex items-center rounded-[30px]">
       
            <button onClick={()=>{window.location.reload()} } className="flex items-center justify-center w-[150px] h-[50px] rounded-[30px] border border-blue-500 bg-gradient-to-t from-[#D8D9DB] via-white to-[#FDFDFD] text-gray-600 font-semibold text-sm shadow-sm transition-all duration-200 ease-in-out hover:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_3px_3px_#CECFD1] active:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] focus:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] outline-none">
              Go Back
            </button>

            <button onClick={()=>{setRes(true)}}className="flex items-center justify-center w-[150px] h-[50px] rounded-[30px] border border-blue-500 bg-gradient-to-t from-[#D8D9DB] via-white to-[#FDFDFD] text-gray-600 font-semibold text-sm shadow-sm transition-all duration-200 ease-in-out hover:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_3px_3px_#CECFD1] active:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] focus:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] outline-none">
              Resources
            </button>
          </div>
        </>
      ) :
       <>
      <div className="flex items-center justify-center flex-col">
        <Roadmap steps={steps} />
      <div className="fixed bottom-0 justify-around hover:bg-white/5 bg-white/25 p-2 backdrop-blur-lg border border-gray-950/10 w-[50vw] flex items-center rounded-[30px]">
            <button onClick={()=>{setRes(false)} } className="flex items-center justify-center w-[150px] h-[50px] rounded-[30px] border border-blue-500 bg-gradient-to-t from-[#D8D9DB] via-white to-[#FDFDFD] text-gray-600 font-semibold text-sm shadow-sm transition-all duration-200 ease-in-out hover:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_3px_3px_#CECFD1] active:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] focus:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] outline-none">
              
              Go Back
            </button>
            <button  className="flex items-center justify-center w-[150px] h-[50px] rounded-[30px] border border-blue-500 bg-gradient-to-t from-[#D8D9DB] via-white to-[#FDFDFD] text-gray-600 font-semibold text-sm shadow-sm transition-all duration-200 ease-in-out hover:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_3px_3px_#CECFD1] active:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] focus:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] outline-none">
              Resources
            </button>
            <button onClick={()=>{setCollege(true)}}  className="flex items-center justify-center w-[150px] h-[50px] rounded-[30px] border border-blue-500 bg-gradient-to-t from-[#D8D9DB] via-white to-[#FDFDFD] text-gray-600 font-semibold text-sm shadow-sm transition-all duration-200 ease-in-out hover:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_3px_3px_#CECFD1] active:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] focus:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] outline-none">
               Colleges
            </button>
          </div>
      </div>
      </>}
    </div>
  );
};

export default LineMap;
