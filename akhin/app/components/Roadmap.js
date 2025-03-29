"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Roadmap = ({steps}) => {
  const router = useRouter();
  
  const getThumbnailUrl = (url) => {
    try {
      const videoId = new URL(url).searchParams.get("v");
      return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : "";
    } catch (error) {
      return "";
    }
  };

  return (
    <div className="flex   w-[100vw] overflow-scroll absolute h-[100vh] gap-6 flex-col items-center bg-gradient-to-r from-teal-800 via-slate-200 to-blue-600">
      <p className="mt-[100px] text-[30px] text-blue-950  bg-gray-950/10 font-serif backdrop-blur-lg border border-x-gray-50/10 text-center ">
        {steps.title}
      </p>
      <div className="RoadmapContainer "></div>
      {steps.steps.map((steps, index) => (
        <div
          className="cards w-[90vw] p-3   rounded-lg backdrop-blur-lg border border-gray-950/10"
          key={index}
        >
          <div className="flex  gap-7  ">
            <div className="w-[40px] h-[40px] text-white rounded-full bg-gradient-to-tr from-teal-700/55 to-blue-700 backdrop-blur-lg flex items-center justify-center">
              {steps.step}
            </div>
            <div className="text-center font-light text-[20px] stepDes">
              {steps.desc}
            </div>  
          </div>
          <div className="cardContainer flex  overflow-scroll">
            {steps.resources.youtube.map((video, index) => (
              <div key={index} className=" ">
                <div className="flex hover:bg-green-300/30  flex-col m-4 w-[350px]  items-center bg-gradient-to-r from-green-900/20 to-blue-500/10 mx-2 border border-blue-950/20 backdrop-blur-lg rounded-lg p-4">
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  
                  <Image
                    alt="none"
                    width={500}
                    height={500}
                    className="w-[300px] h-[300px]"
                    src={getThumbnailUrl(video.url)}
                    ></Image>
                    
                    </a>
                  <p className="VideoT w-[10vw] h-[8vw] p-1 overflow-hidden text-center">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
