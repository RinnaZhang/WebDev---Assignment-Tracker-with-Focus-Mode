# Assignment Tracker with Focus Mode

A React-based web application that allows users to manage assignments, enter focus mode, and view motivational quotes.

## Problem Solved
In my experience, different professors use various platforms to assign tasks, which often leads to me missing or forgetting assignments. This app solves that problem by providing a centralized space to track **all** assignments with due dates in one place. It also offers a focus mode to help concentrate on studying and displays motivational quotes to keep me inspired during study sessions.

## Features
- **Assignment Management**: Add, edit, and delete assignments with specific due dates.
- **Persistent Storage**: Assignments are saved in the browser’s local storage, so they persist even after refreshing the page.
- **Focus Mode**: A 1-hour countdown timer for focused study sessions, displayed prominently in the middle of the screen.
- **Motivational Quotes**: A new quote fetched from the ZenQuotes API each time the app is loaded.

## Setup and Run Instructions

### Prerequisites
- [Node.js](https://nodejs.org) and npm should be installed on your machine.

### Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/RinnaZhang/WebDev---Assignment-Tracker-with-Focus-Mode

2. Navigate to the project directory:
   ```bash
   cd WebDev---Assignment-Tracker-with-Focus-Mode

3. Install dependencies:
   ```bash
   npm install

2. Run the application:
   ```bash
   npm start
   (The app will run on “http://localhost:3000”.)

## API Information
ZenQuotes API: The app uses the ZenQuotes API to fetch random motivational quotes to motivate user (and myself) to work harder. 

## Credits for AI-generated Code
This project was developed with the help of ChatGPT, with all AI-assisted code thoroughly noted and reviewed.

In this project, ChatGPT mainly assisted with storing data. Initially, my code did not save data in local storage, so all assignments disappeared upon page refresh. With ChatGPT's help, I successfully implemented persistent data storage for assignments.

Additionally, AI helped solve CORS issues when fetching from the ZenQuotes API. ChatGPT recommended using the AllOrigins service as a proxy, which allowed the app to load quotes successfully without cross-origin errors.
