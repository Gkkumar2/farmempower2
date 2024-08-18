"use client"
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type PopoverDemoProps = {
  onQuestionSubmitted: () => void;
};

export function PopoverDemo({ onQuestionSubmitted }: PopoverDemoProps) {
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useUser();

  const handleSubmit = async () => {
    if (user) {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
          email: user.emailAddresses[0]?.emailAddress || 'default@example.com',
          userName: user.fullName || 'defaultUser',
          profileImg: user.imageUrl || 'defaultProfileImageUrl',
        }),
      });

      if (res.ok) {
        toast.success('Question submitted successfully!');
        setTitle('');
        setContent('');
        setCategory('');
        onQuestionSubmitted(); // Notify parent component
      } else {
        toast.error('Failed to submit question');
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline"className="mb-2 bg-slate-100">
            <Plus className="text-blue-600" /> Ask a Question
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] ml-[240px]">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Category</h4>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sustainability Farming Resources</SelectLabel>
                    <SelectItem value="soil-management">Soil Management</SelectItem>
                    <SelectItem value="crop-rotation">Crop Rotation</SelectItem>
                    <SelectItem value="water-conservation">Water Conservation</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Title</h4>
              <Input
                type="text"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Ask Your Question</h4>
              <p className="text-sm text-muted-foreground">
                Please enter your question below:
              </p>
              <TextAreaDemo value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
              <Button className="w-full mt-4" onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function TextAreaDemo({ value, onChange }: { value: string; onChange: React.ChangeEventHandler<HTMLTextAreaElement> }) {
  return (
    <div className="w-full">
      <textarea
        id="question"
        name="question"
        rows={4}
        placeholder="Type your question here..."
        value={value}
        onChange={onChange}
        className="w-full h-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
      ></textarea>
    </div>
  );
}