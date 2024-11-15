// errors/ErrorCodes.js
const ErrorCodes = Object.freeze({
    // Point Module Error Codes
    '100000': {
        responseCode: '100000',
        text: 'POINT_ALREADY_EXISTS',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Point already exists.',
        type: 'ClientError',
        module: 'Points',
    },
    '100001': {
        responseCode: '100001',
        text: 'ERROR_WHILE_ADDING_POINT',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Error while adding point.',
        type: 'ServerError',
        module: 'Points',
    },
    '100002': {
        responseCode: '100002',
        text: 'ERROR_WHILE_EDITING_POINT',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Error while editing point.',
        type: 'ServerError',
        module: 'Points',
    },
    '100003': {
        responseCode: '100003',
        text: 'POINT_NOT_FOUND',
        statusCode: 404,
        http_status_text: 'NOT_FOUND',
        message: 'Point not found.',
        type: 'ServerError',
        module: 'Points',
    },
    '100004': {
        responseCode: '100004',
        text: 'ERROR_WHILE_DELETING_POINT',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Error while deleting point.',
        type: 'ServerError',
        module: 'Points',
    },
    '100005': {
        responseCode: '100005',
        text: 'INVALID_POINT_COORDINATES',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Point coordinates are invalid.',
        type: 'ClientError',
        module: 'Points',
    },
    
    // Polygon Module Error Codes
    '200000': {
        responseCode: '200000',
        text: 'POLYGON_ALREADY_EXISTS',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Polygon already exists.',
        type: 'ClientError',
        module: 'Polygons',
    },
    '200001': {
        responseCode: '200001',
        text: 'ERROR_WHILE_ADDING_POLYGON',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Error while adding polygon.',
        type: 'ServerError',
        module: 'Polygons',
    },
    '200002': {
        responseCode: '200002',
        text: 'ERROR_WHILE_EDITING_POLYGON',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Error while editing polygon.',
        type: 'ServerError',
        module: 'Polygons',
    },
    '200003': {
        responseCode: '200003',
        text: 'POLYGON_NOT_FOUND',
        statusCode: 404,
        http_status_text: 'NOT_FOUND',
        message: 'Polygon not found.',
        type: 'ServerError',
        module: 'Polygons',
    },
    '200004': {
        responseCode: '200004',
        text: 'ERROR_WHILE_DELETING_POLYGON',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Error while deleting polygon.',
        type: 'ServerError',
        module: 'Polygons',
    },
    '200005': {
        responseCode: '200005',
        text: 'INVALID_POLYGON_COORDINATES',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Polygon coordinates are invalid.',
        type: 'ClientError',
        module: 'Polygons',
    },
    '200006': {
        responseCode: '200006',
        text: 'POLYGON_GEOMETRY_ERROR',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Error in polygon geometry structure.',
        type: 'ServerError',
        module: 'Polygons',
    },
    '200007': {
        responseCode: '200007',
        text: 'INVALID_POLYGON_ACTION',
        statusCode: 422,
        http_status_text: 'UNPROCESSABLE_ENTITY',
        message: 'Invalid action for polygon.',
        type: 'ClientError',
        module: 'Polygons',
    },

    // General Errors
    '300000': {
        responseCode: '300000',
        text: 'INVALID_REQUEST',
        statusCode: 400,
        http_status_text: 'BAD_REQUEST',
        message: 'Invalid request.',
        type: 'ClientError',
        module: 'General',
    },
    '300001': {
        responseCode: '300001',
        text: 'UNAUTHORIZED_ACCESS',
        statusCode: 401,
        http_status_text: 'UNAUTHORIZED',
        message: 'Unauthorized access.',
        type: 'ClientError',
        module: 'General',
    },
    '300002': {
        responseCode: '300002',
        text: 'FORBIDDEN_ACCESS',
        statusCode: 403,
        http_status_text: 'FORBIDDEN',
        message: 'Forbidden access.',
        type: 'ClientError',
        module: 'General',
    },
    '300003': {
        responseCode: '300003',
        text: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        http_status_text: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred.',
        type: 'ServerError',
        module: 'General',
    },
    '300004': {
        responseCode: '300004',
        text: 'RESOURCE_NOT_FOUND',
        statusCode: 404,
        http_status_text: 'NOT_FOUND',
        message: 'Requested resource not found.',
        type: 'ClientError',
        module: 'General',
    },
});

module.exports = ErrorCodes;