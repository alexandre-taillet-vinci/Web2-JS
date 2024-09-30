import { Router } from "express";

import { Film } from "../types";

const defaultFilms: Film[] = [
    {
    id: 1,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    budget: 25000000,
    description: "Two imprisoned",
    duration: 142
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    budget: 6000000,
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: 175
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    budget: 185000000,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    duration: 152
  },
];

const router = Router();
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const film = defaultFilms.find(f => f.id === id);
    if (!film) {
        return res.status(404).json({ message: "Film not found" });
    }
    return res.json(film);
});

router.post("/", (req, res) => {
    const film: Film = req.body;
    if(!film) {
        return res.status(400).json({ message: "Missing film" });
    }

    if(defaultFilms.find(f => f.id === film.id)) {
        return res.status(409).json({ message: "Film already exists" });
    }
    defaultFilms.push(film);
    return res.status(201).json(film);
});


router.get("/", (_req, res) => {
    if(_req.query["minimum-duration"]){
        const duration = parseInt(_req.query["minimum-duration"] as string);
        const films = defaultFilms.filter(f => f.duration >= duration);
        return res.json(films);
    }
    return res.json(defaultFilms);
});
//films/{id}	DELETE	DELETE ONE : Effacer la ressource identifiée
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = defaultFilms.findIndex((film) => film.id === id);
    if (index === -1) {
        return res.sendStatus(404);
    }
    const deletedElements = defaultFilms.splice(index, 1); // splice() returns an array of the deleted elements
    return res.json(deletedElements[0]);
});

//films/{id}	PATCH	UPDATE ONE : Mettre à jour les propriétés de la ressource par les valeurs données dans la requête, pour une ou plusieurs propriétés
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = defaultFilms.findIndex((film) => film.id === id);
    if (index === -1) {
        return res.sendStatus(404);
    }
    const body: unknown = req.body;
    if (
        !body ||
        typeof body !== "object" ||
        !("title" in body) ||
        !("director" in body) ||
        !("duration" in body) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" ||
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim() ||
        body.duration <= 0
    ) {
        return res.sendStatus(400);
    }
    const film = defaultFilms[index];
    const { title, director, duration, budget, description, imageUrl } = body as Film;
    Object.assign(film, { title, director, duration, budget, description, imageUrl });
    return res.json(film);
});

//films/{id}	PUT	UPDATE ONE or CREATE ONE : Remplacer la ressource par une ressource reprenant les valeurs données dans la requête, seulement si toutes les propriétés non optionnelles de la ressource sont données ! Si la ressource n'existe pas, créer cette ressource seulement si l'id donné n'est pas déjà existant.
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = defaultFilms.findIndex((film) => film.id === id);
    const body: unknown = req.body;
    if (
        !body ||
        typeof body !== "object" ||
        !("title" in body) ||
        !("director" in body) ||
        !("duration" in body) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" ||
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim() ||
        body.duration <= 0
    ) {
        return res.sendStatus(400);
    }
    const { title, director, duration, budget, description, imageUrl } = body as Film;
    if (index === -1) {
        if (defaultFilms.some((film) => film.title === title && film.director === director)) {
            return res.sendStatus(409).json({ message: "Film already exists" });
        }
        const nextId =
            defaultFilms.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) +
            1;
        const newFilm: Film = {
            id: nextId,
            title,
            director,
            duration,
            budget,
            description,
            imageUrl,
        };
        defaultFilms.push(newFilm);
        return res.json(newFilm);
    }
    const film = defaultFilms[index];
    film.title = title;
    film.director = director;
    film.duration = duration;
    film.budget = budget;
    film.description = description;
    film.imageUrl = imageUrl;
    return res.json(film);
});

export default router;