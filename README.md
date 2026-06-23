# Simone Maccario - Personal Portfolio

Welcome to the repository for my personal portfolio website! This project showcases my academic journey, collaborative projects, and technical skills.

**Live Site:** [simo-macca.github.io](https://simo-macca.github.io)

## Tech Stack

This portfolio is built as a single-page application using modern web technologies:

- **Framework:** [Vue.js](https://vuejs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Custom CSS with a dedicated Dark/Light mode toggle
- **Package Manager:** npm

## Project Structure

The application is modularized to separate views, reusable components, and global state:

- `src/views/`: Contains the main page layouts (`HomeView.vue`, `AboutView.vue`, `ProjectsView.vue`, `SkillsView.vue`, `ContactView.vue`).
- `src/components/`: Reusable UI elements (`ProjectCard.vue`, `TechCardComponent.vue`, `NavbarComponent.vue`, `ContactFormComponent.vue`, etc.).
- `src/stores/`: Global state management, including `ThemeStore.js` for handling user theme preferences.
- `public/`: Static assets like the favicon and Open Graph preview image (`og-image.png`).

## Local Development Setup

To run this project locally on your machine, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/simo-macca/simo-macca.github.io.git](https://github.com/simo-macca/simo-macca.github.io.git)
   ```

2. Navigate to the project directory:

   ```bash
   cd simo-macca.github.io
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Development Server

To compile and hot-reload for development, run:

```bash
npm run dev
```

### Production Build

To compile and minify for production, run:

```bash
npm run build
```

## Deployment

This project uses Continuous Integration and Continuous Deployment (CI/CD). It is configured to automatically build and deploy to GitHub Pages using a custom GitHub Actions workflow (`.github/workflows/deploy.yml`) whenever changes are pushed to the `main` branch.

---

_Designed and developed by Simone Maccario._
