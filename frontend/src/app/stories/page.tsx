"use client"
import React, { useState, useEffect } from "react";
import { storiesService } from "@/services/stories";
import StoryModal from "@/components/modal/StoryModal";
import { Spinner } from "@/components/loader/Spinner";
import useStoryStore from "@/stores/storyStore";

export default function StoriesPage() {
  const { stories, addStory } = useStoryStore();
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const generatedStoryResponse = await storiesService.generateStory(prompt);
      const newStory = { id: Date.now(), title: prompt, content: generatedStoryResponse.story, createdAt: new Date().toISOString() };
      addStory(newStory);
      setStory(generatedStoryResponse.story);
    } catch (error) {
      console.error("Error generating story:", error);
      // Optionally show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Fetch existing stories from API (if needed)
  useEffect(() => {
    const fetchStories = async () => {
      try {
        // If storiesService supports fetching existing stories, integrate here
        // Example: const existingStories = await storiesService.fetchStories();
        // existingStories.forEach((story) => addStory(story));
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    };

    fetchStories();
  }, [addStory]);

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
        <StoryModal
          isOpen={!!story}
          story={story}
          onClose={() => setStory(null)}
        />
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Saved Stories</h2>
        <ul className="space-y-4">
          {stories.map((s) => (
            <li key={s.id} className="bg-white shadow-md rounded p-4">
              <h3 className="text-xl font-medium text-gray-700">{s.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">{s.content}</p>
              <p className="text-sm text-gray-400 mt-1">Created at: {new Date(s.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}