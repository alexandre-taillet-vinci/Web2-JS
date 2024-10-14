import './App.css';

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";
  

  const cinema1Name = "UGC DeBrouckère";
  const cinema1Movie1Title = "Film 1 - DeBrouckère";
  const cinema1Movie1Director = "Director A";
  const cinema1Movie2Title = "Film 2 - DeBrouckère";
  const cinema1Movie2Director = "Director B";
  const cinema1Movies = [
    { title: cinema1Movie1Title, director: cinema1Movie1Director },
    { title: cinema1Movie2Title, director: cinema1Movie2Director },
  ];

  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movie1Title = "Film 1 - Toison d'Or";
  const cinema2Movie1Director = "Director C";
  const cinema2Movie2Title = "Film 2 - Toison d'Or";
  const cinema2Movie2Director = "Director D";
  const cinema2Movies = [
    { title: cinema2Movie1Title, director: cinema2Movie1Director },
    { title: cinema2Movie2Title, director: cinema2Movie2Director },
  ];

  return (
    <div>
      <PageTitle title={pageTitle} />
      <Cinema cinemaName={cinema1Name} movies={cinema1Movies} />
      <Cinema cinemaName={cinema2Name} movies={cinema2Movies} />
    </div>
  );
};

interface PageTitleProps {
  title: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
    </header>
  );
};

interface CinemaProps {
  cinemaName: string;
  movies: Movie[];
}

interface Movie {
  title: string;
  director: string;
}

const Cinema = (props: CinemaProps) => {
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
export default App;