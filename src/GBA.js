import React from 'react';

import GameBoyAdvance from './GBA/core/gba';

export default class GBA extends React.Component {

    render() {

        let gba = new GameBoyAdvance();

        return (
            <div>
                <h1>GamePlayAdvance</h1>
            </div>
        );
    }
}
