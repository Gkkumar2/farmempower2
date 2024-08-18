"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Plus } from "lucide-react"; // Import Plus from Lucide React
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";


interface FormData {
  categoryName: string;
  categoryDescription: string;
  practiceName: string;
  practiceDescription: string;
  practiceImage: string;
  objectives: string;
  steps: { order: number; description: string }[];
  suitableAreas: string;
  benefits: string;
  challenges: string;
  bestPractices: string;
  examples: { location: string; details: string }[];
  impactOnSustainability: string;
  additionalResources: { type: string; title: string; author: string; website: string }[];
}

const AddSustainabilityPracticeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    categoryName: "",
    categoryDescription: "",
    practiceName: "",
    practiceDescription: "",
    practiceImage: "",
    objectives: "",
    steps: [{ order: 1, description: "" }],
    suitableAreas: "",
    benefits: "",
    challenges: "",
    bestPractices: "",
    examples: [{ location: "", details: "" }],
    impactOnSustainability: "",
    additionalResources: [{ type: "", title: "", author: "", website: "" }],
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof FormData,
    key: string
  ) => {
    const newArray = [...(formData[field] as any)].map((item: any, i: number) => {
      if (i === index) {
        return { ...item, [key]: e.target.value };
      }
      return item;
    });
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddNestedField = (field: string) => {
    const newItem =
      field === "steps"
        ? { order: formData.steps.length + 1, description: "" }
        : field === "examples"
        ? { location: "", details: "" }
        : { type: "", title: "", author: "", website: "" };

    setFormData({ ...formData, [field]: [...formData[field as keyof FormData], newItem] });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sustainability-practices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
  
      const result = await response.json();
      console.log("Form submitted successfully", result);
      toast.success("Sustainability practice added successfully");
      // Reset form data or handle successful submission as needed
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`Error submitting form: ${(error as Error).message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-md shadow-md">
      <ToastContainer />
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">Add Info About Sustainability Practice</h1>
      <Button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="mb-4 flex items-center"
      >
        <Plus className="mr-2" />
        {isFormVisible ? "Hide Form" : "Show Form"}
      </Button>
      </div>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Category</h2>
            <Input
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="Category Name"
              className="w-full"
            />
            <Textarea
              name="categoryDescription"
              value={formData.categoryDescription}
              onChange={handleChange}
              placeholder="Category Description"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Practice</h2>
            <Input
              name="practiceName"
              value={formData.practiceName}
              onChange={handleChange}
              placeholder="Practice Name"
              className="w-full"
            />
            <Textarea
              name="practiceDescription"
              value={formData.practiceDescription}
              onChange={handleChange}
              placeholder="Practice Description"
              className="w-full"
            />
            <Input
              name="practiceImage"
              value={formData.practiceImage}
              onChange={handleChange}
              placeholder="Practice Image URL"
              className="w-full"
            />
            <Textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleChange}
              placeholder="Objectives (comma separated)"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Steps Involved</h2>
            {formData.steps.map((step, index) => (
              <div key={index} className="space-y-2">
                <Input
                  name={`steps[${index}].order`}
                  value={step.order}
                  onChange={(e) => handleNestedChange(e, index, "steps", "order")}
                  placeholder="Step Order"
                  className="w-full"
                />
                <Textarea
                  name={`steps[${index}].description`}
                  value={step.description}
                  onChange={(e) => handleNestedChange(e, index, "steps", "description")}
                  placeholder="Step Description"
                  className="w-full"
                />
              </div>
            ))}
            <Button type="button" onClick={() => handleAddNestedField("steps")}>
              Add Step
            </Button>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Examples</h2>
            {formData.examples.map((example, index) => (
              <div key={index} className="space-y-2">
                <Input
                  name={`examples[${index}].location`}
                  value={example.location}
                  onChange={(e) => handleNestedChange(e, index, "examples", "location")}
                  placeholder="Example Location"
                  className="w-full"
                />
                <Textarea
                  name={`examples[${index}].details`}
                  value={example.details}
                  onChange={(e) => handleNestedChange(e, index, "examples", "details")}
                  placeholder="Example Details"
                  className="w-full"
                />
              </div>
            ))}
            <Button type="button" onClick={() => handleAddNestedField("examples")}>
              Add Example
            </Button>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Additional Resources</h2>
            {formData.additionalResources.map((resource, index) => (
              <div key={index} className="space-y-2">
                <Input
                  name={`additionalResources[${index}].type`}
                  value={resource.type}
                  onChange={(e) => handleNestedChange(e, index, "additionalResources", "type")}
                  placeholder="Resource Type"
                  className="w-full"
                />
                <Input
                  name={`additionalResources[${index}].title`}
                  value={resource.title}
                  onChange={(e) => handleNestedChange(e, index, "additionalResources", "title")}
                  placeholder="Resource Title"
                  className="w-full"
                />
                <Input
                  name={`additionalResources[${index}].author`}
                  value={resource.author}
                  onChange={(e) => handleNestedChange(e, index, "additionalResources", "author")}
                  placeholder="Resource Author"
                  className="w-full"
                />
                <Input
                  name={`additionalResources[${index}].website`}
                  value={resource.website}
                  onChange={(e) => handleNestedChange(e, index, "additionalResources", "website")}
                  placeholder="Resource Website"
                  className="w-full"
                />
              </div>
            ))}
            <Button type="button" onClick={() => handleAddNestedField("additionalResources")}>
              Add Resource
            </Button>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Other Details</h2>
            <Textarea
              name="suitableAreas"
              value={formData.suitableAreas}
              onChange={handleChange}
              placeholder="Suitable Areas (comma separated)"
              className="w-full"
            />
            <Textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="Benefits (comma separated)"
              className="w-full"
            />
            <Textarea
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
              placeholder="Challenges (comma separated)"
              className="w-full"
            />
            <Textarea
              name="bestPractices"
              value={formData.bestPractices}
              onChange={handleChange}
              placeholder="Best Practices (comma separated)"
              className="w-full"
            />
            <Textarea
              name="impactOnSustainability"
              value={formData.impactOnSustainability}
              onChange={handleChange}
              placeholder="Impact on Sustainability"
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-500 text-white">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddSustainabilityPracticeForm;
