import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyASshiZEg3EtxvsI8pPtMe6I14sOuaZ22A";
const genAi = new GoogleGenerativeAI(apiKey);
const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });

export const getPromptResponse = async (prompt) => {

  
  console.log("Generating response for:", prompt);

  const serverPrompt = `${prompt} Format it strictly as JSON with no additional text. The JSON format should be:
  {
    "title": "title",
    "steps": [
      { "step": 1, "desc": "step description", "roadmapdesc": "roadmap description", "resources": { "youtube": [] } },
      { "step": 2, "desc": "step description", "roadmapdesc": "roadmap description", "resources": { "youtube": [] } },
      ...
    ]
    ,"Topcolleges":[{collegeName:"name",location:"Place"},{collegeName:"name2",location:"Place2"}]
  }
  Ensure 'resources.youtube' includes highly relevant, long-duration videos with detailed descriptions show content based in India.`;

  try {
    let result = await model.generateContent(serverPrompt);
    const resultText = await result.response.text();

    // Extract JSON safely
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid JSON response from AI");

    const generatedText = JSON.parse(jsonMatch[0]);

    // Fetch YouTube links for each step
    for (let step of generatedText.steps) {
      step.resources.youtube = await getYoutube(step.desc);
    }

    return generatedText;
  } catch (error) {
    console.error("Error generating content:", error);
    return { title: "Error", steps: [] };
  }
};

export const getYoutube = async (searchQuery) => {
  const youtubeApiKey = "AIzaSyAF4V2aYh33ng_Cw8n6VmURm4wQYyWxXbM";
  const url = `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
    searchQuery
  )}&part=snippet,id&type=video&maxResults=5&videoDuration=long&key=${youtubeApiKey}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    // Extract YouTube video links and titles
    const youtubeLinks = data.items
      .filter((item) => item.id.kind === "youtube#video")
      .map((item) => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));

    return youtubeLinks;
  } catch (error) {
    console.log("Error fetching YouTube data:", error);
    return [];
  }
};
