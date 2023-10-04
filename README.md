# nineideas frontend README

**nineideas.net** is a minimalist social network and micro-blogging platform that encourages users to develop a habit of coming up with new ideas each day. The goal is to maintain a daily streak of developing nine ideas on a new topic every day. This project is part of a MERN (MongoDB, Express.js, React, Node.js) application.

View a short video demo of the site here:
<iframe width="560" height="315" src="https://www.youtube.com/embed/oy5Wy8Ah7ok?si=oZZZGTga_ywUVEoQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The project structure is organized as follows:

```
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── prjstr.txt
├── public
│   ├── _redirects
│   └── listplus.svg
├── src
│   ├── App.css
│   ├── components
│   │   ├── IdeasList.jsx
│   │   ├── PopupModal.jsx
│   │   ├── ShareList.jsx
│   │   └── VisibilityToggle.jsx
│   ├── config.js
│   ├── contexts
│   │   └── authContext.jsx
│   ├── error-page.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── routes
│   │   ├── addList.jsx
│   │   ├── contentModeration.jsx
│   │   ├── createList.jsx
│   │   ├── deleteList.jsx
│   │   ├── editList.jsx
│   │   ├── editUser.jsx
│   │   ├── lists.jsx
│   │   ├── logIn.jsx
│   │   ├── root.jsx
│   │   ├── signUp.jsx
│   │   ├── viewList.jsx
│   │   └── viewUser.jsx
│   └── utils
│       ├── list.js
│       ├── topic.js
│       └── user.js
├── tailwind.config.js
└── vite.config.js
```

Key directories and files:

- `dist`: Contains the built assets and HTML for production.
- `public`: Public assets, including SVG images and redirects configuration.
- `src`: Source code for the React application.
  - `components`: React components used throughout the app.
  - `contexts`: Context providers for application-wide state management.
  - `routes`: React Router components for different application routes.
  - `utils`: Utility functions for handling data and logic.
- `package.json`: Contains project dependencies and scripts.
- `postcss.config.js`: Configuration for PostCSS.
- `tailwind.config.js`: Configuration for Tailwind CSS.

## Installation

Before getting started, ensure you have the following prerequisites installed:

- Node.js and npm (Node Package Manager)
- Git

Follow these steps to set up and run the frontend of the nineideas.net project:

1. Clone this repository to your local machine.

2. Navigate to the project directory:

   ```shell
   cd nineideasfrontend
   ```

3. Install project dependencies:

   ```shell
   npm install
   ```

## Usage

To run the development server and start the frontend application, use the following command:

```shell
npm run dev
```

The application should now be running at http://localhost:5173/

The app is already configured to connect with the backend API.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, concise commit messages.
4. Push your changes to your fork.
5. Create a pull request to the `main` branch of this repository.

Please ensure your code follows best practices and includes appropriate documentation.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for your purposes while adhering to the terms of the license.

---

Thank you for your interest in **nineideas.net**! If you have any questions or issues, please don't hesitate to reach out to the project maintainers. Happy coding!