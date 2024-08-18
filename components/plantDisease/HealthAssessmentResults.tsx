import React from 'react';

interface SimilarImage {
  id: string;
  similarity: number;
  url: string;
  url_small: string;
}

interface Disease {
  name: string;
  probability: number;
  redundant: boolean;
  entity_id: number;
  disease_details: {
    local_name: string;
    language: string;
  };
  similar_images?: SimilarImage[];
}

interface HealthAssessment {
  is_healthy: boolean;
  is_healthy_probability: number;
  diseases: Disease[];
}

interface Image {
  file_name: string;
  url: string;
}

interface Result {
  id: number;
  meta_data: {
    latitude: number | null;
    longitude: number | null;
    date: string;
    datetime: string;
  };
  uploaded_datetime: number;
  finished_datetime: number;
  images: Image[];
  modifiers: string[];
  is_plant: boolean;
  is_plant_probability: number;
  health_assessment: HealthAssessment;
}

interface Props {
  result: Result;
}

const HealthAssessmentResults: React.FC<Props> = ({ result }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Health Assessment Results</h2>

      {/* Uploaded Image */}
      <div className="mb-8 text-center">
        <h3 className="text-lg font-semibold mb-4">Uploaded Image</h3>
        <div className="flex justify-center">
          {result.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.file_name}
              className="w-72 h-72 object-cover rounded-lg border-2 border-gray-300"
            />
          ))}
        </div>
      </div>

      {/* Detected Diseases */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">Detected Diseases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result.health_assessment.diseases.map((disease, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="flex flex-col items-center">
                {/* Disease Image */}
                {disease.similar_images && disease.similar_images.length > 0 && (
                  <img
                    src={disease.similar_images[0].url}
                    alt={`Similar to ${disease.name}`}
                    className="w-36 h-36 object-cover rounded-full mb-4 border-2 border-gray-300"
                  />
                )}

                {/* Disease Details */}
                <div className="text-center">
                  <p className="text-lg font-bold">{disease.name}</p>
                  <p className="text-sm text-gray-600">{disease.disease_details.local_name}</p>
                  <p className="text-sm text-gray-600">Probability: {disease.probability.toFixed(2)}</p>
                </div>
              </div>
              {disease.similar_images && disease.similar_images.length > 1 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {disease.similar_images.slice(1).map((image) => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={`Similar to ${disease.name}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthAssessmentResults;
