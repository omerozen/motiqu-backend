// middleware/validateApiKey.js

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Unauthorized access - Invalid API Key' });
  }
  next(); // Proceed to the next handler if API key is valid
};

// Correct export method for middleware
export default validateApiKey;
