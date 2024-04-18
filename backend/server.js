const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const artRouter = require('./routes/artlist');
const notFoundMiddleware = require('./routes/notFoundMiddleware');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://eneapaja27:1IFvLt2toMCJC1AR@cluster0.svrpnt0.mongodb.net/";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Route to serve the photo.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../', 'addArt.html'));
});

// Serve edit form
app.use('/edit', artRouter);

// API routes
app.use('/api', artRouter);

// // Reverse proxy for /api/arts
// app.use('/custom-url', artRouter); 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
