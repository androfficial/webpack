import { useState } from 'react';

import { Footer } from './components';

const App = () => {
  const [counter, setCounter] = useState(0);
  const increaseCounter = () => setCounter((prev) => prev + 1);

  return (
    <div className='webpack'>
      <strong>WEBPACK 5</strong>
      <Footer />
      <div className='webpack__info'>
        <button
          onClick={increaseCounter}
          className='webpack__button'
          type='button'
        >
          Counter: <span>{counter}</span>
        </button>
      </div>
    </div>
  );
};

export default App;
