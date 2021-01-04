import React from "react";
import { useHistory } from "react-router-dom";

const Library = () => {

    const history = useHistory();

    return (
        <div>
            <button onClick={() => {history.push('/game') } }>Game</button>
            <h2>Library</h2>
            <p>List of users ROMs</p>
        </div>
    );
}


export default Library;