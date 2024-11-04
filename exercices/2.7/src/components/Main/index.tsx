import { useState } from 'react'
import { FilmProps } from '../Film'
import './App.css'
import { Films } from '../Film/Films'

const defaultFilms: FilmProps[] = [
  {
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    duration: 142,
    imageLink: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
    budget: 25000000,
    description: 'Two imprisoned people bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    duration: 175,
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    duration: 152,
  },
]




function App() {
  const [films, setFilms] = useState(defaultFilms)
  const [filmInput, setFilmInput] = useState("")
  const [directorInput, setDirectorInput] = useState("")
  const [durationInput, setDurationInput] = useState("")
  const [imageLinkInput, setImageLinkInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [budgetInput, setBudgetInput] = useState("")

  function formHandler(e: any) {
    e.preventDefault()
    console.log('submit:', filmInput, directorInput, durationInput)
    const newFilm = {
      title: filmInput,
      director: directorInput,
      duration: Number(durationInput), // Convert durationInput to number
      imageLink: imageLinkInput,
      description: descriptionInput,
      budget: Number(budgetInput), // Convert budgetInput to number
    }

    setFilmInput("")
    setDirectorInput("")
    setDurationInput("")
    setImageLinkInput("")
    setDescriptionInput("")
    setBudgetInput("")
    setFilms([...films, newFilm])
  }


  return (
    <>
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
    </>
  )
}

export default App