const express = require('express');
const router = express.Router();
const { validation } = require('../middleware/Validator'); // Import the validation middleware
const { asyncErrorHandler } = require('../middleware/ErrorHandler'); // Import error handler
const { validatePoint, validateUUIDInParams } = require('../middleware/validations'); // Import the validation for point
const pointController = require('../controllers/pointController');

// Create a new spatial point
router.post('/points', validatePoint, validation, asyncErrorHandler(pointController.createSpatialPoint));

// Find points within a radius
router.get('/points/radius', asyncErrorHandler(pointController.findPointsWithinRadius));

// Get all spatial points
router.get('/points',   asyncErrorHandler(pointController.getSpatialPoints));

// Get a spatial point by ID
router.get('/points/:id', validateUUIDInParams, validation, asyncErrorHandler(pointController.getSpatialPointById));

// Update a spatial point by ID
router.put('/points/:id', validatePoint, validateUUIDInParams, validation, asyncErrorHandler(pointController.updateSpatialPoint));

// Delete a spatial point by ID
router.delete('/points/:id', validateUUIDInParams, validation, asyncErrorHandler(pointController.deleteSpatialPoint));


module.exports = router;
