import React from 'react'

/* Import styles */
import '../../lib/gameplayadvance/css/gba.css'
import '../../lib/gameplayadvance/css/main.css'
import '../../lib/gameplayadvance/css/bootstrap.min.css'

/* GBA components */
import Screen from './GBA/Screen'
import RoundButton from './GBA/RoundButton'
import PillButton from './GBA/PillButton'
import MoveButton from './GBA/MoveButton'

/* Emulator

This hook is ONLY meant to manage visuals. State and DOM manipulations are 
managed by EmulatorContainer, this hook's container component.

*/

const Emulator = () => {
  return (
    <section id="gameboy" class="purple container">
      <Screen />

      <RoundButton type={'A'} />
      <RoundButton type={'B'} />

      <MoveButton direction={"up"} />
      <MoveButton direction={"down"} />
      <MoveButton direction={"left"} />
      <MoveButton direction={"right"} />

      <br />

      <PillButton type={'Start'} />
      <PillButton type={'Select'} />
    </section>
  )
}

export default Emulator
