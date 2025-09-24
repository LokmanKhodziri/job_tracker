# Job Application Tracker: A Full-Stack Project for Assessment 🚀

This project is a robust, full-stack Job Application Tracker designed to demonstrate proficiency in modern web development practices, including secure authentication and comprehensive CRUD operations. It provides users with an intuitive platform to manage their job search efficiently.

## Key Features & Technical Highlights ✨

This application showcases the following capabilities and architectural decisions:

-   **Secure User Authentication & Authorization:**
    -   Implemented a secure registration and login flow.
    -   Utilizes **JSON Web Tokens (JWT)** for stateless authentication, ensuring secure API access.
    -   Passwords are securely hashed using **Bcrypt** before storage.
-   **Comprehensive CRUD Operations for Job Applications:**
    -   **Create:** Users can add new job applications with essential details (company, position, status, notes).
    -   **Read:** All user-specific applications are displayed, with efficient data retrieval.
    -   **Update:** Existing application details and status can be easily modified via a dedicated modal interface.
    -   **Delete:** Applications can be removed, ensuring data integrity and user control.
-   **Dynamic Application Filtering:**
    -   Allows users to filter their applications by various statuses (Applied, Interviewing, Offer, Rejected, All), enhancing usability and data management.
-   **Intuitive User Interface (UI):**
    -   A clean, responsive, and user-friendly interface built with **React** and styled with modular **CSS**.
    -   Features a dedicated home page for unauthenticated users and a clear navigation structure.
-   **Modular & Scalable Architecture:**
    -   Clear separation of concerns between frontend and backend.
    -   Utilizes **TypeScript** across both layers for enhanced code quality, maintainability, and scalability.

## Technologies Employed 🛠️

### Frontend (Client-Side Application)

-   **React:** Chosen for its component-based architecture, enabling efficient and maintainable UI development.
-   **TypeScript:** Provides static type checking, significantly reducing runtime errors and improving code readability and refactoring capabilities.
-   **Vite:** Selected for its lightning-fast development server and optimized build process, contributing to a superior developer experience.
-   **React Router DOM:** Manages declarative routing, ensuring a smooth single-page application experience.
-   **Axios:** A robust, promise-based HTTP client used for clear and concise API interactions.
-   **CSS:** Custom styling for a tailored and responsive user experience.

### Backend (API Server)

-   **Node.js & Express.js:** A powerful and minimalist combination for building a high-performance RESTful API.
-   **TypeScript:** Applied to the backend for type safety, improving API reliability and developer collaboration.
-   **Prisma:** A modern ORM that simplifies database interactions with type-safe queries, enhancing developer productivity and reducing common database-related errors.
-   **MySQL:** A reliable and widely-used relational database, chosen for its robustness and scalability.
-   **JWT (JSON Web Tokens):** Standard for secure information exchange, critical for authentication.
-   **Bcrypt:** Industry-standard library for secure password hashing.
-   **CORS:** Configured to allow secure communication between the frontend and backend.
-   **Dotenv:** Manages environment-specific configurations, promoting secure handling of sensitive data.

## Getting Started: Running the Application 🏃‍♀️💨

This project can be set up and run manually, which is suitable for local development and deployment to platforms like Vercel (for the frontend).

### Prerequisites

Ensure you have the following installed on your system:

-   **Node.js:** (LTS version recommended)
-   **npm** (comes with Node.js) or **Yarn**
-   **MySQL Server:** Your database powerhouse!
-   **Git:** To clone this awesome repo.

### Backend Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd job-tracker
    ```

2.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    ```

4.  **Configure Environment Variables:**

    Create a `.env` file in the `backend/` directory with the necessary environment variables. See the [Environment Variables](#environment-variables-env) section below.

5.  **Setup Database:**

    Ensure your MySQL server is running. Then, apply Prisma migrations to create the database schema:

    ```bash
    npx prisma migrate dev --name init
    ```
    *(You might need to adjust the migration name if it's different or skip if already applied.)*

6.  **Start the backend server:**

    ```bash
    npm run dev
    # The server will run on http://localhost:5000 (or your specified PORT)
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    ```

3.  **Configure Environment Variables:**

    Create a `.env` file in your `frontend/` directory. This tells your frontend where to find the backend API. See the [Environment Variables](#environment-variables-env) section.

4.  **Start the frontend development server:**

    ```bash
    npm run dev
    # The app will open in your browser, usually at http://localhost:5173
    ```

## Environment Variables (`.env`): Security Best Practices 🔒

These files contain sensitive configuration and **must never be committed to version control**. They are correctly listed in `.gitignore`.

### Backend (`backend/.env`)

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
JWT_SECRET="your_super_secret_and_long_key_here"
PORT=5000
```

-   **`DATABASE_URL`**: Your MySQL connection string. Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE_NAME` with your actual database credentials.
    -   *Example:* `mysql://root:mysecretpassword@localhost:3306/my_job_tracker_db`
-   **`JWT_SECRET`**: A critical, long, and random string for securing JWTs. Generate a strong, unique key.
-   **`PORT`**: The port your backend server will listen on. Default is `5000`.

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL="http://localhost:5000/api"
```

-   **`VITE_API_BASE_URL`**: This tells your frontend where to send its requests to the backend. During local development, this will point to your local backend server. For Vercel deployment, you will configure this environment variable directly in Vercel to point to your deployed backend API URL.

## Deployment to Vercel (Frontend) 🌐

This project's frontend is designed to be easily deployable to platforms like Vercel. You can connect your frontend repository to Vercel, and it will automatically build and deploy your application. Remember to configure the `VITE_API_BASE_URL` environment variable in your Vercel project settings to point to your deployed backend API.

## How to Interact with the Application 🌟

1.  **Registration:** Create a new user account via the `/register` page.
2.  **Login:** Access your account using your credentials.
3.  **Dashboard:** Gain insights into your application statistics and progress.
4.  **Applications Management:** The core of the app! Add, view, update, and delete job applications. Leverage the filtering options to efficiently navigate your list.

## Code Quality & Best Practices ✅

Throughout this project, emphasis has been placed on:

-   **Modularity:** Clear separation of concerns (frontend/backend, components, routes, controllers, services).
-   **Type Safety:** Extensive use of TypeScript to prevent common errors and improve code maintainability.
-   **Error Handling:** Basic error handling implemented in API routes and frontend components.
-   **Environment Configuration:** Proper use of `.env` files for sensitive data and configuration.
-   **Deployment Considerations:** Designed for straightforward deployment to platforms like Vercel.

## Future Enhancements (Ideas for Discussion) 💡

-   More detailed dashboard analytics and visualizations.
-   Notifications for application status changes or follow-ups.
-   Integration with external job boards.
-   Advanced search and sorting options.
-   Unit and integration testing for both frontend and backend.

## License 📄

This project is open-source and available under the MIT License.