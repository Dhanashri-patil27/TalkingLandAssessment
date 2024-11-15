const { Sequelize } = require('sequelize');
const db = require('../models'); // Use require for db (CommonJS)
const ErrorCodes = require('../errors/ErrorCodes');

class PointService {
  static async createSpatialPoint(name, coordinates) {
    try {
      // Validate coordinates format
      if (!Array.isArray(coordinates) || coordinates.length !== 2) {
        throw {
          statusCode: ErrorCodes['200005'].statusCode,
          error: ErrorCodes['200005'].message,
          code: ErrorCodes['200005'].responseCode,
          type: ErrorCodes['200005'].type,
        };
      }

      const point = await db.points.create({
        name,
        coordinates: {
          type: 'Point',
          coordinates,
        },
      });

      return point;
    } catch (error) {
      throw error;
    }
  }

  static async getAllPoints() {
    try {
      const points = await db.points.findAll();
      return points;
    } catch (error) {
      throw {
        statusCode: ErrorCodes['300003'].statusCode,
        error: ErrorCodes['300003'].message,
        code: ErrorCodes['300003'].responseCode,
        type: ErrorCodes['300003'].type,
      };
    }
  }

  static async getPointById(id) {
    try {
      const point = await db.points.findByPk(id);
      if (!point) {
        throw {
          statusCode: ErrorCodes['200003'].statusCode,
          error: ErrorCodes['200003'].message,
          code: ErrorCodes['200003'].responseCode,
          type: ErrorCodes['200003'].type,
        };
      }
      return point;
    } catch (error) {
      throw error;
    }
  }

  static async updateSpatialPoint(id, name, coordinates) {
    try {
      if (coordinates && (!Array.isArray(coordinates) || coordinates.length !== 2)) {
        throw {
          statusCode: ErrorCodes['200005'].statusCode,
          error: ErrorCodes['200005'].message,
          code: ErrorCodes['200005'].responseCode,
          type: ErrorCodes['200005'].type,
        };
      }

      const point = await db.points.findByPk(id);
      if (!point) {
        throw {
          statusCode: ErrorCodes['200003'].statusCode,
          error: ErrorCodes['200003'].message,
          code: ErrorCodes['200003'].responseCode,
          type: ErrorCodes['200003'].type,
        };
      }

      point.name = name || point.name;
      point.coordinates = {
        type: 'Point',
        coordinates: coordinates || point.coordinates.coordinates,
      };

      await point.save();
      return point;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSpatialPoint(id) {
    try {
      const point = await db.points.findByPk(id);
      if (!point) {
        throw {
          statusCode: ErrorCodes['200003'].statusCode,
          error: ErrorCodes['200003'].message,
          code: ErrorCodes['200003'].responseCode,
          type: ErrorCodes['200003'].type,
        };
      }

      await point.destroy();
      return { message: 'Point deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  static async findPointsWithinRadius(latitude, longitude, radiusInMeters) {
    try {
      const points = await db.points.findAll({
        where: Sequelize.literal(`ST_DWithin(coordinates, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326), ${radiusInMeters})`)
      });

      return points;
    } catch (error) {
      throw new Error(`Error fetching points: ${error.message}`);
    }
  }
}

module.exports = PointService;
