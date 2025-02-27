"use client";
import React, { useState, useEffect } from "react";
import { getPromptResponse } from "../server";
import Loader from "./components/loader";
import LineMap from "./components/LineMap.js";
import Roadmap from "./components/Roadmap";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from 'react-toastify';
import College from "./components/college";
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
    <span className="font-mono text-[30px] text-black/">{displayedText}</span>
  );
};

const Page = () => {
  
  const [json, setJson] = useState({
    "title": "Full Stack Developer Roadmap",
    "steps": [
        {
            "step": 1,
            "desc": "Learn the Fundamentals of Front-End Development (HTML, CSS, JavaScript)",
            "roadmapdesc": "Master the building blocks of web interfaces. Focus on creating semantic HTML, styling with CSS, and adding interactivity with JavaScript. Understand the DOM and browser rendering.",
            "resources": {
                "youtube": [
                    {
                        "title": "HTML &amp; CSS Full Course - Beginner to Pro",
                        "url": "https://www.youtube.com/watch?v=G3e-cpL7ofc"
                    },
                    {
                        "title": "HTML, CSS, and Javascript in 30 minutes",
                        "url": "https://www.youtube.com/watch?v=_GTMOmRrqkU"
                    },
                    {
                        "title": "HTML Tutorial for Beginners | Complete HTML with Notes &amp; Code",
                        "url": "https://www.youtube.com/watch?v=HcOc7P5BMi4"
                    },
                    {
                        "title": "HTML Tutorial for Beginners: HTML Crash Course",
                        "url": "https://www.youtube.com/watch?v=qz0aGYrrlhU"
                    },
                    {
                        "title": "JavaScript Course for Beginners – Your First Step to Web Development",
                        "url": "https://www.youtube.com/watch?v=W6NZfCO5SIk"
                    }
                ]
            }
        },
        {
            "step": 2,
            "desc": "Learn a Front-End Framework (React, Angular, or Vue.js)",
            "roadmapdesc": "Choose a popular framework to build complex UIs. React is recommended for its component-based architecture and vast ecosystem. Angular is a comprehensive framework suited for enterprise applications. Vue.js is a progressive framework known for its simplicity.",
            "resources": {
                "youtube": [
                    {
                        "title": "I built the same app 10 times // Which JS Framework is best?",
                        "url": "https://www.youtube.com/watch?v=cuHDQhDhvPE"
                    },
                    {
                        "title": "What&#39;s The Most Popular Front End Framework and Which Should i learn (React Angular Vue)",
                        "url": "https://www.youtube.com/watch?v=BsbegGfE5fA"
                    },
                    {
                        "title": "What Is The BEST Front-End Framework? React vs Vue.js vs Angular!",
                        "url": "https://www.youtube.com/watch?v=7JUzWnnBcsM"
                    },
                    {
                        "title": "Frontend Development - Angular v/s React v/s Vue.js",
                        "url": "https://www.youtube.com/watch?v=seCfs39HTtE"
                    },
                    {
                        "title": "React vs Angular vs Vue: Which JavaScript Framework Should You Choose?",
                        "url": "https://www.youtube.com/watch?v=a3JeapNlurg"
                    }
                ]
            }
        },
        {
            "step": 3,
            "desc": "Learn Back-End Development (Node.js, Python with Flask/Django, or Java with Spring)",
            "roadmapdesc": "Choose a back-end technology based on your interests and job market demand. Node.js is JavaScript-based and good for real-time applications. Python with Flask/Django is excellent for data-driven applications. Java with Spring is suitable for enterprise-level projects.",
            "resources": {
                "youtube": [
                    {
                        "title": "Django Tutorial for Beginners – Build Powerful Backends",
                        "url": "https://www.youtube.com/watch?v=rHux0gMZ3Eg"
                    },
                    {
                        "title": "Python Backend Web Development Course (with Django)",
                        "url": "https://www.youtube.com/watch?v=jBzwzrDvZ18"
                    },
                    {
                        "title": "Complete Backend Software Engineer Mind Map - Everything You Need to Know (2 HOURS!)",
                        "url": "https://www.youtube.com/watch?v=oVfw8Oj-uH8"
                    },
                    {
                        "title": "🔥 Backend Development Full Course 2023 | Learn Backend From Scratch | Node JS | Django | Simplilearn",
                        "url": "https://www.youtube.com/watch?v=w_L5XMp44tc"
                    },
                    {
                        "title": "Django Tutorial for Beginners | Full Course",
                        "url": "https://www.youtube.com/watch?v=OTmQOjsl0eg"
                    }
                ]
            }
        },
        {
            "step": 4,
            "desc": "Learn Databases (SQL and NoSQL)",
            "roadmapdesc": "Understand relational databases (SQL) and NoSQL databases. MySQL, PostgreSQL, and MongoDB are good starting points. Learn how to design database schemas and write efficient queries.",
            "resources": {
                "youtube": [
                    {
                        "title": "SQL vs NoSQL or MySQL vs MongoDB",
                        "url": "https://www.youtube.com/watch?v=ZS_kXvOeQ5Y"
                    },
                    {
                        "title": "you need to learn SQL RIGHT NOW!! (SQL Tutorial for Beginners)",
                        "url": "https://www.youtube.com/watch?v=xiUTqnI6xk8"
                    },
                    {
                        "title": "SQL vs NoSQL - Difference B/W SQL &amp; NoSQL Databases | MySQL vs MongoDB Tutorial | Edureka",
                        "url": "https://www.youtube.com/watch?v=QwevGzVu_zk"
                    },
                    {
                        "title": "NoSQL Database Tutorial – Full Course for Beginners",
                        "url": "https://www.youtube.com/watch?v=xh4gy1lbL2k"
                    },
                    {
                        "title": "SQL Basics for Beginners | Learn SQL | SQL Tutorial for Beginners | Edureka",
                        "url": "https://www.youtube.com/watch?v=zbMHLJ0dY4w"
                    }
                ]
            }
        },
        {
            "step": 5,
            "desc": "Learn APIs and RESTful Services",
            "roadmapdesc": "Understand API design principles and how to create and consume RESTful services. Learn about HTTP methods, status codes, and API authentication.",
            "resources": {
                "youtube": [
                    {
                        "title": "APIs for Beginners - How to use an API (Full Course / Tutorial)",
                        "url": "https://www.youtube.com/watch?v=WXsD0ZgxjRw"
                    },
                    {
                        "title": "What is REST API? | REST API Tutorial | REST API  Concepts and Examples | Edureka",
                        "url": "https://www.youtube.com/watch?v=rtWH70_MMHM"
                    },
                    {
                        "title": "APIs for Beginners - How to use an API (Full Course / Tutorial)",
                        "url": "https://www.youtube.com/watch?v=GZvSYJDk-us"
                    },
                    {
                        "title": "Rest API | Web Service Tutorial",
                        "url": "https://www.youtube.com/watch?v=BZi44GOD8kY"
                    },
                    {
                        "title": "REST API Crash Course - Introduction + Full Python API Tutorial",
                        "url": "https://www.youtube.com/watch?v=qbLc5a9jdXo"
                    }
                ]
            }
        },
        {
            "step": 6,
            "desc": "Version Control (Git and GitHub)",
            "roadmapdesc": "Learn Git for version control and GitHub for collaboration. Understand branching, merging, and pull requests. Contribute to open-source projects.",
            "resources": {
                "youtube": [
                    {
                        "title": "Complete Git and GitHub Tutorial for Beginners",
                        "url": "https://www.youtube.com/watch?v=Ez8F0nW6S-w"
                    },
                    {
                        "title": "Git Tutorial for Beginners - GitHub Version Control",
                        "url": "https://www.youtube.com/watch?v=PWqS4NBhEY8"
                    },
                    {
                        "title": "Day-9 | Git and GitHub | What is GIT ? | What is Version Control ? | #devops #2023 #github #gitlab",
                        "url": "https://www.youtube.com/watch?v=fIMySI_gZJU"
                    },
                    {
                        "title": "Complete Git and GitHub Tutorial",
                        "url": "https://www.youtube.com/watch?v=apGV9Kg7ics"
                    },
                    {
                        "title": "Complete git and Github course in Hindi",
                        "url": "https://www.youtube.com/watch?v=q8EevlEpQ2A"
                    }
                ]
            }
        },
        {
            "step": 7,
            "desc": "Deployment and DevOps Basics",
            "roadmapdesc": "Learn how to deploy your applications to platforms like AWS, Azure, or Heroku. Understand basic DevOps concepts such as CI/CD and containerization (Docker).",
            "resources": {
                "youtube": [
                    {
                        "title": "DevOps Tutorial for Beginners | Learn DevOps in 7 Hours - Full Course | DevOps Training | Edureka",
                        "url": "https://www.youtube.com/watch?v=hQcFE0RD0cQ"
                    },
                    {
                        "title": "Azure DevOps Tutorial for Beginners | CI/CD with Azure Pipelines",
                        "url": "https://www.youtube.com/watch?v=4BibQ69MD8c"
                    },
                    {
                        "title": "Azure DevOps Step by Step Tutorial for Beginners | DevOps Tutorial",
                        "url": "https://www.youtube.com/watch?v=aonA7Kb7WGE"
                    },
                    {
                        "title": "DevOps Basics for Beginners | Learn DevOps From Scratch in 6 hours | DevOps Training | Simplilearn",
                        "url": "https://www.youtube.com/watch?v=XPIZkboWuTc"
                    },
                    {
                        "title": "What is DevOps? REALLY understand it | DevOps vs SRE",
                        "url": "https://www.youtube.com/watch?v=0yWAtQ6wYNM"
                    }
                ]
            }
        }
    ],
    "Topcolleges": [
        {
            "collegeName": "IIT (Indian Institute of Technology)",
            "location": "Various Locations Across India"
        },
        {
            "collegeName": "BITS Pilani",
            "location": "Pilani, Rajasthan"
        },
        {
            "collegeName": "IIIT (Indian Institute of Information Technology)",
            "location": "Various Locations Across India"
        }
    ]
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
    <div className="w-screen h-screen flex flex-col md:flex-row overflow-hidden">
       <ToastContainer />
       <College/>
      <div className="w-full md:w-1/3 h-full skillContainer bg-gradient-to-r from-blue-600/55 to-green-400/30 backdrop-blur-lg border">
        <div className="w-full md:w-[33vw] h-full pt-[90px] flex flex-col items-center overflow-scroll">
          <div className="flex fixed z-[100] pt-4 backdrop-blur-md w-full md:w-[34vw] bg-teal-950/10 left-0">
            <p
              onClick={() => setActiveTab("role")}
              className={`text-[25px] px-4 md:px-8 cursor-pointer transition duration-300 ease-in-out ${
                activeTab === "role" ? "text-blue-700/90 border-b-2 border-gray-500" : "text-white/50"
              }`}
            >
              Role based Roadmaps
            </p>

            <p
              onClick={() => setActiveTab("skill")}
              className={`text-[25px] px-4 md:px-8 cursor-pointer transition duration-300 ease-in-out ${
                activeTab === "skill" ? "text-blue-700/90 border-b-2 border-gray-500" : "text-white/50"
              }`}
            >
              Skill based Roadmaps
            </p>
          </div>
          <div className="pt-[83px] w-full">
            {(activeTab === "role" ? Role : Skill).map((item, index) => (
              <div
                onClick={() => handleClickButton(item)}
                className="w-full text-black/90 text-[20px] font-light hover:bg-black/20 hover:text-white text-center border border-white/10 backdrop-blur-lg bg-black/10 p-5"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col containerRight w-full md:w-2/3 h-full bg-blue-500/5 bg-gradient-to-r from-green-400/55 backdrop-blur-lg to-blue-500 items-center justify-center relative p-4 text-center">
        <div>
          <p className="text-[40px] md:text-[80px] bg-gradient-to-r from-amber-500 to-blue-700 bg-clip-text text-transparent">
            Career Roadmaps with AI
          </p>
          <Typewriter text={"AI will Generate your Roadmaps..."} loop={true} speed={100} />
        </div>
      </div>

      <div className="fixed rounded-lg bottom-0 w-full md:w-[60vw] md:left-[35vw] bg-gradient-to-r from-white/10 to-green-700/20 border border-white/20 shadow-xl backdrop-blur-md p-2 flex flex-col md:flex-row items-center justify-center">
        <div className="input-container w-full max-w-[90vw] md:max-w-[70vw] flex flex-col md:flex-row items-center space-x-0 md:space-x-2">
          <input
            className="w-full placeholder:font-dancing p-3 text-lg font-mono placeholder:text-[20px] md:placeholder:text-[30px] placeholder:text-green-950/65 rounded-md bg-gray-300"
            placeholder="Enter the roadmap Prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="mt-2 md:mt-0 backdrop-blur-lg group font-light flex items-center justify-around bg-blue-800/10 border border-white/20 h-12 px-6 text-white text-lg rounded-lg duration-500 shadow-lg hover:border-green-300 hover:text-green-300"
            onClick={() => input.trim() !== "" ? handleClickButton() : toast("Enter valid Input")}
          >
            <p>Generate</p>
          </button>
        </div>
      </div>

      {loading ? <Loader /> : steps?.steps && <College json={json} />}
    </div>
  );
};

export default Page;  