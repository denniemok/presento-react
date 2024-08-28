# Presento

Presento is a web application designed for creating clean, straightforward slideshow presentations. The frontend is powered by ReactJS, while the backend leverages ExpressJS to provide a seamless RESTful API interaction.

## Main Features

**Authentication**
  - Register, login, and logout.

**Slide Setup**
  - Create and delete presentations.
  - Display slides as cards, showing name, thumbnail, description, and slide count.
  - Edit, delete, and navigate slides, and manage presentation titles and thumbnails.

**Slide Elements**
  - Add and manage text, images, videos, and code blocks on slides.
  - Resize, reposition, and layer elements.
  - Double-click elements to edit properties.

**Further Features**
  - Customize font family, select background themes (solid/gradient), and preview slides.
  - Update URLs dynamically to reflect the current slide for easier navigation.

## Getting Started

To run the frontend:

1. Navigate to the `frontend` directory.
2. Install dependencies by running `npm install` (only required once).
3. Start the frontend with `npm start`.

This will start the React app accessible at `http://localhost:8000`.

To run the backend server:

1. Navigate to the `backend` directory.
2. Install dependencies by running `npm install` (only required once).
3. Start the backend server with `npm start`.

The backend server will be available at `http://localhost:5000`, where you can view the API interface and interact with the available HTTP routes.

If linting is required, run `npm run lint` from inside the `frontend` folder.

## Special Remarks

This app prioritizes functionality over design. It provides a basic user experience with a minimalistic visual layout.