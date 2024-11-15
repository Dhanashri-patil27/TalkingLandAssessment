const express = require('express');
const app = express();
const polygonRoutes = require('./routes/polygonRoutes');
const pointRoutes = require('./routes/pointRoutes');

// Middleware to parse JSON bodies
app.use(express.json()); 

// Register routes with distinct paths
app.use('/api', pointRoutes); // Route for point-related actions
app.use('/api', polygonRoutes); // Route for polygon-related actions

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
