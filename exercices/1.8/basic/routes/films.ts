import { Router } from "express";

import { createFilm, deleteFilm, readAllFilms, readOneFilm, updateFilm, updateOrCreateFilm } from "../services/films";
import { Film } from "../types";




const router = Router();
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const film = readOneFilm(id);
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
     const push = createFilm(film);
     if(push === undefined) {
        return res.status(409).json({ message: "Film already exists" });
    }
    return res.status(201).json(film);
});


router.get("/", (_req) => {
    if(_req.query["minimum-duration"]){
        return readAllFilms(Number(_req.query["minimum-duration"]));
    }
    return readAllFilms();
});
//films/{id}	DELETE	DELETE ONE : Effacer la ressource identifiée
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const film = deleteFilm(id);
    if(film === undefined) {
        return res.sendStatus(404);
    }
    return res.json(film);
});

//films/{id}	PATCH	UPDATE ONE : Mettre à jour les propriétés de la ressource par les valeurs données dans la requête, pour une ou plusieurs propriétés
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);

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

    const updated = updateFilm(id, body as Film);
   // const index = films.findIndex((film) => film.id === id);
    if (updated === undefined) {
        return res.sendStatus(404);
    }

    return res.json(updated);
});

//films/{id}	PUT	UPDATE ONE or CREATE ONE : Remplacer la ressource par une ressource reprenant les valeurs données dans la requête, seulement si toutes les propriétés non optionnelles de la ressource sont données ! Si la ressource n'existe pas, créer cette ressource seulement si l'id donné n'est pas déjà existant.
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    

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
    const updateOrCreate = updateOrCreateFilm(id, { title, director, duration, budget, description, imageUrl });
    if(updateOrCreate === undefined) {
        return res.sendStatus(404);
    }
    
    return res.json(updateOrCreate);
});

export default router;