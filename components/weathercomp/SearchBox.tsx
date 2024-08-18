import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MdSearch } from "react-icons/md";
import { cn } from "@/lib/utils";

type Props ={
    classname?:string;
    value:string;
    onChange:React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit:React.FormEventHandler<HTMLFormElement> | undefined;

}

function SearchBox(props:Props) {
  return (
    <form onSubmit={props.onSubmit} className="flex items-center justify-center h-12 relative">
      <div className="flex border border-gray-300 rounded-md overflow-hidden shadow-sm">
        <Input
          value={props.value}
          onChange={props.onChange}
          type="text"
          placeholder="Search location"
          className={cn("px-4 py-2 w-[230px] border-0 focus:outline-none focus:ring-0",props.classname)}
        />
        <Button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200">
          <MdSearch />
        </Button>
      </div>
    </form>
  );
}

export default SearchBox;
