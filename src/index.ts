import * as dotenv from "dotenv";
dotenv.config();

import app from "./routers";

// start the server
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

export default app;