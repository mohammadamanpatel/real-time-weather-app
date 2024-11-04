
---

Weather Monitoring

This Weather Monitoring project allows users to view detailed weather information and daily summaries. Built with React and Vite, the dashboard integrates with weather APIs and features Celsius temperature conversion, along with additional weather metrics. It also includes a server-side component for managing user-specific weather summaries and alert thresholds.

Folder Structure:-

```
Real Time Weather Monitoring
├── weather-frontend
│   ├── node_modules
│   ├── public
│   │   └── (public assets)
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── Daily-summary.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Weather-chart.jsx
│   │   ├── config
│   │   │   └── axiosInstance.js
│   │   ├── hooks
│   │   │   └── Fetch-weather.jsx
│   │   ├── redux
│   │   │   ├── store.js
│   │   │   └── weather-slice.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── Docker
│   ├── docker-compose.yml
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   └── tailwind.config.js
└── weather-backend
    ├── config
    │   └── (configuration files)
    ├── controllers
    │   └── weather.controller.js
    ├── models
    │   └── weather.model.js
    ├── node_modules
    ├── routes
    │   └── weather.route.js
    ├── utils
    │   ├── city.data.js
    │   ├── convert-temp.js
    │   ├── Fetch-Weather.js
    │   ├── firebase.js
    │   └── mail-sender.js
    ├── .env
    ├── Docker
    ├── docker-compose.yml
    ├── package-lock.json
    ├── package.json
    └── server.js
```

Installation

1. Clone the repository:

   ```
   git clone https://github.com/mohammadamanpatel/real-time-weather-app/
   ```

2. For the backend, navigate to the backend directory and install the dependencies:

   ```
   cd real-weather-backend
   npm install
   ```

3. For the frontend, navigate to the frontend directory and install the dependencies:

   ```
   cd ../real-weather-frontend
   npm install
   ```

Running the Applications

Backend

To start the backend server, ensure your MongoDB instance is running, and use the following command:

```
npm start
```

This will start the backend server on the port specified in the `.env` file.

Frontend

To start the frontend development server, navigate to the frontend directory and use the following command:

```
npm run dev
```

This will start the application on [http://localhost:5173]. You can view it in your web browser.

Building for Production

Backend

To build the backend for production, make sure you have set the appropriate environment variables in the `.env` file. Then, you can run:

```
npm run build
```

Frontend

To build the frontend application for production, run:

```
npm run build
```

This command will create an optimized production build in the `dist` folder.

Linting

To check for linting errors for both frontend and backend, use the following commands:

Frontend:

```
npm run lint
```

Backend (if you have a lint script in the backend `package.json`):

```
npm run lint
```

Previewing the Build

Frontend

To preview the production build locally, run:

```
npm run preview
```

Features

- Temperature Conversion: All temperature data is converted to Celsius from Kelvin or Fahrenheit.
- Daily Weather Summaries: Saves and displays daily weather summaries including temperature, humidity, wind speed, and dominant conditions.
- Email Alerts: Users can set thresholds for temperature and weather conditions, triggering email alerts when these thresholds are exceeded.
- Backend Integration: Includes a MongoDB database to store user-specific weather summaries.

Backend Functionality

WeatherSummary Model

The WeatherSummary model stores the weather data collected for a user on a particular day, including various temperature metrics, humidity, wind speed, and dominant weather conditions.

Weather Controller

The weather controller manages key operations such as fetching data, saving summaries, and sending alerts when weather thresholds are breached. It includes functions to check if a daily summary exists, save new or updated summaries, and send email alerts if thresholds are exceeded.

MongoDB & Mongoose Setup

This project uses MongoDB as the database, with Mongoose for schema definitions and managing the database connection. You can set it up as follows:

1. Install and run MongoDB locally, or use a cloud database provider such as MongoDB Atlas.
2. Make sure the database URL is correctly set in the `.env` file as `MONGO_URL`.

The following code snippet demonstrates how to establish a connection to MongoDB using Mongoose:

```javascript
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const DBConnection = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL);
        if (connection) {
            console.log('Connected to MongoDB:', connection.host);
        }
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
```

After setting up MongoDB, you can run the backend, and Mongoose will automatically handle connecting to the database and applying any schema logic.

Sample Schema

Here’s an example of a Mongoose schema used in the project:

```javascript
const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    windSpeed: { type: Number, required: true },
    condition: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
```

This schema defines a `WeatherSummary` with fields for the date, temperature, humidity, wind speed, and weather condition, along with automatic timestamps.

API Routes

- Set Thresholds: Users can set temperature and weather condition thresholds for email alerts.
- Fetch Weather Summaries: Fetches weather data for multiple cities and stores the daily summaries in the database.

Environment Variables

The project requires the following environment variables:

```bash
MONGO_URL="Your MongoDB connection string"
OPENWEATHER_API_KEY="Your OpenWeather API key"
MAIL_HOST="SMTP server host"
MAIL_PASS="SMTP server password"
MAIL_USER="SMTP server user"
```

Running the Backend

To start the backend:

```bash
npm run server
```

Ensure the environment variables are properly configured before running the server.

--- 
