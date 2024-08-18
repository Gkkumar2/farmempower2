import { useState } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface ResourceFormProps {
  onResourceAdded: () => void;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ onResourceAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null); // Use File type for image
  const [link, setLink] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      // Upload image file using FormData
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      if (image) {
        formData.append('image', image);
      }
      formData.append('link', link);

      await axios.post('/api/resources', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setName('');
      setDescription('');
      setCategory('');
      setImage(null);
      setLink('');
      setShowForm(false);

      // Call the onResourceAdded callback to refresh the resources list
      onResourceAdded();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Button variant="outline" onClick={() => setShowForm(!showForm)} className="mb-4">
        <Plus className="mr-2" />
        {showForm ? 'Hide Form' : 'Add Resource'}
      </Button>
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sustainable Farming Practices</SelectLabel>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Image">Image</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="image">Image Upload</Label>
            <Input
              id="image"
              type="file" // Use type file for image upload
              accept="image/*" // Accept only image files
              onChange={handleFileChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="link">Download Link</Label>
            <Input
              id="link"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button type="submit" variant="default">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default ResourceForm;
