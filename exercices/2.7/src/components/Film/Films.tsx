import { Film, FilmProps } from ".";



interface FilmsProps {
    films: FilmProps[];
}

export const Films = ({ films }: FilmsProps) => {
    return (
        <div className="films">
            {films.map((film) => (
                <Film key={film.title} {...film} />
            ))}
        </div>
    );
};
