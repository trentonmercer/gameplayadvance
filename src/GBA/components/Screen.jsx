import React from 'react'



const Screen = () => {
  return (
    <section id="screen-wrapper" class="panel panel-default panel-body">
      <div id="main" styles="min-width:343px;width:100%;" height="300">
        <div styles="display: flex; justify-content: center;">
          <canvas
            styles="max-width:343px;width:100%;margin-top:0px;"
            id="screen"
            width="343px"
            height="300"
          ></canvas>
        </div>
      </div>
    </section>
  )
}

export default Screen
