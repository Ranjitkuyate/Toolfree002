import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

const AIIntegration: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!API_KEY) {
            setError("API key is missing. Please configure it.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            const result = await model.generateContent(inputText);
            const response = await result.response;
            const text = response.text();

            setOutputText(text);
        } catch (err: any) {
            setError(`Error generating content: ${err.message || "Unknown error"}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">AI Text Generator</h2>
            <textarea
                className="w-full p-2 border rounded-md"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to generate..."
            />
            <button
                className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-400"
                onClick={handleGenerate}
                disabled={isLoading}
            >
                {isLoading ? "Generating..." : "Generate"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {outputText && (
                <div className="mt-4 p-3 bg-white border rounded-md">
                    <h3 className="text-lg font-medium">Generated Output:</h3>
                    <p className="mt-2">{outputText}</p>
                </div>
            )}
        </div>
    );
};

export default AIIntegration;
