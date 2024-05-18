# CRUD App with Authentication

This project is a simple CRUD (Create, Read, Update, Delete) application built with Next.js and Firebase Authentication. It allows users to perform CRUD operations on data while requiring authentication for certain routes.

## Features

- User authentication using Firebase Authentication
- Create, read, update, and delete operations on data
- Protected routes that require authentication

## Technologies Used

- Next.js
- Firebase Authentication
- MongoDB (or any other database of your choice)

## Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- MongoDB (or another database if preferred)
- Firebase account and project setup

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>

2. Navigate to the project directory:

    ```bash
    cd <project-directory>

3. Install dependencies:

    ```bash
    npm install
    # or
    yarn install

4. Create a .env.local file in the root directory and add your Firebase configuration:

    ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
    NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>

5. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Usage
    - Register for a new account or log in if you already have one.
    - Once logged in, you can perform CRUD operations on the data.
    - Certain routes are protected and require authentication.

## Deployment
To deploy the application, you can follow the deployment instructions provided by Next.js and Firebase.

## License
This project is licensed under the GNU General Public License, Version 3 (GPL-3.0). See the [LICENSE](LICENSE) file for details.