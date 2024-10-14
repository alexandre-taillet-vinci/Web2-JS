import { Movie } from "../Movie";

export interface CinemaProps {
  cinemaName: string;
  movies: Movie[];
}

export const Cinema = (props: CinemaProps) => {
  return (
    <div>
      <h2>{props.cinemaName}</h2>
      <ul>
        {props.movies.map((movie, index) => (
          <li key={index}>
            <strong>{movie.title}</strong> - Réalisateur : {movie.director}
          </li>
        ))}
      </ul>
    </div>
  );
};