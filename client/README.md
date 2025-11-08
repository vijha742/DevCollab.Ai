# DevCollab.Ai - Auth0 Integration

A beautiful, modern authentication page built with Next.js 15 and Auth0.

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradient backgrounds and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Accessibility**: Focus states and proper ARIA labels for screen readers
- **Loading States**: Beautiful loading animations and states
- **Profile Cards**: Elegant user profile display with stats and verification badges

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- An Auth0 account (free tier available)

### Installation

1. **Clone and install dependencies:**

   ```bash
   cd client
   npm install
   ```

2. **Set up Auth0:**

   - Go to [Auth0 Dashboard](https://manage.auth0.com/)
   - Create a new Application (Single Page Application)
   - Configure Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
   - Configure Allowed Logout URLs: `http://localhost:3000`

3. **Environment Configuration:**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your Auth0 credentials in `.env.local`:

   ```env
   AUTH0_SECRET='use-openssl-rand-hex-32-to-generate'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='https://YOUR_DOMAIN.auth0.com'
   AUTH0_CLIENT_ID='your_client_id'
   AUTH0_CLIENT_SECRET='your_client_secret'
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Features

### 🔐 Authentication

- Secure Auth0 integration
- Login/logout functionality
- Protected routes
- Session management

### 🎨 User Interface

- **Gradient Backgrounds**: Beautiful animated gradients
- **Glassmorphism**: Modern card designs with backdrop blur
- **Hover Effects**: Smooth button animations and interactions
- **Typography**: Clean, readable fonts with proper hierarchy
- **Icons**: Emoji-based icons for a friendly, modern look

### 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Flexible layouts that adapt to any screen size

### 🌙 Dark Mode

- Automatic detection of system preferences
- Smooth transitions between light and dark themes
- Optimized contrast for accessibility

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Authentication**: Auth0
- **Styling**: Custom CSS with CSS Variables
- **TypeScript**: Full type safety
- **Fonts**: Inter (Google Fonts)

Built with ❤️ using Next.js and Auth0
