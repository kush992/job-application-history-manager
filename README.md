# JobJourney – Your Job Application Tracker

_Streamline Your Job Search with Precision and Ease_

## Tired of spreadsheets for tracking job applications?

With JobJourney, effortlessly manage and track every application, from submissions to interviews, in a single portal. Forget Excel – our tool is designed to organize all your application data, including files, notes, and interview insights, all in one place for easy access and analysis.

### How JobJourney Works

Seamless Application Management
Track each job application without the hassle of manual data entry. Upload screenshots, files, and relevant information for complete records.

### Document & File Storage

Centralize everything – from resumes to feedback. Keep all related documents securely stored with each application.

### Interview Insights

Record interview questions, answers, and notes. Optionally, share insights with others on our community page or keep it private for personal reference.

### Status Sorting & Real-Time Updates

Easily sort and review applications by status, prioritize tasks, and stay organized without clutter.

## Branching

-   **Feature Branches:** Branch name should start with `feat/your-branch-name`
-   **Bug fixes:** Branch name should start with `bugfix/[githubIssueId]-bug-name`

## Folder Structure

```
├── public
├── src
│   ├── app
│   │   ├── api               # API routes for the application
│   │   ├── page.tsx          # Main entry page for the app
│   │   ├── layout.tsx        # Main layout for the app
│   │   ├── favicon.ico       # Favicon for the app
│   │   └── global.css        # Global CSS styles
│   ├── appwrite              # Appwrite-related configuration and setup
│   ├── components            # Reusable UI components
│   ├── config                # Configuration and environment variables
│   ├── hooks                 # Custom React hooks
│   ├── lib
│   │   └── server            # Server-specific libraries and functions
│   ├── types                 # TypeScript types and interfaces
│   └── utils                 # Utility functions and helpers
└── README.md                 # Project documentation

```

## Environment variables

To get run the application locally, creat a file named `.env.local` and copy the below variables or from `.env.example`

```
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_API_ENDPOINT=
NEXT_PUBLIC_APPWRITE_API_KEY=
NEXT_PUBLIC_APPLICATION_DB=
NEXT_PUBLIC_APPLICATION_DB_COLLECTION_ID=
NEXT_PUBLIC_TINYMCE_API_KEY=
NEXT_PUBLIC_APPLICATION_DB_DOCUMENTS_COLLECTION_ID=
NEXT_PUBLIC_APPLICATION_DB_INTERVIEW_QUESTIONS_COLLECTION_ID=

# GCP credentials
PROJECT_ID=
CLIENT_EMAIL=
PRIVATE_KEY=
BUCKET_NAME=

# UI configuration
NEXT_PUBLIC_UI_SHOW_DATA=
NEXT_PUBLIC_UI_SHOW_UPLOADER=

```

## Tech stack and tools used:

### Core Technologies

-   **Next.js:** Framework for server-rendered React applications with routing, API routes, and SEO optimization.
-   **TypeScript:** Strongly-typed JavaScript for enhanced development experience and reliability.

### Backend and Authentication

-   **Appwrite:** Backend-as-a-service for database management and user authentication, handling all backend operations like data storage and authentication.

### UI Libraries and Styling

-   **Radix UI:** Low-level, accessible, and customizable UI components, such as accordions, dialogs, checkboxes, and more.
-   **Tailwind CSS:** Utility-first CSS framework for custom styling, used alongside plugins like tailwindcss-animate and @tailwindcss/typography.
-   **Lucide React:** Icon libraries for versatile and customizable icons.
-   **Next Themes:** Allows theme switching in Next.js applications, helping implement a dark/light mode feature.

### Form Management and Validation

-   **React Hook Form:** A lightweight library for form handling and validation.
-   **@hookform/resolvers:** Adapters for integrating validation libraries (such as Zod) with React Hook Form.
-   **Zod:** TypeScript-first schema declaration and validation library, useful for form validation and data type checking.

### Date and Time

-   **Date-fns:** Utility library for manipulating and formatting dates, particularly useful for user-friendly date displays.
-   **React Day Picker:** Component for handling date selection, useful for scheduling or date-picking interfaces.

### State Management and Data Fetching

-   **React Query:** Data-fetching and caching library, especially useful for managing server state in React applications, with dev tools to visualize and debug state.

### User-facing Markdown and Rich Text Editing

-   **TinyMCE React:** WYSIWYG editor that provides a rich text editing experience for users, often used for content creation.

### Cloud Storage

-   **Google Cloud Storage:** Storage solution for managing and storing files in the cloud.

### Utilities and Helpers

-   **Lodash and Lodash.debounce:** Utility libraries for data manipulation, including performance optimization with debouncing.
-   **Nanoid:** Small, secure, URL-friendly unique ID generator.
-   **Clsx and Classnames:** Utilities for managing CSS class names conditionally.
-   **DomPurify:** Library to sanitize HTML content, protecting against XSS attacks.

### Development and Build Tools

-   **ESLint:** Linter for identifying and fixing code issues, configured with eslint-config-next for Next.js projects.
-   **TailwindCSS and PostCSS:** Tools for CSS processing and transformations.
-   **TypeScript:** Provides static typing to catch errors early in development.
