// IMPORTS
// Styles 
import "./Landing.css"


// COMPONENT 
export const Landing = ({ difficulty, setDifficulty, setGameState }) => {



    // Chage difficulty //
    const handleChangeDifficulty = (level) => {
        setDifficulty(level)
    }

    const handleStatGame = () => { 
        setGameState("Game");
    }


    return (
        <div className="Landing">

            <h1>Clueless</h1>

            <div className="Difficulty-Conatiner">
                <button
                    className={difficulty === 4 ? "Difficulty-Button-Selected" : "Difficulty-Button-Deselected"}
                    onClick={() => { handleChangeDifficulty(4) }}>
                    4 letter word
                </button>
                <button
                    className={difficulty === 5 ? "Difficulty-Button-Selected" : "Difficulty-Button-Deselected"}
                    onClick={() => { handleChangeDifficulty(5) }}>
                    5 letter word
                </button>
                <button
                    className={difficulty === 6 ? "Difficulty-Button-Selected" : "Difficulty-Button-Deselected"}
                    onClick={() => { handleChangeDifficulty(6) }}>
                    6 letter word
                </button>
                <button
                    className={difficulty === 7 ? "Difficulty-Button-Selected" : "Difficulty-Button-Deselected"}
                    onClick={() => { handleChangeDifficulty(7) }}>
                    7 letter word
                </button>
                {/* <button
                    className={difficulty === 1111 ? "Difficulty-Button-Selected" : "Difficulty-Button-Deselected"}
                    onClick={() => { handleChangeDifficulty(1111) }}>
                    Beast
                </button> */}
            </div>

            <button
            onClick={handleStatGame}
                className="Start-Button">
                Start
            </button>

            How to play

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

            <div className="Rules">
                <ul>
                    <li>Try to guess the secret word.</li>
                    <li>Type the word into the input field.</li>
                    <li>If your word includes a letter that is also included in the secret word, it will be a <span style={{color: "#acffac"}}>match</span>.</li>
                    <li>If your word doesn’t contain any letters from the secret word then there is <span style={{color: "#ffafaf"}}>no match</span>.</li>
                    <li>If you get an <span style={{color: "orange"}}>anagram</span> of the word, then you’re getting pretty close.</li>
                </ul>

            </div>

        </div>
    )
}