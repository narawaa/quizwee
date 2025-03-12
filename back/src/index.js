import express from "express";
import cors from "cors";
import tryoutRoutes from "./routes/tryoutRoute.js";
import swaggerDocs from "./swagger.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/api", tryoutRoutes);
swaggerDocs(app);

app.listen(port, () => {
  console.log("listening on port", port);
  console.log("API Docs available at http://localhost:3001/api-docs");
});
