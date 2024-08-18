"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardDescription } from '../ui/card'; // Adjust the path to your UI components
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for toasts
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Practice {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  practices: Practice[];
  createdAt: string; // Assuming this field exists for sorting by newest
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/sustainability-practices');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.sort((a: Category, b: Category) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setFilteredCategories(data);
      } catch (error) {
        toast.error('Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    const filtered = value !== 'all'
      ? categories.filter(category => category.name.toLowerCase() === value.toLowerCase())
      : categories;
    setFilteredCategories(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>
      <div className="flex items-center justify-center h-screen">
    <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
        </div>
    </div>
</div>
    </div>;
  }

  const paginatedCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-md ">
      <div className='flex justify-between m-2 mb-2'>
      <h1 className="text-3xl font-bold mb-4 text-zinc-700 font-serif m-2">Categories</h1>
      <div className="mb-4">
        <Select  onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px] font-mono mt-2.5 bg-slate-800 text-white">
            <SelectValue className='font-mono' placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Organic Farming">Organic Farming</SelectItem>
              <SelectItem value="Agroecology">Agroecology</SelectItem>
              <SelectItem value="Permaculture">Permaculture</SelectItem>
              <SelectItem value="Conservation Agriculture">Conservation Agriculture</SelectItem>
              <SelectItem value="Agroforestry">Agroforestry</SelectItem>
              <SelectItem value="Precision Farming">Precision Farming</SelectItem>
              <SelectItem value="Regenerative Agriculture">Regenerative Agriculture</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
      </div>
      {filteredCategories.length > 0 ? (
        <>
          {paginatedCategories.map((category) => (
            <Card key={category.id} className="mb-2 shadow-lg rounded-lg bg-white border border-gray-200">
              <CardHeader>
                <h2 className="text-2xl font-sans font-bold text-gray-800">{category.name}</h2>
              </CardHeader>
              <CardDescription>
                <p className="ml-6 font-mono font-medium text-xl text-gray-600">{category.description}</p>
                {category.practices.length > 0 && (
                  <div className="ml-4 mt-4 mb-4 list-disc space-y-2">
                    {category.practices.map((practice) => (
                      <p key={practice.id}>
                        <Link href={`/practices/${practice.id}`} className="text-green-500 hover:underline hover:text-green-700 font-mono font-semibold text-lg ml-2.5">
                          {practice.name}
                        </Link>
                      </p>
                    ))}
                  </div>
                )}
              </CardDescription>
            </Card>
          ))}
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
                </PaginationItem>
              )}
              {[...Array(Math.ceil(filteredCategories.length / itemsPerPage)).keys()].map(page => (
                <PaginationItem key={page}>
                  <PaginationLink href="#" onClick={() => handlePageChange(page + 1)}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {currentPage < Math.ceil(filteredCategories.length / itemsPerPage) && (
                <PaginationItem>
                  <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <div>No categories found</div>
      )}
    </div>
  );
};

export default CategoryList;
