export interface Task {
  id: string;
  status: string;
  name: string;
}

export interface BoardTypes {
  tasks: Task[];
  id: string;
  name: string;
}
export type Question = {
  id: string;
  createdAt: string;
  title: string;
  content: string;
  category: string;
  email: string;
  userName: string;
  profileImg: string;
  questionId:string;
};

export type Reply = {
  id: string;
  createdAt: string;
  content: string;
  questionId: string;
  email: string;
  userName: string;
  profileImg: string;
};
// types.ts

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Practice {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  image: string;
  objectives: string[];
  stepsInvolved: Step[];
  suitableAreas: string[];
  benefits: string[];
  challenges: string[];
  bestPractices: string[];
  examples: Example[];
  impactOnSustainability: string;
  additionalResources: Resource[];
}

export interface Step {
  id: string;
  order: number;
  description: string;
}

export interface Example {
  id: string;
  location: string;
  details: string;
}

export interface Resource {
  id: string;
  type: string;
  title: string;
  author: string;
  website?: string;
}
// types.ts
export interface DownloadableResource {
  id: string;
  name: string;
  description: string;
  category: string;
  image: {
    id: string | undefined;
    data: string;
    type: string;
  } | null;
  link: string;
  createdAt: Date;
}

export interface Livestock {
  id: string;
  userId: string;
  user: string;
  type: string;
  breed: string;
  quantity: number;
  dateAcquired: Date;
  age: number;
  healthStatus: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
