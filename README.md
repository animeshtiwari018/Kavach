# 🛡️ Kavach OS

Kavach is a defense-inspired, macOS-style web operating system built to showcase personal software development projects, technical skills, and security dossier records in an interactive, modular environment.

## 🚀 Detailed Features Documentation

### 1. Interactive Desktop & Window Management
Kavach OS provides a fully functional, macOS-inspired desktop environment right in your browser. 
- **Draggable Windows:** Easily click and drag application windows around the screen.
- **Window Controls:** Standard macOS-style buttons (Close, Minimize, and Expand) are available on every app.
- **Dynamic Dock:** A responsive bottom dock with hover magnification to quickly launch or switch between active applications.
- **Active Focus (Z-index):** Clicking on any window brings it immediately to the front, just like a real operating system.

### 2. Seamless Mobile & Responsive Experience
Kavach OS is designed to work flawlessly across all devices, adapting intelligently to smaller screens.
- **iOS-Style Mobile Interface:** On mobile devices, the OS transforms from a windowed desktop into a smooth, app-based mobile interface.
- **Control Center:** A swipe-down or click-activated control panel to quickly toggle system settings like Dark Mode and Brightness.
- **Notification Center:** A dedicated panel to view system alerts and security notifications.
- **Unified Interactions:** Both panels are mutually exclusive, ensuring a clean and overlapping-free user experience on small screens.

### 3. Spotlight Search & Quick Navigation
Kavach OS includes a powerful, system-wide search and launcher utility to navigate the interface without touching the mouse.
- **Keyboard Shortcuts:** Press `Cmd + Space` (or `Ctrl + Space` on Windows/Linux) to instantly open the Spotlight search bar from anywhere.
- **App Launcher:** Type the name of any application (e.g., "Browser", "Terminal", "Projects") and hit Enter to instantly launch it.
- **Contextual Awareness:** Spotlight intelligently filters available system apps based on your query, providing a rapid execution flow.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Animations:** Motion (Framer Motion)
- **Styling:** Tailwind CSS + Custom CSS Variables
- **Icons:** Lucide React

## 💻 Getting Started

First, install dependencies and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the workstation in action.

## 🌐 Deployment

This project is optimized for deployment on the [Vercel Platform](https://vercel.com/new). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## 🗺️ Future Roadmap

- [ ] Add lock screen authentication simulation.
- [ ] Implement local storage caching for apps like Field Journal.
- [ ] Add more responsive themes and military-style color palettes.
- [ ] Build out the simulated VS Code IDE iframe integration.

## 📬 Contact & Links

- **GitHub:** [github.com/animeshtiwari018](https://github.com/animeshtiwari018)
- **Live Demo:** [kavach.security](https://kavach.security)
- **Developer:** Animesh Tiwari
