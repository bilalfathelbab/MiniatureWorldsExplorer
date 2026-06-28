# Miniature Worlds Explorer

An interactive educational web application for exploring the microscopic organisms found in freshwater ecosystems.

Designed for museum visitors, students, and educators, Miniature Worlds Explorer presents scientific information in a simple, engaging interface optimized for touch devices such as iPads.

## Live Demo

Visit the application here:

https://bilalfathelbab.github.io/MiniatureWorldsExplorer/

## Features

* Interactive species grid with responsive card layout.
* Detailed information page for every organism.
* High quality microscope imagery.
* Scientific names with clear formatting.
* Animated backgrounds and subtle UI effects.
* Fullscreen image viewer with zoom support.
* Data driven architecture using JSON files.
* Responsive design for desktop and tablet devices.
* Modular CSS and JavaScript architecture.

## Project Structure

```text
MiniatureWorldsExplorer/
│
├── common/
│   └── Species data (JSON)
│
├── css/
│   ├── animations.css
│   ├── base.css
│   ├── bubbles.css
│   ├── detail.css
│   ├── home.css
│   ├── responsive.css
│   └── variables.css
│
├── images/
│   └── Species photographs
│
├── js/
│   ├── bubbles.js
│   ├── cards.js
│   ├── data.js
│   ├── detail.js
│   ├── main.js
│   └── textFit.js
│
├── index.html
├── favicon.png
└── README.md
```

## Technologies

* HTML5
* CSS3
* JavaScript (ES6)
* Tailwind CSS (utility classes)
* JSON

## Architecture

The application follows a modular structure.

### HTML

`index.html` contains the application layout and reusable templates.

### CSS

The stylesheet is split into logical modules.

* `variables.css` contains reusable design variables.
* `base.css` contains global styles.
* `home.css` styles the home screen.
* `detail.css` styles the species detail view.
* `bubbles.css` contains the animated background effects.
* `animations.css` contains all keyframe animations.
* `responsive.css` contains responsive overrides.

### JavaScript

Each script has a single responsibility.

* `data.js` loads and manages species data.
* `cards.js` builds the home screen species cards.
* `detail.js` renders the species detail view.
* `bubbles.js` creates the animated background.
* `textFit.js` automatically adjusts text sizing.
* `main.js` initializes the application.

## Adding a New Species

Adding a new organism only requires three steps.

1. Add a new JSON file to the `common` folder.
2. Add the corresponding microscope image to the `images` folder.
3. The application will automatically generate the home screen card and detail page.

No HTML changes are required.

## Running Locally

Clone the repository.

```bash
git clone https://github.com/BilalFathelbab/MiniatureWorldsExplorer.git
```

Open the project folder.

Run a local web server, for example using the VS Code Live Server extension.

Open `index.html` through the local server.

## Purpose

Miniature Worlds Explorer was created as an educational resource to help museum visitors explore freshwater microorganisms through an intuitive, touch friendly interface.

The application focuses on presenting scientific information in an accessible format while remaining lightweight, responsive, and easy to maintain.

## Future Improvements

* Search functionality.
* Species filtering and categories.
* Additional organisms.
* Offline Progressive Web App support.
* Accessibility improvements.
* Educational quizzes and interactive activities.

## License

This project is intended for educational purposes.

Microscope images and educational content remain the property of their respective owners where applicable.
