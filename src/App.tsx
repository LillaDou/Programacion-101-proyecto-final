import { useEffect, useState } from 'react';
import './App.css';
import { HangImage } from './components/HangImage';
import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord';


function App() {

  // Construcción de los espacios de la palabra a adivinar
  const [word, setWord] = useState (getRandomWord());
  const [hiddenWord, setHiddenWord] = useState ('_ '.repeat(word.length));
  const [ attempts, setAttempts ] = useState(0);
  const [ lose, setLose ] = useState ( false );
  const [ won, setWon ] = useState ( false );

  // Determinar si la persona perdió
  useEffect ( () => {
    if ( attempts >= 9 ) {
      setLose( true );
    }
  }, [ attempts ] );

  // Determinar si la persona ganó
  useEffect ( () => {

    const currentHiddenWord = hiddenWord.split(' ').join('');
    if (currentHiddenWord === word) {
      setWon (true);
    }

  }, [ hiddenWord ])


  const checkLetter = ( letter: string ) => {
    // Si perdió, no permite que se puedan seguir apretando botones
    if ( lose ) return;
    if (won) return;

    // Check si la letra está incluida en la palabra a averiguar
    if ( !word.includes(letter)) {
      setAttempts ( Math.min(attempts + 1, 9));
      return
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for (let i=0; i < word.length; i++) {
      if ( word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord (hiddenWordArray.join(' '));
  }

  const newGame = () => {
    const newWord = getRandomWord();

    setWord( newWord );
    setHiddenWord( '_ '.repeat(word.length) );
    setAttempts(0);
    setLose(false);
    setWon( false );
  }

  return (
    <div className="App">

        {/* Imagenes */}
        <HangImage imageNumber={ attempts }/>

        {/* Palabra oculta */}
        <h3>{hiddenWord}</h3>

        {/* Contador de intentos */}
        <h3>Intentos: {attempts} </h3>

        {/* Mensaje si perdió */}
        {
          ( lose ) 
          ? <h2>Perdió { word }</h2>
          : ''
        }

        {/* Mensaje si ganó */}
        {
          ( won ) 
          ? <h2>Felicidades, usted ganó</h2>
          : ''
        }

        {/* Botones de letras */}
        {
          letters.map( (letter) => (
            <button 
            onClick={ () => checkLetter(letter) }
            key={ letter }>
              { letter }
            </button>
          ) )
        }

        <br></br>
        <button onClick={ newGame }>¿Nuevo juego?</button>


    </div>
  )
}

export default App;
