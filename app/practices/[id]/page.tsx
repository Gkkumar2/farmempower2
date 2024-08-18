"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Link2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";

interface Step {
  id: string;
  order: number;
  description: string;
}

interface Example {
  id: string;
  location: string;
  details: string;
}

interface Resource {
  id: string;
  type: string;
  title: string;
  author: string;
  website?: string;
}

interface Practice {
  stepsInvolved: any;
  id: string;
  name: string;
  description: string;
  image: string;
  objectives: string[];
  suitableAreas: string[];
  benefits: string[];
  challenges: string[];
  bestPractices: string[];
  impactOnSustainability: string;
  steps: Step[];
  examples: Example[];
  additionalResources: Resource[];
  reviews: {
    id: string;
    user_name: string;
    email: string;
    profile_image: string;
    stars: number;
    review: string;
  }[];
}

const PracticeDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const practiceId = Array.isArray(id) ? id[0] : id;
  const [practice, setPractice] = useState<Practice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewsUpdated, setReviewsUpdated] = useState(false);

  useEffect(() => {
    if (practiceId) {
      fetch(`/api/practices/${practiceId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPractice(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching practice:", error);
          setLoading(false);
        });
    }
  }, [practiceId]);

  const handleReviewSubmitted = useCallback(() => {
    setReviewsUpdated((prev) => !prev); // Toggle state to trigger re-fetch in ReviewList
  }, []);

  if (loading)
    return (
      <div>
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      </div>
    );

  if (!practice) return <div>Practice not found</div>;

  return (
    <div className="p-6 gap-4 max-w-5xl mx-auto shadow-sm bg-slate-50">
      <Typography variant="h4" component="h1" gutterBottom>
        <h2 className="scroll-m-20 border-b-4 border-b-orange-300 pb-2  text-4xl font-semibold tracking-tight first:mt-0">
          {practice.name}
        </h2>
      </Typography>
      <Card className="bg-slate-50">
        <CardContent className="mt-3 justify-center items-center">
          <CardDescription className="font-sans font-bold text-xl">
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              {practice.description}
            </blockquote>
          </CardDescription>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        {practice.image && (
          <img
            src={practice.image}
            alt={practice.name}
            className=" my-4 bg-cover object-center border-4 border-slate-400 "
          />
        )}
      </div>
      <div>
        <h2 className="font-extrabold font-mono border-b-4 text-2xl mt-2">
          Objectives
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1 font-serif">
          {practice.objectives?.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </div>
      <h2 className="font-extrabold font-mono border-b-4 text-2xl mt-2">
        Suitable Areas
      </h2>
      <div className="flex flex-wrap -mx-4 mt-3">
        {practice.suitableAreas?.map((area, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="p-4">
                <p className="font-serif">{area}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-2 w-full overflow-y-auto">
        <h2 className="font-extrabold font-mono border-b-4 text-2xl mt-3">
          Benefits & Challenges
        </h2>
        <table className="w-full mt-4 font-serif table-fixed">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold w-1/2 [&[align=center]]:text-center [&[align=right]]:text-right">
                Benefits
              </th>
              <th className="border px-4 py-2 text-left font-bold w-1/2 [&[align=center]]:text-center [&[align=right]]:text-right">
                Challenges
              </th>
            </tr>
          </thead>
          <tbody>
            {practice.benefits?.map((benefit, index) => (
              <tr
                className="m-0 border-t p-0 even:bg-muted"
                key={`benefit-${index}`}
              >
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  {benefit}
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  {practice.challenges && practice.challenges[index]
                    ? practice.challenges[index]
                    : ""}
                </td>
              </tr>
            ))}
            {practice.challenges &&
              practice.challenges.length > (practice.benefits?.length || 0) &&
              practice.challenges
                .slice(practice.benefits?.length)
                .map((challenge, index) => (
                  <tr
                    className="m-0 border-t p-0 even:bg-muted"
                    key={`challenge-${index}`}
                  >
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {challenge}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-extrabold font-mono border-b-4 text-2xl mt-5">
        Best Practices
      </h2>

      <ul className="my-6 ml-6 list-disc [&>li]:mt-1 font-serif">
        {practice.bestPractices?.map((bestPractice, index) => (
          <li key={index}>{bestPractice}</li>
        ))}
      </ul>

      <h2 className="font-extrabold font-mono border-b-4 text-2xl mt-3 mb-3">
        Steps
      </h2>
      <Timeline position="alternate">
        {practice.stepsInvolved
          ?.sort((a: Step, b: Step) => a.order - b.order)
          .map((step: Step) => (
            <TimelineItem key={step.id}>
              <TimelineOppositeContent>
                <p className="font-serif text-purple-700 font-bold text-xl">
                  Step {step.order}
                </p>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <p className="font-mono">
                  <span className="font-bold text-lg text-black">
                    {step.description.split(":")[0]}
                  </span>
                  <span className="text-slate-500">
                    {`: ${step.description.split(":")[1]}`}
                  </span>
                </p>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>

      <h2 className="font-extrabold font-mono border-b-4 text-2xl mt-4">
        Examples
      </h2>
      <div className="flex flex-wrap m-2">
        {practice.examples?.map((example) => (
          <div key={example.id} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <div className="flex flex-col h-full bg-white shadow-md rounded-md overflow-hidden">
              <div className="flex-grow p-4">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                  <strong className="text-black font-mono text-lg">
                    {example.location}
                  </strong>
                </div>
                <p className="text-gray-700 font-serif">{example.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-extrabold font-mono border-b-4 text-2xl mt-4">
          Additional Resources
        </h2>
        <div className="flex flex-wrap m-2">
          {practice.additionalResources?.map((resource) => (
            <div key={resource.id} className="w-full sm:w-1/2 lg:w-1/3 p-2">
              <div className="max-w-[400px] bg-white shadow-md rounded-md overflow-hidden">
                <div className="p-4">
                  <Badge className="bg-purple-600 hover:bg-green-600 h-8 w-auto text-lg font-mono mt-1 mb-2">
                    {resource.type}
                  </Badge>
                  <h3 className="font-bold text-lg font-serif mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-700">
                    <span className=" font-sans text-purple-700 font-semibold">
                      {resource.author}
                    </span>
                  </p>
                  {resource.website && (
                    <Link href={resource.website} legacyBehavior>
                      <a
                        href=""
                        className="text-blue-600 hover:underline mt-2 block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex gap-2 font-mono ">
                          <Link2 className="h5 w-5" />
                          Website
                        </div>
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-extrabold font-mono border-b-4 text-2xl mt-4 mb-4">
          Impact on Sustainability
        </h2>
        <div className="bg-white overflow-hidden">
          <div className="p-3">
            <Card className=" border-none mt-2">
              <CardContent>
                <div className="ml-4 mt-2">
                  <p className="text-lg font-mono font-semibold text-green-700">
                    {practice.impactOnSustainability}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-4">
        <h2 className="font-extrabold font-mono border-b-4 text-2xl mt-4 mb-4">
          Ratings and Reviews 
        </h2>
        <div>
        <ReviewForm practiceId={practice.id} onReviewSubmitted={handleReviewSubmitted} />
        <ReviewList practiceId={practice.id} reviewsUpdated={reviewsUpdated} />
      </div>
        </div>
        
      </div>
    </div>
  );
};
export default PracticeDetail;
