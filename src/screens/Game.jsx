import React from "react";
import { useHistory } from "react-router-dom";


import EmulatorContainer from "../components/containers/EmulatorContainer"

const Game = () => {
    const history = useHistory();

    return (
        <div>
            <button onClick={() => {history.push('/') } }>Library</button>
            <h2>Game Play Advance</h2>
            <EmulatorContainer />
        </div>
    );
}


export default Game;