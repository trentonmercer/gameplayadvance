import React from 'react'

import Emulator from "../UI/Emulator" // Templating and styles for emulator

/* EmulatorContainer 

This class is meant to manage DOM events, update state, and pass manipulated state 
to the Emulator hook.

*/

export default class EmulatorContainer extends React.Component {
  render() {
    return (
      <Emulator />
    )
  }
}
