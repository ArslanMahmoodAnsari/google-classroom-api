// const path = require('path');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const reactBuildPath = path.join(__dirname, '../build');

app.use(express.static(reactBuildPath));
app.use(express.json({ extended: false }));
app.use(cors());

//Routes
app.use('/api', require('./routes/index'));

// for React routing
app.get('/*', function(req, res) {
  res.sendFile(path.join(reactBuildPath, 'index.html'));
});

// Server
app.listen(PORT, () => {
  console.log(`Node server started on port: ${PORT}`);
});
