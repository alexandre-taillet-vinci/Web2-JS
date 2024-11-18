import './Film.css';


export interface FilmProps {
    title:string,
    director:string,
    duration:number,
    imageLink?:string
    description?:string
    budget?:number
};


export const Film = ({title,director,duration,imageLink,description, budget}: FilmProps) => {
    return (
        <div className="film">
            <h2>{title}</h2>
            <p>Directeur: {director}</p>
            <p>{duration} minutes</p>
            { imageLink && <img src={imageLink} alt={title} /> }
            <p>{description}</p>
            <p>Budget de {budget}€</p>
        </div>
    );
}
