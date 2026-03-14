import './Card.css'

export default function Card(props) {
    return (
        <div className='memberCardContainer'>
            <p>{props.title}</p>
            <h2>{props.data}</h2>
        </div>
    );
}