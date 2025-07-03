# WesAcademy

WesAcademy is a web application designed for online learning, featuring course management, user authentication, and more.

## Features

- User Authentication (Sign Up, Log In)
- Course Listing and Details
- Course Enrollment
- Instructor Dashboard
- Student Dashboard
- Course Player

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase (for backend and database)

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/johnwesleyquintero/wesacademy.git
    cd wesacademy
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your Supabase URL and Anon Key:

    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

    You can find these in your Supabase project settings.

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
.bolt/
.env
.gitignore
eslint.config.js
index.html
package.json
postcss.config.js
scripts/
src/
├── App.tsx
├── components/ (Reusable UI components)
│   ├── auth/
│   ├── courses/
│   ├── home/
│   └── layout/
├── contexts/ (React Contexts for global state)
│   └── AuthContext.tsx
├── data/ (Static data or mock data)
│   └── courseData.ts
├── hooks/ (Custom React hooks)
│   ├── useCourses.ts
│   └── useEnrollments.ts
├── index.css
├── lib/ (Utility functions and configurations)
│   └── supabase.ts
├── main.tsx
├── pages/ (Page-level components)
│   ├── CourseDetailPage.tsx
│   ├── CoursePlayer.tsx
│   ├── CoursesPage.tsx
│   ├── HomePage.tsx
│   ├── auth/
│   ├── dashboard/
│   └── instructor/
└── vite-env.d.ts
supabase/ (Supabase migrations)
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Contributing

Feel free to fork the repository and contribute. Pull requests are welcome.
