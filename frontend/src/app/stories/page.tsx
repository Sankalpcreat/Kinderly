import React, { useState } from "react";
import { storiesService } from "@/services/stories";
import StoryModal from "@/components/modal/StoryModal";

export default function StoriesPage() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState<string | null>(null);

  const handleGenerate = async () => {
    const generatedStory = await storiesService.generateStory(prompt);
    setStory(generatedStory);
  };

  return (
    <div className="stories-page">
      <h1 className="text-2xl font-bold mb-6">Bedtime Stories</h1>
      <textarea
        className="w-full p-4 border rounded-md mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your story idea..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleGenerate}
      >
        Generate Story
      </button>
      {story && <StoryModal story={story} onClose={() => setStory(null)} />}
    </div>
  );
}