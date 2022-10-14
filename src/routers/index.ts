import express from 'express';
import UserRouter from "./user.router";
const app = express();

app.use(express.json());

// declare a route with a response
app.get('/', (req, res) => {
  res.send("Hello SUISS!");
});

app.use("/users", UserRouter);

export default app;