import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8 ">
      <HoverEffect items={contacts}  />
    </div>
  );
}
export const contacts = [
    {
      image: "person.jpeg",
      name: "John Doe",
      profession: "Software Engineer",
      phone: "+123456789",
      email: "john.doe@example.com",
      link: "https://doa.gov.lk/home-page/"
    },
    {
      image: "person.jpeg",
      name: "Jane Smith",
      profession: "Graphic Designer",
      phone: "+987654321",
      email: "jane.smith@example.com",
      link: "https://doa.gov.lk/home-page/"
    },
    {
      image: "person.jpeg",
      name: "Alice Johnson",
      profession: "Product Manager",
      phone: "+5647382910",
      email: "alice.johnson@example.com",
      link: "https://doa.gov.lk/home-page/"
    },
    {
        image: "person.jpeg",
        name: "Alice Johnson",
        profession: "Product Manager",
        phone: "+5647382910",
        email: "alice.johnson@example.com",
        link: "https://doa.gov.lk/home-page/"
      },
      {
        image: "person.jpeg",
        name: "Alice Johnson",
        profession: "Product Manager",
        phone: "+5647382910",
        email: "alice.johnson@example.com",
        link: "https://doa.gov.lk/home-page/"
      },
      {
        image: "person.jpeg",
        name: "Alice Johnson",
        profession: "Product Manager",
        phone: "+5647382910",
        email: "alice.johnson@example.com",
        link: "https://doa.gov.lk/home-page/"
      },
  ];