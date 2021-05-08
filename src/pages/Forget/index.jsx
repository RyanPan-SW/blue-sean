import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FieldDom from '@/components/Field'
import { errorCode } from '@/helper/error'
import { Form, Input, Button, Modal, message } from 'antd'
import { getCode, verificationCode } from '@/api/forget'
import './index.scss'
import { SendEmailGetCodeDom, VerificationCodeDom, SetNewPasswordDom } from './formDom'

function Forget(props) {
  const [type, setType] = useState('email')
  const [msg, setMsg] = useState(null)

  return (
    <div className='forgrt'>
      <div className='forget-content'>
        {msg && (
          <div className='error'>
            <FieldDom message={msg} />
          </div>
        )}
        {(() => {
          switch (type) {
            case 'email':
              return <SendEmailGetCodeDom setMsg={setMsg} setType={setType} />

            case 'code':
              return <VerificationCodeDom setType={setType} />

            case 'password':
              return <SetNewPasswordDom setType={setType} />

            case 'success':
              return (
                <div>
                  <h4>Your password has been changed.</h4>
                  <p>
                    Do you want to{' '}
                    <Link to='/login'>
                      <b>log in</b>
                    </Link>
                    ?
                  </p>
                </div>
              )
            default:
              break
          }
        })()}
      </div>
    </div>
  )
}

export default Forget
