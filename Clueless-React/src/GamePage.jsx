//IMPORTS 
// Style 
import "./GamePage.css"
// React 
import { useState, useEffect } from "react"
// Random Words
import { generate, count } from "random-words";
// Word exists
import wordExists from 'word-exists';
// Timer
import { Timer } from "./Timer";





// COMPONENTS 
export const GamePage = ({ difficulty, gameState, setGameState }) => {

    // GAMEOVER
    const [gameOver, setGameOver] = useState(false);

    // WORD SETTINGS //
    // Generate word on mount
    useEffect(() => {
        generateWord();
    }, [])

    // Secret word //
    const [generatedWord, setGeneratedWord] = useState("")
    const generateWord = () => {
        const generatedWord = generate({ minLength: difficulty, maxLength: difficulty });
        if (wordExists(generatedWord)) {
            setGeneratedWord(generatedWord)
        } else {
            generateWord();
        }
    }

    // GET HINT //
    const [isHintOpen, setIsHintOpen] = useState(false);
    const handleToggleHint = () => {
        if (isHintOpen) {
            setIsHintOpen(false)
        } else {
            setIsHintOpen(true)
        }
    }
    const [hintCount, setHintCount] = useState(0)
    const getHint = () => {
        setIsHintOpen(false);
        setHintCount(prev => prev + 1)
        // Generate a random number between 0 and the length of generatedWord - 1
        let randomNumber = Math.floor(Math.random() * generatedWord.length);
        // Construct the hint string with underscores
        let hint = '';
        for (let i = 0; i < generatedWord.length; i++) {
            if (i === randomNumber) {
                // Show the character at the random index
                hint += generatedWord[i] + ' ';
            } else {
                // Show underscore for missing characters
                hint += '_ ';
            }
        }
        // Trim any trailing space and log the hint
        setPlaceHolder(hint.trim());
    }


    // TIMER //




    // Guessed Correct // (words share a letter)
    const [correctArray, setCorrectArray] = useState([]);
    const [incorrectArray, setIncorrectArray] = useState([]);
    const [anagramArray, setAnagramArray] = useState([])
    const [prevGuessWas, setPrevGuessWas] = useState('Already'); // Correct // Incorrect // Anagram // Already
    const [guessCount, setGuessCount] = useState(0);

    //  handle Input section //
    const [inputValue, setInputValue] = useState('');
    const [placeHolder, setPlaceHolder] = useState('Type your first word to start');
    const handleChangeInputValue = (e) => {
        let userInput = e.target.value;
        // Remove any characters that are not letters
        let lettersOnly = userInput.replace(/[^a-zA-Z]/g, '');
        // Convert to lowercase
        let lowercase = lettersOnly.toLowerCase();
        // Set the input value
        setInputValue(lowercase);
    }

    const isAnagram = (str1, str2) => {
        const normalizeString = str => str.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const normalizedStr1 = normalizeString(str1);
        const normalizedStr2 = normalizeString(str2);
        if (normalizedStr1.length !== normalizedStr2.length) {
            return false;
        }
        const sortedStr1 = normalizedStr1.split('').sort().join('');
        const sortedStr2 = normalizedStr2.split('').sort().join('');
        return sortedStr1 === sortedStr2;
    };

    // Timer State changed on first submit
    const [timerStarted, setTimerStarted] = useState(false);
    const handleSubmit = () => {
        if (!timerStarted) {
            setTimerStarted(true);
        }

        if (inputValue.length < 4) {
            setPrevGuessWas("Already")
            setPlaceHolder("Must contain at least 4 letters")
            setInputValue('');
            return
        }
        // In not real word
        if (!wordExists(inputValue)) {
            setPlaceHolder("I dont know that word");
            setInputValue("");
            setPrevGuessWas("Already")
            return
        }
        setPlaceHolder("");
        // if FOUND WORD
        if (inputValue === generatedWord) {
            setTimerStarted(false);
            setGameOver(true);
            return;
        }
        // Already guessed, don't add to arrays
        if (correctArray.includes(inputValue) || incorrectArray.includes(inputValue) || anagramArray.includes(inputValue)) {
            setPlaceHolder('"' + inputValue + '"' + " already guessed");
            setInputValue("");
            setPrevGuessWas("Already")
            return;
        }
        // Check if inputValue is an anagram of generatedWord
        if (isAnagram(generatedWord, inputValue)) {
            setAnagramArray(prev => [...prev, inputValue]);
            setInputValue('');
            setGuessCount(prevGuessCount => prevGuessCount + 1);
            setPrevGuessWas("Anagram")
            return;
        }
        // Check if inputValue shares any letters with generatedWord
        for (let letter of generatedWord) {
            if (inputValue.includes(letter)) {
                setCorrectArray(prev => [...prev, inputValue]);
                setInputValue('');
                setGuessCount(prevGuessCount => prevGuessCount + 1);
                setPrevGuessWas("Correct")
                return;
            }
        }
        setIncorrectArray(prev => [...prev, inputValue]);
        setInputValue('');
        setGuessCount(prevGuessCount => prevGuessCount + 1);
        setPrevGuessWas("Incorrect")
        return;
    }

    // Handle Take Home //
    const handleTakeHome = () => {
        setGameState('Landing')
    }

    return (
        <div className="GamePage">
            <div className="Header">
                <div
                    onClick={handleToggleHint}
                    className="Hint-Container">
                    <div className="Hint-Text">
                        Hint
                        <div className="Hint-Number">
                            {hintCount}
                        </div>
                    </div>
                </div>
                <h1
                    style={{
                        flex: '1',
                        textAlign: 'center'
                    }}>Clueless</h1>
                <div className="Guesses-Container">
                    <div className="Guesses-Text">
                        Guesses
                        <div className="Guesses-Number">
                            {guessCount}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hint Popup */}
            {isHintOpen && (
                <>
                    <div className="Hint-Overlay">
                    </div>
                    <div className="Hint-Popup-Container">
                        <div className="Hint-Popup">
                            <div>Are you sure you want a hint?</div>
                            <div>It will forfit your place on the leaderboard.</div>
                            <div className="Hint-Confirmation-Buttons">
                                <button
                                    onClick={handleToggleHint}
                                >Cancel</button>
                                <button
                                    onClick={getHint}
                                    style={{
                                        backgroundColor: "#ffafaf"
                                    }}>Get Hint</button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <Timer timerStarted={timerStarted} />



            {gameOver ? (
                <div className="Gameover-Container">
                    <h3>WellDone!</h3>
                    <div>You found the word <strong>{generatedWord}</strong></div>
                    <div>Guesses: {guessCount}</div>
                    <div>Hints used: {hintCount}</div>
                    <button
                        onClick={handleTakeHome}
                    >Another!</button>
                </div>
            ) : (
                <>
                    {difficulty === 1111 ? (
                        <>Marathon mode</>
                    ) : (
                        <>{difficulty} letter word</>
                    )}

                    <div className="Color-Key">
                        <div className="Key">
                            <div className="Red">
                            </div>
                            <div className="Meaning">
                                No match
                            </div>
                        </div>
                        <div className="Key">
                            <div className="Green">
                            </div>
                            <div className="Meaning">
                                Match
                            </div>
                        </div>
                        <div className="Key">
                            <div className="Orange">
                            </div>
                            <div className="Meaning">
                                Anagram
                            </div>
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder={placeHolder}
                        value={inputValue}
                        onChange={handleChangeInputValue}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                        style={{
                            outline: prevGuessWas === "Already" ? '3px solid gray' :
                                prevGuessWas === "Correct" ? '3px solid #acffac' :
                                    prevGuessWas === "Incorrect" ? '3px solid #ffafaf' :
                                        prevGuessWas === "Anagram" ? '3px solid #ffda96' :
                                            'none', // Default outline style
                        }}
                        required />
                </>
            )}
















            <div className="Attempt-Conatiner">
                <div className="Correct-Conatiner">
                    <div className="Correct-Guess-Count">
                        {correctArray.length === 0 ? (
                            <>-</>
                        ) : (
                            <>{correctArray.length}</>
                        )}

                    </div>
                    {anagramArray.reverse().map((word, index) => (
                        <div
                            key={index}
                            className="Anagram">
                            {word}
                        </div>
                    ))}
                    {correctArray.reverse().map((word, index) => (
                        <div
                            key={index}
                            className="Correct-Attempt">
                            {word}
                        </div>
                    ))}
                </div>
                <div className="Incorrect-Container">
                    <div className="Inorrect-Guess-Count">
                        {incorrectArray.reverse().length === 0 ? (
                            <>-</>
                        ) : (
                            <>{incorrectArray.length}</>
                        )}
                    </div>
                    {incorrectArray.map((word, index) => (
                        <div
                            key={index}
                            className="Incorrect-Attempt">
                            {word}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
