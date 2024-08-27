import axios from "axios";
import { generationConfig, model } from "../configuration/app.configuration.js";

const getDataFromGeminiApi = async (req) => {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [{ text: "I want to learn how to prepare chicken 65" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n[{"topic": "Ingredients", "description": "Gather all the necessary ingredients, including chicken pieces, yogurt, spices (red chili powder, turmeric powder, coriander powder, cumin powder, garam masala, ginger-garlic paste), onions, green chilies, curry leaves, oil, salt, and lemon juice."}, {"topic": "Marination", "description": "Marinate the chicken pieces with yogurt, spices, ginger-garlic paste, salt, and lemon juice.  Let it marinate for at least 30 minutes to allow the flavors to penetrate."}, {"topic": "Batter Preparation", "description": "Prepare a batter using rice flour, corn flour, and water.  The batter should be thin and flowing."}, {"topic": "Frying", "description": "Heat oil in a pan or wok.  Dip the marinated chicken pieces in the batter and fry until golden brown and crispy. Make sure the oil is hot enough before adding the chicken pieces."}, {"topic": "Sautéing", "description": "In the same pan, add chopped onions, green chilies, and curry leaves. Sauté until the onions are translucent."}, {"topic": "Final Touches", "description": "Add the fried chicken pieces to the pan along with the remaining spices and salt. Stir well to combine the flavors. Cook for a few minutes until the chicken is heated through."}, {"topic": "Serving", "description": "Serve hot with your favorite accompaniments like rice, roti, or naan."}]\n\n```',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "want to learn DSA" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n[{"topic": "Fundamentals", "description": "Understanding the core concepts of data structures and algorithms, including what they are, why they are important, and how they relate to software development. This includes concepts like time and space complexity, efficiency analysis, and common design patterns."}, {"topic": "Data Structures", "description": "Learning about different data structures and their applications. This covers topics like arrays, linked lists, stacks, queues, trees, graphs, hash tables, heaps, and tries. For each structure, you\'ll learn how to represent them, their operations (insertion, deletion, search, traversal), and their strengths and weaknesses in different situations."}, {"topic": "Algorithms", "description": "Learning about various algorithms and their applications. This covers topics like sorting algorithms (bubble sort, insertion sort, merge sort, quick sort, etc.), searching algorithms (linear search, binary search), graph algorithms (Dijkstra\'s algorithm, shortest path algorithms, minimum spanning tree algorithms), dynamic programming, and greedy algorithms. For each algorithm, you\'ll learn the steps involved, its time and space complexity, and its use cases."}, {"topic": "Problem Solving", "description": "Developing problem-solving skills to apply your knowledge of data structures and algorithms to real-world problems. This includes breaking down problems into smaller subproblems, choosing appropriate data structures and algorithms, and writing efficient and optimized code."}, {"topic": "Practice", "description": "Engaging in regular practice to solidify your understanding and develop proficiency. This includes solving coding challenges, working on project-based assignments, and participating in coding competitions."}, {"topic": "Coding Languages", "description": "Choosing a programming language to implement data structures and algorithms. Popular choices include Python, Java, C++, and JavaScript. Learn the syntax and libraries relevant to your chosen language."}, {"topic": "Data Structures & Algorithms Applications", "description": "Understanding how data structures and algorithms are used in various fields, such as computer science, software engineering, machine learning, database management, and more. Learn how they are used to design efficient and scalable systems."}]\n\n```',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(req.body.query);
  return JSON.parse(
    result.response.text().replace("```json", "").replace("```", "")
  );
};

const getDataFromYoutubeApi = async (req) => {
  const response = await axios.get(process.env.YOUTUBE_SEARCH_API, {
    params: {
      key: process.env.YOUTUBE_API_KEY,
      q: req.body.topic,
      type: "video",
      part: "snippet",
      maxResults: process.env.YOUTUBE_API_MAX_RESULT_COUNT,
    },
  });

  return response.data;
};

export { getDataFromGeminiApi, getDataFromYoutubeApi };
