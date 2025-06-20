# Budget Bud - Personal Budgeting Application

## Overview
Budget Bud is a full-stack personal budgeting app built with **.NET Core 8** on the backend and **React** with **Tailwind CSS** on the frontend.  
This project demonstrates core skills in API development, database management, authentication with JWT, and frontend-backend integration.

---

## Features Completed So Far

### Backend
- User authentication and authorization using **ASP.NET Core Identity** with JWT tokens  
- CRUD APIs for **Users**, **Categories**, and **Transactions**  
- PostgreSQL database integration using **Entity Framework Core** (Code First approach)  
- Identity and budgeting data properly linked and secured  
- Migration management and database schema updated with identity tables

### Frontend
- React application using functional components and hooks  
- Tailwind CSS for styling  
- Login and Registration forms integrated with backend auth APIs  
- Dashboard, Categories, and Transactions pages connected to backend APIs  
- Token storage and protected routes implemented for authentication flow  

---

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Backend     | .NET Core 8, EF Core, PostgreSQL, ASP.NET Core Identity, JWT Authentication |
| Frontend    | React, Tailwind CSS, Axios    |
| Tools       | VS Code, Postman, Git, PostgreSQL CLI |

---

## Getting Started

1. Clone the repository
2. Set up the `.env` file with your database and JWT secret keys
3. Run migrations from the Infrastructure project to create/update the database
4. Launch backend API with `dotnet run`
5. Launch frontend React+Vite app with `npm run dev`
6. Register a new user and explore the budgeting functionalities

---

## Next Steps (Planned)

- Add profile management and profile picture upload  
- Implement password reset and email confirmation flows  
- Enhance UI with graphs and analytics  
- Improve error handling and form validation  
- Prepare project for deployment  

---

## Notes

- This project is for learning and demonstration purposes  
- Not production-ready; some features and security aspects may need improvement  
- Feedback and suggestions welcome!

---

## Contact

Created by Chaimae Iken — feel free to reach out for collaboration or questions!
