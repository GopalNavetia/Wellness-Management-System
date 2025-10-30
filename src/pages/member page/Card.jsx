import './Card.css'

export default function Card(props) {
    return (
        <div className='cardContainer'>
            <p>{props.title}</p>
            <h2>{props.data}</h2>
        </div>
    );
}