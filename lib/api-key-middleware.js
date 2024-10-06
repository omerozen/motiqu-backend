// lib/api-key-middleware.js

import validateApiKey from '../middleware/validateApiKey';

export const apiKeyMiddleware = (handler) => {
  return (req, res) => {
    validateApiKey(req, res, () => handler(req, res));
  };
};
