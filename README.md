# BudgetApp

## Project Overview  
A personal budgeting web app built using .NET Core 8 with an Onion architecture, featuring RESTful APIs and React frontend (planned). This app allows users to manage budgets, transactions, and categories.

## Progress so far

- **Domain Layer**  
  - Defined models: `User`, `Transaction`, `Category`  
  - Used integer-based IDs for entities  

- **Infrastructure Layer**  
  - Configured `BudgetDbContext` with Entity Framework Core  
  - Set up PostgreSQL connection and migrations  
  - Created repositories for data access (`IUserRepository` and implementations)  

- **Application Layer**  
  - Defined repository interfaces and implemented dependency injection  

- **API Layer**  
  - Created API controllers for `User` entity  
  - Implemented CRUD endpoints  
  - Tested endpoints successfully using Postman  

- **Tools and Technologies**  
  - .NET Core 8  
  - Entity Framework Core  
  - PostgreSQL  
  - Swagger for API documentation  

## Next Steps

- Implement APIs for `Transaction` and `Category` entities  
- Build React frontend to consume APIs  
- Add authentication and authorization  
- Implement unit and integration testing  
- Improve error handling and validation  
