import app from "./app";
import { dbConnection } from "./db";

dbConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server Running ${process.env.PORT}`);
});
