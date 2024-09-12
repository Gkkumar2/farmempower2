# Farm Empower 🌱

**Farm Empower** is a sustainability-focused farming web application designed to help farmers adopt sustainable farming practices and create a supportive community. It provides tools for knowledge sharing, inventory management, and interactive features like crop disease prediction, weather forecasting, and more.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
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
- 🏆 **Gamification**: Badges and leaderboards for top contributors and barter participants.
- 🔔 **User Notifications**: Real-time updates for offers and interactions.
- 🔒 **User Authentication**: Powered by Clerk for sign-up, login, and profile management.

---

## Tech Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: MongoDB, Prisma, Supabase (for user reviews), Clerk (for authentication)
- **APIs**: Google APIs (Places, Maps, Geocoding), Plant.id API (for disease prediction)
- **Additional Tools**: 
  - react-stars (for star rating)
  - Tailwind CSS (for styling)
  - Supabase (database)
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
