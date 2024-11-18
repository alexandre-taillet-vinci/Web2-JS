import { useState } from "react";
import { Cinema } from "../Cinema";
import { FilmProps } from "../Film";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { PageTitle } from "../PageTitle";

import { Films } from "../Film/Films";
import "./App.css";

const defaultFilms: FilmProps[] = [
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    duration: 142,
    imageLink:
      "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    budget: 25000000,
    description:
      "Two imprisoned people bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    duration: 175,
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    duration: 152,
  },
];


 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const App = () => {
    const [films, setFilms] = useState(defaultFilms);
    const [filmInput, setFilmInput] = useState("");
    const [directorInput, setDirectorInput] = useState("");
    const [durationInput, setDurationInput] = useState("");
    const [imageLinkInput, setImageLinkInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [budgetInput, setBudgetInput] = useState("");
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function formHandler(e: any) {
      e.preventDefault();
      console.log("submit:", filmInput, directorInput, durationInput);
      const newFilm = {
        title: filmInput,
        director: directorInput,
        duration: Number(durationInput), // Convert durationInput to number
        imageLink: imageLinkInput,
        description: descriptionInput,
        budget: Number(budgetInput), // Convert budgetInput to number
      };
  
      setFilmInput("");
      setDirectorInput("");
      setDurationInput("");
      setImageLinkInput("");
      setDescriptionInput("");
      setBudgetInput("");
      setFilms([...films, newFilm]);
    }
    const pageTitle = "Informations sur les films dans les cinémas";

    const cinema1Name = "UGC DeBrouckère";
    const cinema1Movies = [
      {
        title: "HAIKYU-THE DUMPSTER BATTLE",
        director: "Susumu Mitsunaka",
        description:
          "A high-energy sports anime movie focusing on the intense volleyball rivalry between Karasuno High and their fierce competitors.",
      },
      {
        title: "GOODBYE JULIA",
        director: "Mohamed Kordofani",
        description:
          "A high-energy sports anime movie focusing on the intense volleyball rivalry between Karasuno High and their fierce competitors.",
      },
      {
        title: "INCEPTION",
        director: "Christopher Nolan",
        description:
          "A mind-bending sci-fi thriller where a skilled thief, who enters people's dreams to steal secrets, is given a chance to have his criminal record erased if he can implant an idea into a target's subconscious.",
      },
      {
        title: "PARASITE",
        director: "Bong Joon-ho",
        description:
          "An Oscar-winning dark comedy thriller that examines class disparities through the story of two families — one wealthy, the other destitute — and their increasingly complicated relationship.",
      },
    ];

    const cinema2Name = "UGC Toison d'Or";
    const cinema2Movies = [
      {
        title: "THE WATCHERS",
        director: "Ishana Night Shyamalan",
        description:
          "A suspenseful thriller that follows a group of people who are under constant surveillance, leading them to uncover dark secrets about their observers and themselves.",
      },
      {
        title: "BAD BOYS: RIDE OR DIE",
        director: "Adil El Arbi, Bilall Fallah",
        description:
          "The latest installment in the action-packed Bad Boys franchise, featuring detectives Mike Lowrey and Marcus Burnett as they take on their most dangerous case yet.",
      },
      {
        title: "TENET",
        director: "Christopher Nolan",
        description:
          "A complex and visually stunning sci-fi action film where a protagonist embarks on a time-bending mission to prevent World War III, navigating through a world of temporal inversion.",
      },
      {
        title: "THE IRISHMAN",
        director: "Martin Scorsese",
        description:
          "An epic crime drama that chronicles the life of Frank Sheeran, a mob hitman, as he reflects on his involvement with the Bufalino crime family and the mysterious disappearance of his friend, Jimmy Hoffa.",
      },
    ];

    const cinema3Name = "Kinepolis";
    const cinema3Movies = [
      {
        title: "Flic",
        director: "UwU",
        description: "Un film de flic",
      },
      {
        title: "Bruh",
        director: "0w0",
      },
    ];

    return (
      <main>
        <Header
          logo="https://images.unsplash.com/photo-1615915468538-0fbd857888ca?q=80&w=1068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          children={<p>Les cinémas de Vinci</p>}
        ></Header>
        <PageTitle title={pageTitle} />
        <Cinema name={cinema1Name} movies={cinema1Movies} />
        <Cinema name={cinema2Name} movies={cinema2Movies} />
        <Cinema name={cinema3Name} movies={cinema3Movies} />
        <h1>My favourite films</h1>
        <div className="films">
          <Films films={films} />
        </div>
        <form onSubmit={formHandler}>
          <label htmlFor="film">Film</label>
          <input
            value={filmInput}
            type="text"
            id="film"
            name="film"
            onChange={(e) => setFilmInput(e.target.value)}
            required
          />
          <label htmlFor="director">Director</label>
          <input
            value={directorInput}
            type="text"
            id="director"
            name="director"
            onChange={(e) => setDirectorInput(e.target.value)}
            required
          />
          <label htmlFor="duration">Duration</label>
          <input
            value={durationInput}
            type="number"
            id="duration"
            name="duration"
            onChange={(e) => setDurationInput(e.target.value)}
            required
          />
          <label htmlFor="imageLink">Image Link</label>
          <input
            value={imageLinkInput}
            type="text"
            id="imageLink"
            name="imageLink"
            onChange={(e) => setImageLinkInput(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <input
            value={descriptionInput}
            type="text"
            id="description"
            name="description"
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <label htmlFor="budget">Budget</label>
          <input
            value={budgetInput}
            type="number"
            id="budget"
            name="budget"
            onChange={(e) => setBudgetInput(e.target.value)}
          />

          <button type="submit">Add</button>
        </form>
        <Footer children={<p>© 2024 - Tous droits réservés</p>} />
      </main>
    );
  };


export default App;
