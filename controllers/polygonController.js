const PolygonService = require('../servieces/polygonServices');

// Create a new spatial polygon
exports.createSpatialPolygon = async (req, res) => {
  const { name, coordinates } = req.body;

  try {
    const polygon = await PolygonService.createSpatialPolygon(name, coordinates);
    res.status(201).json(polygon);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};

// Get all spatial polygons
exports.getSpatialPolygons = async (req, res) => {
  try {
    const polygons = await PolygonService.getSpatialPolygons();
    res.status(200).json(polygons);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};

// Get a spatial polygon by ID
exports.getSpatialPolygonById = async (req, res) => {
  const { id } = req.params;

  try {
    const polygon = await PolygonService.getSpatialPolygonById(id);
    res.status(200).json(polygon);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};

// Update a spatial polygon by ID
exports.updateSpatialPolygon = async (req, res) => {
  const { id } = req.params;
  const { name, coordinates } = req.body;

  try {
    const updatedPolygon = await PolygonService.updateSpatialPolygon(id, name, coordinates);
    res.status(200).json(updatedPolygon);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};

// Delete a spatial polygon by ID
exports.deleteSpatialPolygon = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await PolygonService.deleteSpatialPolygon(id);
    res.status(204).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};

// Find points within a polygon
exports.findPointsWithinPolygon = async (req, res) => {
  const { polygonId } = req.params;

  try {
    const points = await PolygonService.findPointsWithinPolygon(polygonId);
    res.status(200).json(points);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};

// Search polygons within a bounding box or other spatial conditions
exports.searchPolygons = async (req, res) => {
  const { minLongitude, minLatitude, maxLongitude, maxLatitude } = req.query;
// Validate query parameters
    if (!minLongitude || !minLatitude || !maxLongitude || !maxLatitude ) {
      return res.status(400).json({ error: 'Missing required query parameters:  minLongitude, minLatitude, maxLongitude, maxLatitude' });
    }
  try {
    const polygons = await PolygonService.searchPolygons(minLongitude, minLatitude, maxLongitude, maxLatitude);
    res.status(200).json(polygons);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};
