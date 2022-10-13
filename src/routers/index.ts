import express from 'express';

const app = express();

// declare a route with a response
app.get('/', (req, res) => {
  res.send("Hello SUISS!");
});

export default app;