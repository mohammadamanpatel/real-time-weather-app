Weather Monitoring:
  description: >
    This Weather Monitoring project allows users to view detailed weather information and daily summaries. Built with React and Vite, the dashboard integrates with weather APIs and features Celsius temperature conversion, along with additional weather metrics. It also includes a server-side component for managing user-specific weather summaries and alert thresholds.

  folder_structure:
    Real Time Weather Monitoring:
      weather-frontend:
        - node_modules
        - public
          - public assets
        - src
          - assets
          - components
            - Daily-summary.jsx
            - Home.jsx
            - Weather-chart.jsx
          - config
            - axiosInstance.js
          - hooks
            - Fetch-weather.jsx
          - redux
            - store.js
            - weather-slice.js
          - App.css
          - App.jsx
          - index.css
          - main.jsx
        - .gitignore
        - Docker
        - docker-compose.yml
        - eslint.config.js
        - index.html
        - package-lock.json
        - package.json
        - postcss.config.js
        - README.md
        - tailwind.config.js
      weather-backend:
        - config
          - configuration files
        - controllers
          - weather.controller.js
        - models
          - weather.model.js
        - node_modules
        - routes
          - weather.route.js
        - utils
          - city.data.js
          - convert-temp.js
          - Fetch-Weather.js
          - firebase.js
          - mail-sender.js
        - .env
        - Docker
        - docker-compose.yml
        - package-lock.json
        - package.json
        - server.js

  installation:
    steps:
      - Clone the repository:
        - command: |
            git clone https://github.com/mohammadamanpatel/real-time-weather-app/
      - Backend setup:
        - command: |
            cd real-weather-backend
            npm install
      - Frontend setup:
        - command: |
            cd ../real-weather-frontend
            npm install

  running_applications:
    backend:
      - description: >
          Start the backend server. Ensure MongoDB instance is running.
      - command: |
          npm start
    frontend:
      - description: >
          Start the frontend development server, accessible at http://localhost:5173.
      - command: |
          npm run dev

  features:
    - Temperature Conversion
    - Daily Weather Summaries
    - Email Alerts
    - Backend Integration with MongoDB

  backend_functionality:
    WeatherSummaryModel:
      description: >
        Stores weather data collected for a user, including temperature, humidity, wind speed, and conditions.
    WeatherController:
      description: >
        Manages data operations like fetching, saving summaries, and sending email alerts when thresholds are exceeded.

  environment_variables:
    - MONGO_URL: "Your MongoDB connection string"
    - OPENWEATHER_API_KEY: "Your OpenWeather API key"
    - MAIL_HOST: "SMTP server host"
    - MAIL_PASS: "SMTP server password"
    - MAIL_USER: "SMTP server user"

Running the Backend

To start the backend:

```bash
npm run server
```

Ensure the environment variables are properly configured before running the server.

--- 

