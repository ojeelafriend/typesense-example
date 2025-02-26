import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

export const App = express();

App.use(morgan("dev"));

App.use(helmet());

App.use(cors());

App.use(express.json(), express.urlencoded({ extended: false }));

App.use(express.static(`/public`));
