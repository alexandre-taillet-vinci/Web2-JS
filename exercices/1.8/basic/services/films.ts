import path from "path";
import { Film } from "../types";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");

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

function updateFilm(filmId: number, newFilm: Partial<Film>): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const index = films.findIndex((f) => f.id === filmId);
    const film = films[index];
    if (index === -1) {
        return undefined;
    }
    if(filmId !== newFilm.id) {
        return undefined;
    }

    if(newFilm.title) {
        film.title = newFilm.title;
    }

    if(newFilm.director) {
        film.director = newFilm.director;
    }

    if(newFilm.budget) {
        film.budget = newFilm.budget;
    }

    if(newFilm.description) {
        film.description = newFilm.description;
    }

    if(newFilm.duration) {
        film.duration = newFilm.duration;
    }

    if(newFilm.imageUrl) {
        film.imageUrl = newFilm.imageUrl;
    }
   // Object.assign(film, { title, director, duration, budget, description, imageUrl });
    serialize(jsonDbPath, films);
     return film;
}

function createFilm(newFilm: Film): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    if(films.find((f) => f.id === newFilm.id)) {
        return undefined;
    }
    films.push(newFilm);
    serialize(jsonDbPath, films);
    return newFilm;
}

function updateOrCreateFilm(filmId: number, newFilm: Partial<Film>): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const index = films.findIndex((f) => f.id === filmId);
    if (index === -1) {
        return createFilm(newFilm as Film);
    }
    return updateFilm(filmId, newFilm);
}

function deleteFilm(id: number): Film {
    const films = parse(jsonDbPath, defaultFilms);
    const index = films.findIndex((f) => f.id === id);
    if (index === -1) {
        throw new Error("Film not found");
    }
    const deleted = films.splice(index, 1)[0];
    serialize(jsonDbPath, films);
    return deleted;
}


function readAllFilms(minDuration?: number | undefined): Film[] {
    const films = parse(jsonDbPath, defaultFilms);
    if(minDuration) {
        return films.filter(f => f.duration >= minDuration);
    }
    return films;
}



function readOneFilm(id: number): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    return films.find((f) => f.id === id);
}

export { createFilm, defaultFilms, deleteFilm, readAllFilms, readOneFilm, updateFilm, updateOrCreateFilm };

