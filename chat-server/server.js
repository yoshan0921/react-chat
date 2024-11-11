const express = require('express');
const fs = require('fs').promises; // To use async/await
const path = require('path');
const app = express();
const cors = require('cors');

const PORT = 3001;

// JSON file path
const filePath = path.join(__dirname, 'messages.json');

// For request body parsing as JSON
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Root route for server status
app.get('/', (req, res) => {
  res.send('Server is running');
});


// Get existing chat messages
app.get('/messages', async(req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    // Return the existing messages
    const jsonData = JSON.parse(data || '{ "messages": [] }');
    res.json(jsonData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading JSON file');
  }
});

// Post a new chat message
app.post('/messages', async(req, res) => {
  try {
    // Receive requestdata
    const newMessage = req.body;

    // Read the existing JSON file first.
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data || '{ "messages": [] }');

    // Add the new message to the existing messages JSON object
    jsonData.messages.push(newMessage);

    // Write the updated messages to the JSON file
    await fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8');
    res.status(201).json({ message: 'New chat message added successfully', newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error writing JSON file');
  }
});

// ===== Server Listening =====
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});