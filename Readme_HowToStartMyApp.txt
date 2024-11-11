============================================================
Chat App for Midterm Project
============================================================

===== FOLDER STRUCTURE =====

This project consists of two parts: 
- the client (chat-app directory) 
- the server (chat-server directory). 

Each part has its own package.json to manage specific dependencies and scripts, 
and there is also a root-level package.json that includes scripts to manage both parts together.

WMDD4936-MID-TERM
│
├── chat-app                # Client-side code (React app)
│   ├── node_modules
│   ├── public
│   ├── src
│   ├── index.html
│   ├── package.json        # Client-specific dependencies and scripts
│   ├── vite.config.js
│   └── ... (other client files)
│
├── chat-server             # Server-side code (Node.js/Express app)
│   ├── node_modules
│   ├── messages.json       # JSON file to store chat messages
│   ├── server.js
│   ├── package.json        # Server-specific dependencies and scripts
│   └── ... (other server files)
│
├── package.json            # Root-level package.json with scripts for both client and server
└── Readme_HowToStartMyApp.txt


===== HOW TO START =====

1. Installing Dependencies

> npm run install:all

This command will install dependencies for both the client and server parts of the project.

2. Starting the Application

> npm run start:all

This command will start both the client and server parts of the project.


===== URL FOR APP & SERVER =====

The client-side app will be available at http://localhost:3000.

The endpoint for the server-side app is http://localhost:3001.
