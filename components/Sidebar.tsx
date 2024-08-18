import React, { useState } from "react";
import Link from "next/link";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  PawPrint,
  Sprout,
  Tractor,
  CalendarCheck2,
  Sun,
  Leaf,
  BrainCircuit,
  Recycle,
  Rss,
  Contact,
  MessageSquareText,
  Library,
  MessageCircleWarning,
} from "lucide-react";
import Useritem from "./Useritem";
import { MdFeedback } from "react-icons/md";

interface MenuItem {
  link: string;
  text: string;
  icon: JSX.Element;
}

interface MenuGroup {
  group: string;
  items: MenuItem[];
}

function Sidebar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const menuList: MenuGroup[] = [
    {
      group: "Manage",
      items: [
        {
          link: "/LivingStock",
          text: "LiveStock",
          icon: <PawPrint />,
        },
        {
          link: "/Planting",
          text: "Planting",
          icon: <Sprout />,
        },
        {
          link: "/Resources",
          text: "Resources",
          icon: <Tractor />,
        },
        {
          link: "/Kanban",
          text: "Tasks",
          icon: <CalendarCheck2 />,
        },
      ],
    },
    {
      group: "Features",
      items: [
        {
          link: "/Weather",
          text: "Weather",
          icon: <Sun />,
        },
        {
          link: "/Cropprediction",
          text: "Crop Predictions",
          icon: <Leaf />,
        },
        {
          link: "/Plantdisease",
          text: "Disease Prediction",
          icon: <BrainCircuit />,
        },
      ],
    },
    {
      group: "Sustainability",
      items: [
        {
          link: "/sustainability",
          text: "Sustainable Practices",
          icon: <Recycle />,
        },
        {
          link: "/blog",
          text: "Blog",
          icon: <Rss />,
        },
        {
          link: "/Discussion",
          text: "Discussion",
          icon: <MessageSquareText />,
        },
        {
          link: "/contact",
          text: "Contact",
          icon: <Contact />,
        },
        {
          link: "/ResourcesD",
          text: "Library",
          icon: <Library />,
        },
        {
          link: "/AppFeedback",
          text: "User Feedback",
          icon: <MessageCircleWarning/>,
        },
      ],
    },
  ];

  const handleItemClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col h-full md:h-screen w-[100px] md:w-[300px] min-w-[80px] md:min-w-[300px] border-r p-2 md:p-4 bg-white shadow-lg overflow-y-auto">
      <div className="mb-4">
        <Useritem />
      </div>
      <div className="overflow-y-auto flex-grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {menuList.map((menu, key) => (
              <CommandGroup
                key={key}
                heading={<span className="text-green-600 text-xs">{menu.group}</span>}
              >
                {menu.items.map((option, optionKey) => (
                  <Link href={option.link} key={optionKey} passHref legacyBehavior>
                    <a
                      className={`flex items-center gap-2 p-2 rounded-md transition-colors duration-200 ${
                        activeLink === option.link
                          ? "bg-gray-200 text-teal-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleItemClick(option.link)}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span className="hidden md:inline text-sm font-medium">
                        {option.text}
                      </span>
                    </a>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}

export default Sidebar;
