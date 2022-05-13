import './App.css';
import Prompt from './components/Prompt/Prompt';
import ResponseList from './components/ResponseList/ResponseList';
import { useState, useEffect } from 'react';

function App() {

  // GET RESPONSES OUT OF LOCAL STORAGE
  const [savedResponses, setSavedResponses] = useState(
    localStorage.getItem('responses')
      ? JSON.parse(localStorage.getItem('responses'))
      : []
  );

  // REPLACES OLD SAVED RESPONSES WITH NEW SET WHEN ONE IS ADDED
  const saveResponse = newResponse => {
    setSavedResponses([newResponse, ...savedResponses]);
  };

  // SETS SAVED RESPONSES INTO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('responses', JSON.stringify(savedResponses));
  }, [savedResponses]);

  return (
    <div className='App'>
      <Prompt saveResponse={saveResponse} />
      <ResponseList savedResponses={savedResponses} />
    </div>
  );
}

export default App;
