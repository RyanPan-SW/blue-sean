import React from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons'
import './index.scss'

function FieldDom({ message = 'This field is required.', border }) {
  return (
    <div id="error" className={border ? 'message-error-border' : 'message-error'}>
      <ExclamationCircleFilled style={{ color: '#A40000' }} />
      <span>{message}</span>
    </div>
  )
}

export default FieldDom
