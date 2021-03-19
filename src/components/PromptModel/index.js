import React from 'react'
import './index.scss'

function PromptModel(props) {
  return (
    <div className='promptModel'>
      <div className="prompt-content">{props.children}</div>
    </div>
  )
}

export default PromptModel
