import React, {
  useState,
  useEffect
} from 'react'
import { Button } from 'antd'
import Successful from '../../asset/Successful.png'
import Failed from '../../asset/Failed.png'
import { Link } from 'react-router-dom'
import { getCookie } from '@/helper/env'
import './index.scss'

function FileStepSuccessful({ setStep, status, message, configContent = '' }) {
  const [payType, setPayType] = useState(null)

  useEffect(() => {
    let type = localStorage.getItem('payType')
    setPayType(type)
  })

  return (
    <div className='step-successful' >

      <img
        className='step-successful-img'
        src={status ? Successful : Failed}
        alt=''
      />

      <p className='step-scussful-text'>{status ? payType === "03" ? 'Successful Appointment' : 'Successful' : 'Failed'}</p>
      {/* {payType === "03" && <p className="pay-status">Sorry, your account has been frozen.You cannot use Legal Documents Deliveries & Service of Court Documents.</p>} */}


      {
        status ? (
          <>
            <div className='step-button-group'>
              <Button
                onClick={() => {
                  setStep(1)
                  localStorage.clear('sessionid')
                }}
              >
                Back
              </Button>

              {getCookie('token') && (
                <Button>
                  <Link to='/orders'>Check My Order</Link>
                </Button>
              )}
            </div>

            <p className='step-service'>Service Instructions:</p>
            <div className='step-decribe' dangerouslySetInnerHTML={{ __html: configContent }}></div>
          </>
        ) : (<p className='step-failed'>{message}</p>)
      }
    </div >
  )
}

export default FileStepSuccessful
