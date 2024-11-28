import express from "express"; // new way to import modules
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import userRoutes from "./routes/user.js";
import companyRoutes from "./routes/company.js";
import jobRoutes from "./routes/job.js";
import applicationRoute from './routes/application.js'
import path from 'path'



dotenv.config()



const app = express();

const _dirname = path.resolve()

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,

}





const PORT = process.env.PORT;

app.use(cors(corsOptions));



// api routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist" )))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});


