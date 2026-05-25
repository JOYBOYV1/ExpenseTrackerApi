import express from 'express';  // import express.js
import usersRoutes from './routes/usersRoutes.js'; // import the user routes
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'; // import the error handling middleware

const app = express(); // create an express apllication instance
const port = process.env.PORT || 3000; // set the port to the value of the PORT environment variable or default to 3000

app.use(express.json()); // use the express.json() middleware to parse JSON request bodies
app.use('/user', usersRoutes); // use the user routes for any requests to "/users"

app.get('/', (req, res) => {
    res.send('Hello World!');
}); // define a route ("/") that sends "Hello World!" as a response

// should be in last
app.use(errorHandlerMiddleware); // use the error handling middleware for handling errors in the application

app.listen(port, () => {
    console.log(`Server is run on http://localhost:${port}`);
}); // start the server and listen on the specified port, logging a message to the console when it's running