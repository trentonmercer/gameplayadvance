import React from "react";
import { useHistory } from "react-router-dom";

import GBA from "../GBA";

const Game = () => {
    const history = useHistory();

    return (
        <div>
            <button onClick={() => {history.push('/') } }>Library</button>
            <GBA />
        </div>
    );
}


export default Game;