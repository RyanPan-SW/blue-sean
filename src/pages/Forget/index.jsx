import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FieldDom from '@/components/Field'
import { SendEmailGetCodeDom, VerificationCodeDom, SetNewPasswordDom } from './formDom'
import './index.scss'

function Forget(props) {
  const [type, setType] = useState('email')
  const [msg, setMsg] = useState(null)
  const [Email, setEmail] = useState('')

  return (
    <div className='forgrt'>
      <div className='forget-content'>
        {(() => {
          switch (type) {
            case 'email':
              return <SendEmailGetCodeDom setMsg={setMsg} setType={setType} setEmail={setEmail} />

            case 'code':
              return <VerificationCodeDom setType={setType} Email={Email} />

            case 'password':
              return <SetNewPasswordDom setType={setType} Email={Email} />

            case 'success':
              return (
                <div className='success'>
                  <h4>
                    Congratulations!
                    <br /> Your password has been changed.
                  </h4>
                  <p>
                    <span>Do you want to&nbsp;</span>
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
