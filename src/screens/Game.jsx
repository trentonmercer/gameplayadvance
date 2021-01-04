import React from "react";
import { useHistory } from "react-router-dom";

import EmulatorContainer from "../components/containers/EmulatorContainer"

const Game = () => {
    const history = useHistory();

    return (
        <div>
            <button onClick={() => {history.push('/') } }>Library</button>
            <EmulatorContainer />
        </div>
    );
}


export default Game;