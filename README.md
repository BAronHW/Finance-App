# FinApp: Student Finance Management Application

## Overview

FinApp is a personal banking application designed to help students manage their finances effectively. Built with Next.js, React, and Tailwind CSS, it offers a user-friendly interface for tracking expenses, managing accounts, and gaining insights into spending habits.

## Features

- **User Authentication**: Secure login and signup functionality.
- **Dashboard**: Overview of account balances, recent transactions, and financial summary.
- **Expense Tracking**: Log and categorize expenses easily.
- **Budget Planning**: Set and monitor budget goals.
- **Transaction History**: Detailed view of past transactions with search and filter options.
- **Financial Insights**: Visual representations of spending patterns and financial health.
- **Profile Management**: Update personal information and preferences.

## Technology Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Hooks
- **API**: GraphQL with Apollo Client
- **Authentication**: Firebase
- **Database**: PostgreSQL

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Set up locally:

1. Clone the repository

2. Set up a local instance of Postgres, and set the database url in your .env file

3. Move to the frontend folder

4. Run npm install

5. npm run dev

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

7. Move to the backend folder

8. npm install

9. npx prisma migrate dev --name init

10. npm run dev

## Project Structure

- `/app`: Next.js app directory containing pages and layouts
- `/components`: Reusable React components
- `/lib`: Utility functions and custom hooks
- `/styles`: Global styles and Tailwind CSS configuration
- `/public`: Static assets

## Contributing

We welcome contributions to FinApp! Please read our contributing guidelines before submitting pull requests.

## License

[MIT License]

Project Link: [https://github.com/yourusername/finapp](https://github.com/yourusername/finapp)


