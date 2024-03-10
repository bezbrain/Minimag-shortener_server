# MINIMAG URL SHORTENER SERVER

## Getting Started

To start working on the project, follow the following steps:

1. Fork repository to your local GitHub account.
2. Clone the forked repository to your local development environment.
3. Install the required dependencies by running `npm install` in the project directory.
4. Open the project in your preferred code editor.
5. Review the existing code in the src directory to understand the initial structure and components hierarchy.
6. Develop the URL shortener and customization endpoints by modifying the necessary files.
7. Run the application using `npm start`
8. Commit you changes when significant changes are made, then push them to a branch in your forked repository.
9. Once you have completed the project goals, create a pull request to merge your changes into the main repositiory.

## Technical Instruction

1. Fork this repo to your local GitHub account.
2. Create a new branch to complete all your work in.
3. Test your work with your preferred testing tool.
4. Create a Pull Request against your main branch when you are done and all tests are passing.

## Project Overview

The goal of this project is to build a fully functional URL shortener ENDPOINTS with the following major features:

- User authentication endpoints
- URL shortening endpoints
- URL customization endpoints
- Analytics of shortened and customized URLs performance endpoints

## Major Libraries Used

There are many librabries used for the projects and the ones that might look obscure to you and what they do are:

1. @google-analytics/data - for fetching pages' analytics and urls performance data
2. bcryptjs - for password encryption
3. crypto - for generating jwtSecret
4. nanoid - for generating parameter for short URLs

To install any of these librabries, just run: `npm install <library name>` eg. To install crypto: `npm install crypto`

## Database Management

`MongoDB` was used for this project and the Object Data Modeling (ODM) library used was `Mongoose`

## Project Goals

1. Develop the URL manipution endpoints:

- Develop user authentication endpoint:
  - The user should be able to register with username, email and password
  - The user should be able to login with username/email and password
  - The user should be able to logout
- Develop URL manipulation endpoints:

  - URL shortening
  - URL customizing

  2. Ensure code quality:

     - Write clean, well-structured, and maintainable codes; one of the ways which is, maintaining modular programming.
     - Follow best practices and adhere to the `Node.js` and `Express.js` coding conventions.

  3. Code documentation:

     - Document your code by adding comments and explanatory notes where necessary.

  4. Use version control:

     - Use `Git` for version control. Commit you changes when important changes are made and push them to a branch in your forked repository.

  5. Create a PR:
     - Once you have completed the project goals, create a pull request to merge your changes into the main repository.
     - While at this, provide a clear description of the changes made and any relevent information for the code review.

## Resources

Here are some resources that may be helpful during your work on this project:

- [Node.js Documentation](https://nodejs.org/docs/latest/api/) - Official documentation for Node.js, providing guides on how to run Node on your application.

- [Express.js Documentation](https://expressjs.com/) - Official documentation for Express.js, providing detailed information on Express.js concepts and usage.

- [MongoDB Documentation](https://www.mongodb.com/docs/) - Official documentation for MongoDB, providing detailed information on MongoDB concepts and usage.

- [Mongoose Documentation](https://mongoosejs.com/docs/) - Official documentation for Mongoose, providing detailed information on Mongoose concepts and usage.
