
const express = require('express');
const router = express.Router();
const {validation}  = require('../middleware/Validator');
const {asyncErrorHandler} =  require('../middleware/ErrorHandler');
const { validatePolygon, validateUUIDInParams } = require('../middleware/validations');
const polygonController = require('../controllers/polygonController');

// Create a new spatial polygon
router.post('/polygons', validatePolygon, validation,  asyncErrorHandler(polygonController.createSpatialPolygon));

router.get('/polygons/search', asyncErrorHandler(polygonController.searchPolygons));
// Get all spatial polygons
router.get('/polygons', asyncErrorHandler(polygonController.getSpatialPolygons));

// Get a spatial polygon by ID
router.get('/polygons/:id', validateUUIDInParams, validation,asyncErrorHandler(polygonController.getSpatialPolygonById));

// Update a spatial polygon by ID
router.put('/polygons/:id', validatePolygon,  validateUUIDInParams, validation, asyncErrorHandler(polygonController.updateSpatialPolygon));

// Delete a spatial polygon by ID
router.delete('/polygons/:id', validateUUIDInParams, validation, asyncErrorHandler(polygonController.deleteSpatialPolygon));

// Find points within a polygon
router.get('/polygons/:polygonId/points', asyncErrorHandler(polygonController.findPointsWithinPolygon));

//search polygon

module.exports = router;
