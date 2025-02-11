"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIHelpPage() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">AI Help</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl aspect-video">
          <iframe
            src="https://app.dante-ai.com/embed/?kb_id=f915a2a9-d3d4-411a-a165-af28dc7b22ba&token=84bee53a-0a63-454b-b18d-0de7705f161d&modeltype=gpt-4-omnimodel-mini&tabs=false"
            allow="clipboard-write; clipboard-read; *;microphone *"
            className="w-full h-full"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
