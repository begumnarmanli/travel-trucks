# 🚐 TravelTrucks - Camper Rental Platform

TravelTrucks is a modern React application designed for discovering and booking campervans. It offers a seamless experience with real-time filtering, a favorite system, and detailed vehicle information.

## ✨ Key Features

- **Dynamic Catalog:** Browse through a wide range of campers with infinite scroll functionality.
- **Advanced Filtering:** Filter by location, vehicle type, and equipment (AC, Kitchen, TV, etc.).
- **Persistent Favorites:** Heart icons remember their state even after page refreshes, thanks to local storage integration. [cite: 2026-01-03]
- **Detailed View:** Explore high-quality galleries, read user reviews, and check technical specifications.
- **Interactive Booking:** Quick and easy booking form with validation.
- **Custom UI:** Hand-picked camper icon (favicon) and dynamic page titles for better navigation.

## 🛠️ Tech Stack

- **React & Vite** - Fast and modern frontend architecture.
- **Redux Toolkit** - Global state management for campers and filters.
- **React Router** - Smooth page transitions (Home, Catalog, Details).
- **CSS Modules** - Scoped and maintainable styling.
- **Axios** - Efficient API communication with MockAPI.

## 📁 Project Structure

- `/src/pages`: HomePage, CatalogPage, CamperDetailsPage.
- `/src/components`: Reusable UI elements like Filters, CamperCard, and Loader.
- `/src/redux`: Slices and selectors for state management.
- `/public`: Static assets including our custom camper favicon.

## 🚀 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/begumnarmanli/travel-trucks
   npm install
   npm run dev
   ```
