import './ResponseCard.css';

const ResponseCard = ({ prompt, response }) => {
    return (
        <>
            <div className='response-card-wrapper'>
                <div className='response-card-content'>
                    <div className='prompt-container'>
                        <p className='left-side'>
                            <span>Prompt</span>: 
                        </p>
                        <p className='right-side'>
                            {prompt}
                        </p>
                    </div>
                    <div className='response-container'>
                        <p className='left-side'>
                            <span>Response</span>:
                        </p>
                        <p className='right-side'>
                            {response}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResponseCard;