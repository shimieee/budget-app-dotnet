# --- Build stage ---
    FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
    WORKDIR /src
    
    # Copy solution and restore
    COPY BudgetApp.sln ./
    COPY BudgetApp.API/*.csproj ./BudgetApp.API/
    COPY BudgetApp.Application/*.csproj ./BudgetApp.Application/
    COPY BudgetApp.Domain/*.csproj ./BudgetApp.Domain/
    COPY BudgetApp.Infrastructure/*.csproj ./BudgetApp.Infrastructure/
    
    RUN dotnet restore "BudgetApp.API/BudgetApp.API.csproj"
    
    # Copy everything else and build
    COPY . .
    RUN dotnet publish "BudgetApp.API/BudgetApp.API.csproj" -c Release -o /app/publish
    
    # --- Runtime stage ---
    FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
    WORKDIR /app
    COPY --from=build /app/publish .
    
    # Render uses port 10000
    ENV ASPNETCORE_URLS=http://+:10000
    EXPOSE 10000
    
    ENTRYPOINT ["dotnet", "BudgetApp.API.dll"]