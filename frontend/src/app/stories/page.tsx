import React, { useState } from "react";
import { storiesService } from "@/services/stories";
import StoryModal from "@/components/modal/StoryModal";
import { Spinner } from "@/components/loader/Spinner";

export default function StoriesPage() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const generatedStory = await storiesService.generateStory(prompt);
      setStory(generatedStory);
    } catch (error) {
      console.error("Error generating story:", error);
      // Optionally show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Create a Magical Bedtime Story
      </h1>
      <div className="mb-4">
        <label htmlFor="storyPrompt" className="block text-gray-700 text-sm font-bold mb-2">
          Story Idea:
        </label>
        <textarea
          id="storyPrompt"
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A brave knight and a friendly dragon..."
          rows={4}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-indigo-300"
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? <Spinner size="sm" color="white" /> : "Generate Story"}
        </button>
      </div>

      {story && (
        <StoryModal story={story} onClose={() => setStory(null)} />
      )}
    </div>
  );
}