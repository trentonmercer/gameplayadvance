import React from 'react'

/* PillButton


*/

const PillButton = (props) => {
  return (
    <div
      styles="padding-left:30%;"
      class="col-xs-6 text-center"
      id="select-wrapper"
    >
      <small styles="margin-bottom: 4px;" id="select-label">
        {props.type}
      </small>
      <br />
      <span class="select">
        <div class="selectbtn" id="button_2"></div>
      </span>
    </div>
  )
}

export default PillButton
