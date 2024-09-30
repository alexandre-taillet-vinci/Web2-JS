import express from "express";

import usersRouter from "./routes/users";
import filmRouter from "./routes/films";

const app = express();

// map with request;
const requestsCount = new Map<string, number>();
//Request counter :
// - GET / : 10
// - GET /pizzas : 2
// - POST /pizzas : 5
// - DELETE /pizzas : 2

// get all routes

app.use((req, _res, next) => {
    // if req is GET
    const method = req.method+ " "+req.url;
    const count = requestsCount.get(method) || 0;
    requestsCount.set(method, count + 1);
    console.log(
        "Request counter :",
    );
    for (const [key, value] of requestsCount) {
        console.log(`- ${key} : ${value}`);
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/films",filmRouter);


export default app;
