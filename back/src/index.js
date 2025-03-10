import express from "express";
import cors from "cors";
import tryoutRoutes from "./routes/tryoutRoute.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/api", tryoutRoutes);

app.listen(port, () => {
  console.log("listening on port", port);
});
