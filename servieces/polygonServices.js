const { Sequelize } = require('sequelize');
const db = require('../models'); // Use require for db (CommonJS)
const ErrorCodes = require('../errors/ErrorCodes');

class PolygonService {
  // Add a new polygon
  static async createSpatialPolygon(name, coordinates) {
    try {
      // Validate coordinates format
      if (!Array.isArray(coordinates) || !Array.isArray(coordinates[0])) {
        throw {
          statusCode: ErrorCodes['200005'].statusCode,
          error: ErrorCodes['200005'].message,
          code: ErrorCodes['200005'].responseCode,
          type: ErrorCodes['200005'].type,
        };
      }

      // Create a new polygon in the database
      const polygon = await db.polygons.create({
        name,
        geometry: {
          type: 'Polygon',
          coordinates: coordinates,
        },
      });

      return polygon;
    } catch (error) {
      throw error;
    }
  }

  // Update an existing polygon
  static async updateSpatialPolygon(id, name, coordinates) {
    try {
      // Validate coordinates format
      if (coordinates && (!Array.isArray(coordinates) || !Array.isArray(coordinates[0]))) {
        throw {
          statusCode: ErrorCodes['200005'].statusCode,
          error: ErrorCodes['200005'].message,
          code: ErrorCodes['200005'].responseCode,
          type: ErrorCodes['200005'].type,
        };
      }

      // Find polygon by ID
      const polygon = await db.polygons.findByPk(id);
      if (!polygon) {
        throw {
          statusCode: ErrorCodes['200003'].statusCode,
          error: ErrorCodes['200003'].message,
          code: ErrorCodes['200003'].responseCode,
          type: ErrorCodes['200003'].type,
        };
      }

      // Update polygon
      polygon.name = name || polygon.name;
      polygon.geometry = {
        type: 'Polygon',
        coordinates: coordinates || polygon.geometry.coordinates,
      };

      await polygon.save();
      return polygon;
    } catch (error) {
      throw error;
    }
  }

  // Delete a polygon by ID
  static async deleteSpatialPolygon(id) {
    try {
      // Find polygon by ID
      const polygon = await db.polygons.findByPk(id);
      if (!polygon) {
        throw {
          statusCode: ErrorCodes['200003'].statusCode,
          error: ErrorCodes['200003'].message,
          code: ErrorCodes['200003'].responseCode,
          type: ErrorCodes['200003'].type,
        };
      }

      // Delete polygon
      await polygon.destroy();
      return { message: 'Polygon deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  // Get all polygons
  static async getSpatialPolygons() {
    try {
      const polygons = await db.polygons.findAll();
      return polygons;
    } catch (error) {
      throw {
        statusCode: ErrorCodes['300003'].statusCode,
        error: ErrorCodes['300003'].message,
        code: ErrorCodes['300003'].responseCode,
        type: ErrorCodes['300003'].type,
      };
    }
  }

  // Get a polygon by ID
  static async getSpatialPolygonById(id) {
    try {
      const polygon = await db.polygons.findByPk(id);
      if (!polygon) {
        throw {
          statusCode: ErrorCodes['200003'].statusCode,
          error: ErrorCodes['200003'].message,
          code: ErrorCodes['200003'].responseCode,
          type: ErrorCodes['200003'].type,
        };
      }
      return polygon;
    } catch (error) {
      throw error;
    }
  }

  // Search polygons within a bounding box
  static async searchPolygons(minLongitude, minLatitude, maxLongitude, maxLatitude) {
    try {
      if (!minLongitude || !minLatitude || !maxLongitude || !maxLatitude) {
        throw {
          statusCode: ErrorCodes['300000'].statusCode,
          error: ErrorCodes['300000'].message,
          code: ErrorCodes['300000'].responseCode,
          type: ErrorCodes['300000'].type,
        };
      }

      // Find polygons within the bounding box using ST_Within or ST_Intersects
      const polygons = await db.polygons.findAll({
        where: Sequelize.literal(`
          ST_Within(geometry, ST_MakeEnvelope(
            ${minLongitude}, ${minLatitude}, 
            ${maxLongitude}, ${maxLatitude}, 
            4326
          ))
        `),
      });

      return polygons;
    } catch (error) {
      throw {
        statusCode: ErrorCodes['300003'].statusCode,
        error: ErrorCodes['300003'].message,
        code: ErrorCodes['300003'].responseCode,
        type: ErrorCodes['300003'].type,
      };
    }
  }

  static async findPointsWithinPolygon(polygonId) {
    try {
      // Check if the polygon exists
      const polygon = await db.polygons.findByPk(polygonId);
      console.log("🚀 ~ file: polygonServices.js:164 ~ polygon:", polygon)
      if (!polygon) {
        throw {
          statusCode: ErrorCodes['200003'].statusCode,
          error: ErrorCodes['200003'].message,
          code: ErrorCodes['200003'].responseCode,
          type: ErrorCodes['200003'].type,
        };
      }
const polygonGeometry = JSON.stringify(polygon.geometry);  // Use GeoJSON format
console.log("🚀 ~ file: polygonServices.js:175 ~ polygonGeometry:", polygonGeometry)

      // Find points within the polygon using spatial query
      const points = await db.points.findAll({
        where: Sequelize.literal(`ST_Within(coordinates, '${polygonGeometry}')`)
      });

      return points;
    } catch (error) {
      console.log("🚀 ~ file: polygonServices.js:181 ~ error:", error)
      if (!error.statusCode) {
        throw {
          statusCode: ErrorCodes['200006'].statusCode,
          error: ErrorCodes['200006'].message,
          code: ErrorCodes['200006'].responseCode,
          type: ErrorCodes['200006'].type,
        };
      }
      throw error;
    }
  }
}

module.exports = PolygonService;
