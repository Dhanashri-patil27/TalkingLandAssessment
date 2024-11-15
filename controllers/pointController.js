const PointService = require('../servieces/pointServices');

exports.createSpatialPoint = async (req, res) => {
  const { name, coordinates } = req.body;

  try {
    const point = await PointService.createSpatialPoint(name, coordinates);
    res.status(201).json(point);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};

exports.getSpatialPoints = async (req, res) => {
  try {
    const points = await PointService.getAllPoints();
    res.status(200).json(points);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};

exports.getSpatialPointById = async (req, res) => {
  const { id } = req.params;

  try {
    const point = await PointService.getPointById(id);
    res.status(200).json(point);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};

exports.updateSpatialPoint = async (req, res) => {
  const { id } = req.params;
  const { name, coordinates } = req.body;

  try {
    const updatedPoint = await PointService.updateSpatialPoint(id, name, coordinates);
    res.status(200).json(updatedPoint);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
};

exports.deleteSpatialPoint = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await PointService.deleteSpatialPoint(id);
    res.status(204).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.error,
      code: error.code,
      type: error.type,
    });
  }
}
exports.findPointsWithinRadius = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;

    // Validate query parameters
    if (!latitude || !longitude || !radius) {
      return res.status(400).json({ error: 'Missing required query parameters: latitude, longitude, and radius' });
    }

    // Convert radius to a number
    const radiusInMeters = parseFloat(radius);

    if (isNaN(radiusInMeters) || radiusInMeters <= 0) {
      return res.status(400).json({ error: 'Invalid radius. Must be a positive number.' });
    }

    // Call the service to get points within the radius
    const points = await PointService.findPointsWithinRadius(latitude, longitude, radiusInMeters);

    // Return the points as a JSON response
    res.status(200).json(points);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


