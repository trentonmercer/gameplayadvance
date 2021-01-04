import React from "react";

import Emulator from "../UI/Emulator"

export default class EmulatorContainer extends React.Component {



    render() {
        return (
            <div>
                <Emulator />
                <button>A</button>
                <button>B</button>
            </div>
        );
    }

}