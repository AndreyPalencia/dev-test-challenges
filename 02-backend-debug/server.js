const express = require('express');
const app = express();
app.use(express.json());

const requestLog = [];

async function getDataFromDB() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, value: 'hello' }), 100);
  });
}

app.get('/data', async (req, res, next) => {
  requestLog.push({ route: '/data', ts: Date.now() });

  try {
    const data =  await getDataFromDB();
    
    if (!data) {
      res.status(404).json({ error: 'No data found' });
      return;
    }

    return res.status(200).json({ result: data });

  } catch (err) {
    next(err)
  }
});

app.post('/save', (req, res) => {
  const { name, value } = req.body;

  requestLog.push({ name, value, ts: Date.now() });

  res.status(200).json({ saved: true, name, value });
});


app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: 'Internal Server Error',
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

module.exports = app;
