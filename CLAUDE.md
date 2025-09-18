# WhatsApp Without Saving Contact - Project Overview

## Project Purpose
A React web application that allows users to send WhatsApp messages to phone numbers without saving them as contacts. The app formats phone numbers and redirects users directly to WhatsApp.

## Architecture & Tech Stack
- **Framework**: React 19.1.1 with Vite 7.1.2
- **Language**: JavaScript (JSX)
- **Styling**: CSS with CSS-in-JS inline styles for responsive design
- **Build Tool**: Vite with React plugin
- **Linting**: ESLint with React hooks and refresh plugins
- **Deployment**: GitHub Pages (base path: `/whatsapp-without-saving-contact/`)

## File Structure
```
src/
├── main.jsx          # React app entry point
├── App.jsx           # Main application component
├── App.css           # Component-specific styles
├── index.css         # Global styles and dark theme
└── utils/
    └── phone.js      # Phone number utilities (sanitize, validate, URL builder)
```

## Key Features
1. **Phone Number Input**: Accepts various formats (+34, 0034, etc.)
2. **Real-time Validation**: Visual feedback (green/red borders)
3. **Country Code Detection**: Warns users about missing country codes
4. **Privacy Modal**: Toggleable privacy information
5. **Responsive Design**: Mobile-first with media queries
6. **Accessibility**: ARIA labels, semantic HTML, focus management

## Core Functions
- `sanitizePhoneInput()`: Strips non-digits and leading zeros
- `isLikelyValidPhoneNumber()`: Validates 8-15 digit range
- `buildWhatsAppUrl()`: Creates WhatsApp API URL
- Country code detection logic for user guidance

## Styling Approach
- Dark theme by default with light theme media query
- Mobile-first responsive design
- CSS custom properties for consistent theming
- WhatsApp green (#25D366) for primary actions
- Fixed modal overlay for warnings

## Development Commands
- `npm run dev`: Start development server (port 5173)
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Browser Compatibility
- Targets modern browsers with ES2020 features
- Uses system fonts for performance
- Includes webkit/moz prefixes for font smoothing

## Privacy & Security
- Client-side only processing
- No data sent to external servers
- Numbers cleared from memory after redirect
- No analytics or tracking