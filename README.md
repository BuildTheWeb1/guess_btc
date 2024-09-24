# BTC - Guess The Price

This is a React-based application that allows users to guess whether the price of Bitcoin (BTC) will go up or down. Players can select a user, make a guess, and see their score change based on the result of their guess. The app integrates with AWS Amplify, AppSync, and DynamoDB to store and manage player data and their scores.

CoinGecko’s public free API caches the data and refreshes once every 5 minutes.

Demo: https://master.d2q6c76wbtogmw.amplifyapp.com/

## Features

- User Selection: Users can select an existing player from the dropdown or create a new player.
- Real-time BTC Price: The current Bitcoin price is fetched every 25 seconds from a mock API.
- Guessing System: Players can guess whether the price will go up or down. If the player guesses correctly, their score increases; if they guess wrong, their score decreases.
- Persistent State: The player's state (current player and score) is persisted in localStorage so that it remains intact even after page reloads.
- AWS Integration: The app uses AWS Amplify and AppSync to manage the player data stored in DynamoDB. Scores are updated in real-time after each guess.

### Prerequisites

To get started with the app, ensure you have the following installed:

- Node.js (version 14 or higher)
- AWS Amplify CLI configured and linked to your AWS account.

## Installing

After installing the pre-requisites and cloning the repo, install the dependencies by running:

```
npm install
```

Configure AWS Amplify

```
amplify init
```

Setup AWS Services

```
amplify push
```

Run the development server

```
npm start
```

### How the App Works

Player Selection:

- A user can select an existing player from the dropdown or create a new player.
- Player data (ID, name, and score) is stored in DynamoDB.

Guessing the Price:

- The app fetches the current BTC price every 25 seconds. (Results are available once every couple of minutes).
- Users can make a guess if the BTC price will go up or down. If the player guesses correctly, their score increases by 1; otherwise, it decreases by 1.

Score Tracking:

- After each guess, the user's score is updated and saved to the DynamoDB table.

Persistence:

- The selected player and score are stored in localStorage, so even after refreshing the page, the player's session is maintained.

## Technologies Used

- React: Frontend framework for building the user interface.
- Material UI (MUI): For UI components and design.
- AWS Amplify: For managing the backend services like AppSync and DynamoDB.
- GraphQL: For querying and mutating data in DynamoDB.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request. Please ensure your changes are well-tested.
