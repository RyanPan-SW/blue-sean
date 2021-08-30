import React, { useState } from 'react'
import { Input } from 'antd'

import './index.scss'

function InputPassword(props) {
  const [suffixType, setSuffixType] = useState('show')
  const [type, setType] = useState('password')

  const changePasswordType = () => {
    if (type === 'password') {
      setType('text')
      setSuffixType('hide')
    } else if (type === 'text') {
      setType('password')
      setSuffixType('show')
    }
  }

  const onBlurInput = () => {
    setType('password')
    setSuffixType('show')
  }

  return (
    <div>
      <Input
        type={type}
        onBlur={onBlurInput}
        suffix={<span className="suffixType" onClick={changePasswordType}>{suffixType}</span>} />
    </div>
  )
}

export default InputPassword