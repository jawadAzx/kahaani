import React, { useState } from 'react';
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

function Testing(props) {
  return(
    <div>
      <h1>Tippy tutroial</h1>
      <div>
        Hello
        <Tippy interactive={true} content={'hi'}>
          <button className='tippy-button'>
            Click on me
          </button>
        </Tippy>
        World
      </div>
    </div>
  )
}

export default Testing