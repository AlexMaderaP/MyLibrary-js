# MyLibrary-js
This is a fullstack web application that allows users to manage a library of books and authors. 
It uses Express.js as the backend framework, MongoDB as the database, and EJS as the template engine. 
Users can add, edit, delete, and search for authors and books in the library. Users can also upload cover images for the books and filter them by name or date range.

### Backend 
The backend of my web application is responsible for handling the business logic of the app, which allows users to manage a library of books and authors. 
It exposes RESTful API endpoints for creating, reading, updating, and deleting authors and books in the library. It also communicates with the frontend using JSON data and with the database using Mongoose models.

### Database 
The database of my web application stores the data of the library app, which allows users to manage a library of books and authors. 
It contains two collections: authors and books. Each author document has a name and ID. Each book document has a title, a publish date, a page count, a cover image, and an ObjectID that references to the author assignated.

### Frontend 
The frontend of my web application is responsible for rendering the views of the library app, which include the home page, the authors page, and the books page. 
It uses EJS as the template engine to dynamically generate HTML based on the data received from the backend. 
It also uses CSS to style the elements of the web pages and make them look appealing and consistent.

To avoid repeating code in my vies, I created partials for the common sections of my web pages, such as the header, the form fields and the grid for the books. I stored them in a folder called partials inside the views folder.
To include them in my views, I used the `<%- include %>` syntax provided by EJS.

To style my web pages, I created different CSS files liked all to the same main.css using the `@import` rule at the top of my CSS file. 
Also, to make my styling easy to change, I used variables to store values I reused throughout my whole application, such as colors, font sizes and witdhs for the image books.

### Preview 
Below you can find how the main page of the app looks:

![preview](https://github.com/AlexMaderaP/MyLibrary-js/assets/99360250/73723b10-6ccb-4555-bcf0-58efaecbf6e7)


