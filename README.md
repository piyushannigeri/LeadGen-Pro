# LeadGen-Pro

LeadGen Pro is a modern, AI-powered sales outreach platform designed to automate and streamline your sales workflow. It helps you find ideal customers, generate personalized outreach content, and prioritize your best leads, so you can focus on closing deals.

## ✨ Key Features

- **🤖 AI-Powered Lead Generation**: Instantly discover high-quality, fictional leads tailored to your ideal customer profile (industry, location, company size).
- **🎯 Intelligent Lead Scoring**: Get an AI-generated score (0-100) for your leads based on provided details to prioritize your efforts.
- **✉️ AI-Crafted Email Outreach**: Automatically generate persuasive, personalized cold emails that are designed to get responses.
- **🔗 LinkedIn Message Generation**: Create engaging and concise LinkedIn connection request messages to build professional relationships.
- **📊 Dynamic Overview Dashboard**: View real-time statistics of your generated and scored leads in a clean, visual dashboard.
- **🗺️ Google Maps Integration**: Instantly visualize the location of any generated or scored lead with a single click.
- **📹 Video Call Link Generation**: Quickly create unique and shareable Jitsi video call links for meetings.
- **🔐 Secure Authentication**: Full user management and secure authentication powered by Firebase.
- **🎨 Modern UI**: A sleek, responsive interface with both light and dark modes, built with ShadCN UI and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & ShadCN UI
- **AI Orchestration**: Genkit
- **Generative AI Model**: Google Gemini 2.0 Flash
- **Authentication**: Firebase Authentication

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Git](https://git-scm.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    cd YOUR_REPOSITORY_NAME
    ```

2.  **Create an Environment File:**
    This project requires API keys to connect to Firebase and Google AI services. Create a new file named `.env.local` in the root of your project folder and add the following content.

    ```env
    # Firebase Configuration - Get these from your Firebase project settings
    NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

    # Google AI (Genkit) Configuration - Get this from Google AI Studio
    GOOGLE_API_KEY=your-google-ai-api-key
    ```
    > **Where to get keys:**
    >
    > -   **Firebase**: Go to your Firebase project, click the gear icon for "Project settings", and under the "General" tab, you'll find your web app's configuration.
    > -   **Google AI**: Visit [Google AI Studio](https://aistudio.google.com/) and click "Get API key".

3.  **Install Dependencies:**
    This command reads the `package.json` file and installs all the necessary libraries.
    ```bash
    npm install
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
