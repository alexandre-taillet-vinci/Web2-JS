import express, { ErrorRequestHandler } from "express";

import drinksRouter from "./routes/drinks";
import pizzaRouter from "./routes/pizzas";
import usersRouter from "./routes/users";


const app = express();
app.use((_req, _res, next) => {
    console.log(
        "Time:",
        new Date().toLocaleString("fr-FR", { timeZone: "Europe/Brussels" })
    );
    next();
});
app.get("/", (_req, res) => {
    res.send("Hello 😎");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/drinks", drinksRouter);
////app.use(express.static(path.join(__dirname, 'public'))); // Serve static assets

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err.stack);
    return res.status(500).send("Something broke!");
};
  
app.use(errorHandler);


export default app;
