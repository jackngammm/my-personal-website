# Personal Website

A modern, production-ready personal portfolio built to showcase work in data analytics, machine learning, and system design. This project emphasizes clean architecture, performance, and visual storytelling to communicate technical capability.

---

## Overview

This website serves as a central hub for:

* Technical projects and case studies
* Data science and analytics work
* System design and engineering thinking
* Professional background and contact

Built with a focus on clarity, speed, and scalability.

---

## Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animation:** Framer Motion
* **Deployment:** (add when deployed — e.g., Vercel)

---

## Architecture

The project follows a modular, component-based structure:

```
app/
  layout.tsx        # Root layout
  page.tsx          # Homepage
  about/            # About page

components/
  HeroSection.tsx
  DataFlowVisual.tsx
  PortfolioSection.tsx
  ServicesSection.tsx
  Navbar.tsx
  Footer.tsx
  ...
```

Key principles:

* Separation of concerns (UI, layout, logic)
* Reusable components
* Scalable folder structure aligned with Next.js App Router

---

## Features

* Interactive hero section with animation
* Data-driven visual components (e.g., data flow visualization)
* Modular sections for portfolio, services, and content
* Responsive design across devices
* Optimized asset loading and performance

---

## Local Development

Clone the repository:

```
git clone https://github.com/jackngammm/my-personal-website.git
cd my-personal-website
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## Build & Production

Create production build:

```
npm run build
```

Start production server:

```
npm start
```

---

## Project Goals

* Present technical work with high signal clarity
* Demonstrate end-to-end capability: data → model → system → interface
* Maintain a clean, extensible codebase for future expansion
* Serve as a deployable, real-world portfolio asset

---

## Future Improvements

* Integration with backend APIs (FastAPI / data services)
* Dynamic project loading from structured data sources
* Advanced data visualizations tied to real datasets
* SEO and analytics optimization
* CI/CD pipeline and automated deployment

---

## License

This project is for personal and professional portfolio use.
