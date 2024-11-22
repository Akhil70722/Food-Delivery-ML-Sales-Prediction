import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000; // Choose a port for Node.js server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint that receives data from the React frontend
app.post('/predict', async (req, res) => {
  try {
    // Forward the data to the Python Flask backend
    const response = await axios.post('http://localhost:5000/predict', req.body);
    // Send the prediction result back to the React frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error while communicating with Python backend:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Node.js server is running on http://localhost:${PORT}`);
});
