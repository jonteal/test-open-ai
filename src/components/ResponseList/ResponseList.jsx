import ResponseCard from '../ResponseCard/ResponseCard';
import './ResponseList.css';

const ResponseList = ({ savedResponses }) => {
    if (savedResponses.length < 1) 
    
    return (
        <p className='no-response-text'>No responses yet...</p>
    )

    return (

        // LIST OF RESPONSE CARDS 
        <ul>
            {savedResponses.map(response => (
                <li>
                    <ResponseCard
                        prompt={response.prompt}
                        response={response.response}
                        key={response.date}
                    />
                </li>
            ))}
        </ul>
    )
}

export default ResponseList;