import dotenv from "dotenv";
dotenv.config();  

import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
        history: [],
        generationConfig: { maxOutputTokens: 100 },
    });

    async function askAndRespond() {
        rl.question("You: ", async (msg) => {
            if (msg.toLowerCase() === "exit") {
                rl.close();
            } else {
                const result = await chat.sendMessage(msg);
                const res = await result.response.text(); 
    
                console.log("AI:", res);
                askAndRespond();
            }
        });
    }

    askAndRespond();
}

run();
