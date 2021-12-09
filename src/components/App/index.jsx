import { useCallback, useState } from 'react';
import Footer from '../Footer';

const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseCounter = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, [setCounter]);

  return (
    <div className='webpack'>
      <strong>WEBPACK 5</strong>
      <Footer />
      <div className='webpack__info'>
        <p className='webpack__text'>Example Hot Module Replacement</p>
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
