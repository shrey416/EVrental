const express = require('express');
const cors = require('cors');
const kycRoutes = require('./routes/kyc.routes');

const app = express();
const port = process.env.PORT || 5000; // Choose a port

// Middleware
app.use(cors()); // Enable CORS if needed
app.use(express.json()); // To parse JSON request bodies (if you were sending JSON, not needed for FormData in this case but good practice)
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies (also generally good practice)

// Routes
app.use('/kyc', kycRoutes); // Mount KYC routes under /kyc

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});