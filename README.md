# BTC - Guess The Price

This is a React-based application that allows users to guess whether the price of Bitcoin (BTC) will go up or down. The app tracks the user's score locally and provides visual feedback based on the correctness of their guesses.

CoinGecko's public API is used to fetch Bitcoin price data, which is proxied through a Node.js Express server.

## Features

- Real-time BTC Price: The current Bitcoin price is fetched every 25 seconds from the CoinGecko API.
- Guessing System: Players can guess whether the price will go up or down. If the guess is correct, the score increases; if wrong, the score decreases.
- Visual Feedback: A character animation changes based on the result of the guess (happy for correct, sad for incorrect).
- Persistent Score: The player's score is saved in localStorage so that it remains intact even after page reloads.
- Responsive Design: The app is fully responsive and works on both desktop and mobile devices.

## Architecture

The application consists of two main parts:

1. **Frontend**: A React application built with TypeScript and Material UI
2. **Backend**: A simple Express server that proxies requests to the CoinGecko API

## Prerequisites

To get started with the app, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (usually comes with Node.js)

## Installation and Setup

After cloning the repository, follow these steps:

1. Install dependencies for both the frontend and backend:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

2. Start the backend server:

```bash
cd server
npm run dev
```

3. In a new terminal, start the frontend application:

```bash
npm start
```

The application should now be running at http://localhost:3000, with the backend server running at http://localhost:5001.

## How the App Works

### Guessing the Price:

1. The app fetches the current BTC price every 25 seconds from the CoinGecko API via the backend server.
2. Users can make a guess if the BTC price will go up or down by clicking the up or down arrow and submitting their guess.
3. After submitting a guess, a 60-second timer starts, during which the app waits for the price to change.
4. Once the price changes or the timer expires, the app evaluates the guess:
   - If the guess is correct (price moved in the predicted direction), the score increases by 1
   - If the guess is incorrect, the score decreases by 1

### Score Tracking:

- The user's score is tracked in the application state and saved to localStorage.
- The score persists between sessions, so users can continue where they left off.

### Visual Feedback:

- A character animation provides visual feedback based on the result of the guess:
  - Neutral expression when no guess has been made
  - Happy expression for correct guesses
  - Sad expression for incorrect guesses

## Technologies Used

- **Frontend**:
  - React: Frontend framework for building the user interface
  - TypeScript: For type safety and better developer experience
  - Material UI (MUI): For UI components and design
  - localStorage: For persisting user score

- **Backend**:
  - Node.js: JavaScript runtime for the server
  - Express: Web framework for the backend server
  - Axios: For making HTTP requests to the CoinGecko API

## API Integration

The app uses the CoinGecko API to fetch Bitcoin price data. To avoid CORS issues and rate limiting, all requests to the CoinGecko API are proxied through the backend server.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request. Please ensure your changes are well-tested.
