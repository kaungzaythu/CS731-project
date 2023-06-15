const express = require('express');
const http = require('http');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleWare');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient } = require('mongodb');
const socketIO = require('socket.io');

connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

// MongoDB Change Stream setup
const uri = process.env.MONGO_URI; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect().then(() => {
    console.log('Connected to the database');
    const db = client.db('test'); // Replace with your MongoDB database name
    const collection = db.collection('mediacontenttables'); // Replace with the collection to watch
  
    // Set up change stream
    const changeStream = collection.watch();
  
    // Listen for changes
    changeStream.on('change', (change) => {
    //   console.log('Change event:', change);
      // Update your object or perform any necessary actions here
      // You can emit the change to the connected clients using io.emit() if needed
      io.emit('changeEvent', change);
    });
  }).catch(console.error);

app.use('/api/mediaContents', require('./routes/mediaContentRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

server.listen(port, () => console.log(`Server started on port ${port}`));