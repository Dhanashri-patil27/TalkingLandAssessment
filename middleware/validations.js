const { validate: isUUID } = require('uuid'); 

const validateUUID = (uuid) => {
  if (!isUUID(uuid)) {
    return 'Invalid UUID format';
  }
  return null; // Valid
};
// Validation function for Point coordinates
const validatePointCoordinates = (coordinates) => {
  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    return 'Coordinates must be an array of two elements (longitude, latitude)';
  }

  const [longitude, latitude] = coordinates;

  // Validate longitude and latitude ranges
  if (typeof longitude !== 'number' || typeof latitude !== 'number') {
    return 'Coordinates must contain valid numeric values for longitude and latitude';
  }

  if (longitude < -180 || longitude > 180) {
    return 'Longitude must be between -180 and 180';
  }

  if (latitude < -90 || latitude > 90) {
    return 'Latitude must be between -90 and 90';
  }

  return null; // Valid
};

// Validation function for Point name
const validatePointName = (name) => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return 'Name is required and should be a non-empty string';
  }
  return null; // Valid
};

// Validation function for Polygon coordinates
const validatePolygonCoordinates = (coordinates) => {
  if (!Array.isArray(coordinates) || coordinates.length === 0) {
    return 'Coordinates must be an array of arrays (polygon rings)';
  }

  // Each ring should have at least 4 points (closed polygon)
  for (let i = 0; i < coordinates.length; i++) {
    const ring = coordinates[i];

    if (!Array.isArray(ring) || ring.length < 4) {
      return `Each ring must have at least 4 points, found ring with ${ring.length} points`;
    }

    // Ensure the first and last points are the same (polygon closure)
    if (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1]) {
      return 'The first and last points of each polygon ring must be the same';
    }

    // Validate each point in the ring
    for (const point of ring) {
      if (!Array.isArray(point) || point.length !== 2) {
        return 'Each point in the ring must be an array with two elements [longitude, latitude]';
      }

      const [longitude, latitude] = point;
      if (typeof longitude !== 'number' || typeof latitude !== 'number') {
        return 'Each point must have numeric values for longitude and latitude';
      }

      if (longitude < -180 || longitude > 180) {
        return 'Longitude must be between -180 and 180';
      }

      if (latitude < -90 || latitude > 90) {
        return 'Latitude must be between -90 and 90';
      }
    }
  }

  return null; // Valid
};

// Validation function for Polygon name
const validatePolygonName = (name) => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return 'Name is required and should be a non-empty string';
  }
  return null; // Valid
};

// Middleware to validate Point request body
const validatePoint = (req, res, next) => {
  const { name, coordinates } = req.body;

  // Validate Point Name
  const nameError = validatePointName(name);
  if (nameError) {
    return res.status(400).json({ error: nameError });
  }

  // Validate Point Coordinates
  const coordinatesError = validatePointCoordinates(coordinates);
  if (coordinatesError) {
    return res.status(400).json({ error: coordinatesError });
  }

  next(); // Proceed to the controller
};

const validatePolygon = (req, res, next) => {
  const { name, coordinates } = req.body;

  // Validate Polygon Name
  const nameError = validatePolygonName(name);
  if (nameError) {
    return res.status(400).json({ error: nameError });
  }

  // Validate Polygon Coordinates
  const coordinatesError = validatePolygonCoordinates(coordinates);
  if (coordinatesError) {
    return res.status(400).json({ error: coordinatesError });
  }

  next(); // Proceed to the controller
};
const validateUUIDInParams = (req, res, next) => {
  const { id } = req.params; 

  const uuidError = validateUUID(id);
  if (uuidError) {
    return res.status(400).json({ error: uuidError });
  }

  next(); 
};

module.exports = {
  validatePoint,
  validatePolygon, validateUUIDInParams
};
