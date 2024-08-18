"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import HealthAssessmentResults from './HealthAssessmentResults';

export default function PlantDisease() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [previewSrc, setPreviewSrc] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const readers = files.map(file => {
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.onload = (event) => {
          const result = event.target?.result;
          if (result && typeof result === 'string') {
            resolve(result.split(',')[1]);
          } else {
            reject(new Error('File reading failed'));
          }
        };
        reader.onerror = () => reject(new Error('File reading failed'));
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((images) => {
        setSelectedImages(images);
        displayPreviews(files);
      })
      .catch(console.error);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/healthAssessment', {
        images: selectedImages,
        modifiers: ["similar_images"] // Request similar images in the response
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const readers = files.map(file => {
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.onload = (event) => {
          const result = event.target?.result;
          if (result && typeof result === 'string') {
            resolve(result.split(',')[1]);
          } else {
            reject(new Error('File reading failed'));
          }
        };
        reader.onerror = () => reject(new Error('File reading failed'));
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((images) => {
        setSelectedImages(images);
        displayPreviews(files);
      })
      .catch(console.error);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const displayPreviews = (files: File[]) => {
    const previews = files.map(file => {
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result;
          if (result && typeof result === 'string') {
            resolve(result);
          } else {
            reject(new Error('File reading failed'));
          }
        };
        reader.onerror = () => reject(new Error('File reading failed'));
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews)
      .then((previews) => {
        setPreviewSrc(previews);
      })
      .catch(console.error);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 flex items-center justify-center bg-green-700 text-white">Plant Health Assessment</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className='flex items-center justify-center'>
        <div
          className="w-[700px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 "
          id="dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-50"
            multiple
            onChange={handleImageChange}
          />
          <div className="text-center">
            <img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label htmlFor="file-upload" className="relative cursor-pointer">
                <span>Drag and drop</span>
                <span className="text-indigo-600"> or browse</span>
                <span> to upload</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
              </label>
            </h3>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        </div>
        {previewSrc.length > 0 && (
          <div className="flex flex-wrap justify-center mt-4">
            {previewSrc.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index}`} className="w-28 h-28 object-cover m-2 border-2 border-gray-300 rounded-lg" />
            ))}
          </div>
        )}
        <div className='flex items-center justify-center'>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Submit
        </button>
        </div>
      </form>

      {result && (
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <HealthAssessmentResults result={result} />
        </div>
      )}
    </div>
  );
}
