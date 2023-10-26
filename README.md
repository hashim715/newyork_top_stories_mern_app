# MERN Top Stories App

This is a MERN (MongoDB, Express.js, React, Node.js) web application that fetches and displays top stories from the New York Times API.

## **Table of Contents**

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [Project View](#project-view)

## **Overview**

This application retrieves top stories from the New York Times API and displays them as cards with images. Users can click on a card to view the full story on the New York Times website.

### **Frontend Features**

1. The app has a single page where all the top stories are displayed.
2. Each card displays an image, and when clicked, it redirects the user to the corresponding story on the New York Times website.

### **Backend Features**

1. The backend uses an Express.js server to fetch data from the New York Times API.
2. The application requires a New York Times API key for authentication. For this purpose I have implemented a sign-in/sign-up page which will first authenticate user and only then they can use my API key and view New York Times articles.

## **Prerequisites**

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- A MongoDB instance set up, if you want to store additional data.
- A New York Times API key. You can obtain one by signing in at [New York Times Developer](https://developer.nytimes.com/).

## **Getting Started**

To get the project up and running, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/hashim715/newyork_top_stories_mern_app.git
   ```

2. Open the repository folder in your code editor and if you are not already in the project directory then first run the following command to navigate to the project directory:

   ```bash
   cd newyork_top_stories_mern_app
   ```

3. Install the server dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Set up your environment variables. Create a **`.env`** file in the **`backend`** directory and add your New York Times API key:

   ```
   JWT_SECRET_REFRESH=dfe520f1e28cc249f28af30a6e2eaf4a489ea113c201aa21a5e50cc52d47fc225dda9a
   JWT_REFRESH_EXP=10 days
   MONGO_URI=your-mongodb-database-url
   api_key=your_api_key_here
   ```

5. Install the client dependencies and start the React app:

   ```bash
   cd ..
   cd frontend
   npm install
   npm start
   ```

6. Start the Express.js server:

   ```bash
   cd ..
   cd backend
   npm start
   ```

## **Project Structure**

- ````````frontend**/**`: The React frontend of the application.
- ```````backend**/**`: The Express.js backend for fetching data from the New York Times API.
- ```````bakcend**/.env**`: Configuration file for storing environment variables (e.g., API key).

## **Usage**

To use the application, open your web browser and navigate to [http://localhost:3000/](http://localhost:3000/). You will have to sign in or sign up to see the top stories displayed as cards. Click on a card image or view button to read the full story on the New York Times website.

## **Contributing**

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.

## Project View

![Untitled](MERN%20Top%20Stories%20App%207bfd20ff11f34a1b9aff8e9eaafc2eb9/Untitled.png)

![Untitled](MERN%20Top%20Stories%20App%207bfd20ff11f34a1b9aff8e9eaafc2eb9/Untitled%201.png)
