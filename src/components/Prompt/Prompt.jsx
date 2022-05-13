import './Prompt.css';
import Robot from '../../images/robot.png';
import { useState } from 'react';

import { Configuration, OpenAIApi } from 'openai';

    // API KEY CONFIG
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPEN_AI_API
    });

    // VARIABLE STORING API KEY
    const openai = new OpenAIApi(configuration);


const Prompt = ({ saveResponse }) => {

    // CONTROLS STATE OF PROMPT
    const [prompt, setPrompt] = useState('');

    // DISABLES BUTTON IF INPUT CRITERIA NOT MET
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // MESSAGE TO USER
    const [message, setMessage] = useState('');

    // TELLS USER DATA IS LOADING
    const [isLoading, setIsLoading] = useState(false);


    // FETCH API DATA FUNCTION
    const fetchResponse = () => {
        try {
            openai.createCompletion('text-curie-001', {
                prompt: prompt,
                temperature: 0.8,
                max_tokens: 40,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                echo: true,
            })
            .then(data => {
                const response = data.data.choices[0].text;

                const newResponse = {
                    prompt: prompt, 
                    response: response.split('\n\n')[1],
                    date: Date.now(),
                };
                setIsLoading(false);
                saveResponse(newResponse);
            })
        } catch (err) {
            console.error(err);
        }
    }

    // HANDLES SUBMIT TO FIRE OFF FETCHING FUNCTION
    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        // If INPUT IS LESS THAN 10 CHARACTERS, IT DOES NOT FETCH DATA
        if (prompt.trim().length < 10) {
            setMessage('Please type at least 10 characters');
        } else {
            fetchResponse();
            setPrompt('');
        }
    }

    // SETS THE INPUT TO THE USERINPUT VARIABLE WITH USESTATE HOOK 
    const handleChange = input => {
        if (input === '') {
            setButtonDisabled(true);
            setMessage(null);
        } else {
            setButtonDisabled(false);
            setMessage(null);
        }
        setPrompt(input);
    };

    return(
        <>
            <div className='prompt-wrapper'>
                <h1>Hi! I'm Ned!</h1>
                <img className='robot-img' src={Robot} alt='Robot Cartoon' />
                {/* <img className='robot-img' src="https://media.giphy.com/media/zbzuZgxt23h8ywu7Bm/giphy.gif" alt='Robot Cartoon' /> */}

                <h2 className='sub-header'>Sometimes I say random things...</h2>
                <p className='question-text'>All I need is a little help!</p>

                <p className='prompt-instruction'>What would you like me to talk about?</p>
                
                <form className='prompt-form'>
                    <input 
                        autoFocus
                        type='text' 
                        className='textbox'
                        value={prompt}
                        onChange={({ target }) => handleChange(target.value)}
                        placeholder='Enter your prompt here...'
                    />
                    { !isLoading &&
                        <button
                            disabled={buttonDisabled}
                            onClick={handleSubmit}
                            className='submit-button'
                        >
                            Submit
                        </button>
                    }

                    { isLoading &&
                        <button
                            disabled
                            onClick={handleSubmit}
                            className='submit-button'
                        >
                            Loading...
                        </button>
                    }
                    {message && <p>{message}</p>}
                </form>
            </div>
        </>
    )
}

export default Prompt;