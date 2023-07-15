# Angular Grocery Store

!['home page'](/frontend/src/assets/images/readme/homepage.png)

Store is a single-page application built using Angular for frontend and Express API for backend. This application has the following features:
- Authentication and authorization using Auth0 in both Angular and Express APIs
- Data flow from parent to child components and vice versa
- Details page based on the product
- Reactive forms with validators
- Cart page with total cost of the products in the cart
- HttpClient used for interaction of data with the server
- Used Interface for user, product, order and orderProduct, Interceptor to add the access token to the header of the request, Lazy loading to load the components
- Used SCSS for styling the application

## Setting up the application
- Clone the project
```
  git clone https://github.com/renurevzranju/angular-store.git
```
- Follow the README in backend folder for creating database and connecting to the server.
- Use the [product.json](/frontend/products.json) to create the project in the database for each category. Access token is not required for this step. Also make sure not to alter the data while creating the product.
- Once the product is created, follow the README in frontend folder to start the angular application.
- Once both the setup is done. Your good to go!

