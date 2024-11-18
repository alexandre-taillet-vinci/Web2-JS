import { Film, FilmProps } from "../../../../2.7/src/components/Film";



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
