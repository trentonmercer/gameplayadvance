import React from 'react'

/* GBA components */
import Screen from './Screen'
import RoundButton from './RoundButton'
import PillButton from './PillButton'
import MoveButton from './MoveButton'

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
