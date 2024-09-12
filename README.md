# Farm Empower 🌱

**Farm Empower** is a sustainability-focused farming web application designed to help farmers adopt sustainable farming practices and create a supportive community. It provides tools for knowledge sharing, inventory management, and interactive features like crop disease prediction, weather forecasting, and more.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 🌍 **Sustainable Farming Practices**: Organized by category, with detailed practice pages including ratings and reviews.
- 📊 **Task Management**: Kanban board for organizing farm tasks.
- 🌱 **Livestock Management**: Add, update, and manage livestock with MongoDB and Prisma backend.
- 🌾 **Crop Disease Prediction**: Powered by the Plant.id API.
- ☁️ **Weather Forecasting**: 7-day forecast and search functionality.
- 💬 **Community Forum**: Ask and answer farming-related questions.
- 📚 **Resource Library**: Downloadable resources related to farming practices.
- 🔒 **User Authentication**: Powered by Clerk for sign-up, login, and profile management.

---

## Tech Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: MongoDB, Prisma, Supabase (for user reviews), Clerk (for authentication)
- **APIs**: Google APIs (Places, Maps, Geocoding), Plant.id API (for disease prediction)
- **Additional Tools**: 
  - react-stars (for star rating)
  - Tailwind CSS (for styling)
  - MongoDB (for persistence)

---

## Installation

### Prerequisites

- Node.js
- MongoDB (set up your database)
- Prisma (for database management)
- Clerk (for authentication setup)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/farmempower.git

2. Navigate to the project directory:
   ```bash
   cd farmempower

3. Install dependencies:
   ```bash
   npm install
Set up your environment variables:
Create a .env.local file based on the .env.example provided in the repository.
Add your API keys for Google APIs, Plant.id API, Clerk, and MongoDB connection strings.

4.Run the development server:
    ```bash
    
    npm run dev
    
Open http://localhost:3000 to view the app in your browser.

## Usage

Once installed and running:

- Navigate through the **Sustainable Practices** to explore farming methods.
- Use the **Kanban Board** to manage tasks.
- Access **Weather Forecast** and **Crop Disease Prediction** tools.
- Participate in the **Community Forum** to ask or answer questions.
- Manage your livestock with the **Livestock Management** tool.
- Download guides and resources from the **Resource Library**.

## Screenshots

### Home Page
![Home Page](https://github.com/Gkkumar2/farmempower2/blob/master/Screenshot%202024-07-28%20225115.png)

### Kanban Board
![Kanban Board](https://link-to-your-image.com/kanban.png)

### Livestock Management
![Livestock Management](https://link-to-your-image.com/livestock.png)

### Crop Disease Prediction
![Crop Disease Prediction](https://link-to-your-image.com/crop-disease.png)

