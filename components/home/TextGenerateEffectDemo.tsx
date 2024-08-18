"use client";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `Join us at this novel initiative,  as we empower you with the tools and knowledge to embrace sustainable farming practices. Our platform bridges the digital divide, fostering a supportive community where every farmer can thrive. Together, let's sow the seeds for a greener, more sustainable tomorrow
`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
