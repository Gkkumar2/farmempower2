"use client"
import React, { useEffect, useState } from "react";
import { DownloadableResource } from "@/app/types/types";
import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";
import ResourceForm from "@/components/ResourceForm/ResourceForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useUser } from '@clerk/nextjs'; // Import the useUser hook

const ResourcesPage: React.FC = () => {
  const { user } = useUser(); // Get the current user
  const [resources, setResources] = useState<DownloadableResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<DownloadableResource[]>([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    fetch("/api/resources")
      .then((response) => response.json())
      .then((data: DownloadableResource[]) => {
        setResources(data);
        setFilteredResources(data); 
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredResources(resources); 
    } else {
      const filtered = resources.filter((resource) => resource.category === selectedCategory);
      setFilteredResources(filtered);
    }
  }, [selectedCategory, resources]);

  const toggleDescription = (id: string) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, link: string) => {
    if (!user) {
      e.preventDefault();
      alert('You need to be logged in to download resources');
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="p-4">
      <ResourceForm
        onResourceAdded={() => {
          setLoading(true); // Set loading to true before refetching data
          fetch("/api/resources")
            .then((response) => response.json())
            .then((data: DownloadableResource[]) => {
              setResources(data);
              setFilteredResources(data); 
              setLoading(false); // Set loading to false after data is fetched
            })
            .catch((error) => {
              console.error("Error fetching resources:", error);
              setLoading(false); // Set loading to false even if there's an error
            });
        }}
      />
      <div className="flex items-center justify-center bg-slate-100">
        <h1 className="flex text-3xl w-80 font-bold font-serif">Resources</h1>
      </div>

      <div className="flex justify-end mt-4 relative z-10">
        <Select onValueChange={handleCategoryChange} value={selectedCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>All Categories</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
              <SelectItem value="Image">Image</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
        <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
            </div>
        </div>
    </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 relative z-0">
          {filteredResources.map((resource) => (
            <CardContainer key={resource.id} className="w-full h-full">
              <CardBody className="bg-gray-50 relative group hover:shadow-2xl hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col justify-between">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <CardItem translateZ="50" className="text-xl font-bold dark:text-white bg-green-200 pl-1 pr-1 rounded">
                      {resource.category}
                    </CardItem>
                    <CardItem as="p" translateZ="60" className="text-black font-medium font-serif mt-2 dark:text-neutral-300">
                      {resource.name}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4 mb-4">
                      {resource.image && (
                        <Image
                          src={resource.image.id || ''}
                          height="200"
                          width="200"
                          className="h-40 w-full object-cover rounded-xl group-hover:shadow-xl"
                          alt={resource.name}
                        />
                      )}
                    </CardItem>
                    <CardItem as="p" translateZ="60" className={`font-mono text-green-700 text-sm mt-2 dark:text-neutral-300 text-justify ${expandedDescriptions[resource.id] ? "" : "line-clamp-3"}`}>
                      {resource.description}
                    </CardItem>
                    {resource.description.length > 100 && (
                      <button
                        onClick={() => toggleDescription(resource.id)}
                        className="text-blue-400 hover:underline text-xs mt-2"
                      >
                        {expandedDescriptions[resource.id] ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <CardItem translateZ={20} as="a" href={resource.link} onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handleDownloadClick(e, resource.link)} className="px-1 rounded-xl text-xs font-normal dark:text-white">
                      <Download />
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
