"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../ui/layout-grid";

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Empowering Sustainable Farming</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Farmers across Sri Lanka are being empowered with the knowledge and tools needed for sustainable farming practices. 
      This initiative ensures that even those in rural areas can access critical information and resources.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Bridging the Digital Divide</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      The digital gap between urban and rural farmers in Sri Lanka is being bridged through accessible technology. 
      Farmers are gaining the ability to leverage digital tools regardless of their prior tech experience and accessability.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Building a Supportive Community</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A strong, supportive community of farmers is being fostered across Sri Lanka.
       This platform encourages knowledge sharing, collaboration, and mutual support among farmers.

      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Promoting Environmental Stewardship</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Environmental stewardship is being promoted by encouraging practices that protect Sri Lanka’s natural resources.
      Sustainable methods are being adopted to ensure long-term productivity and environmental health.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://img.freepik.com/free-photo/agricultural-worker-hydroponic-enviroment-doing-quality-control-bio-crop-before-harvesting-modern-greenhouse-caucasian-woman-inspecting-lettuce-plants-checking-damaged-seedlings_482257-46876.jpg?t=st=1721123853~exp=1721127453~hmac=34bdf25dd821ce11ec3410eda1274ae82023452d052b4941a7f135f11880c8be&w=2000",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://img.freepik.com/free-photo/medium-shot-agronomists-taking-picture-strawberry-with-digital-tablet_1098-19397.jpg?t=st=1721123210~exp=1721126810~hmac=6a0f80cb1fab4b418f6cd807efe87c3da90441f6afd93265da2f4e88b5a27cb3&w=1800",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://img.freepik.com/free-photo/full-shot-smiley-women-with-hats_23-2149894733.jpg?t=st=1721123360~exp=1721126960~hmac=6fd03958585bcd9bd11310f11669be27b490fc12b10407a93ee58557144e3038&w=1800",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://img.freepik.com/free-photo/sustainable-development-goals-still-life_23-2150196705.jpg?t=st=1721123718~exp=1721127318~hmac=fde0f9ee16deb76496e800848ca20c0b7338e1ea839d368dedf8268c755c9963&w=1800",
  },
];
