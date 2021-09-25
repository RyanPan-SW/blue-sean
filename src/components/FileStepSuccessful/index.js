import React from 'react'
import { Button } from 'antd'
import Successful from '../../asset/Successful.png'
import Failed from '../../asset/Failed.png'
import Bpay from '../../asset/bpay@2x.png'
import { Link } from 'react-router-dom'
import './index.scss'
import { getCookie } from '@/helper/env'

function FileStepSuccessful({ setStep, status, message, configContent = '', bpay }) {
  return (
    <div className='step-successful' >

      <img
        className='step-successful-img'
        src={status === 'successful' ? Successful : Failed}
        alt=''
      />

      {bpay && (
        <div className="bpay-successful">
          <div className='bpay-img'>
            <img
              className='step-successful-bpay'
              src={status === 'successful' && Bpay}
              alt=''
            />
            <div className="bpay-img-desc">
              Biller Code：1234 <br />
              Ref：1234 1234 12234 <br />
              Biller Amount：$10.11
            </div>
          </div>

          <div className="bpay-desc">
            <div>Please pay as soon as possible，or the exact delivery time may change</div>
            <div>If you have any questions, please contact us. </div>
            <div>PH: 07 5649 8619    Office Hours: Monday – Friday 8:30am-5:00pm</div>
          </div>
        </div>
      )}

      <p className='step-scussful-text'>{status === 'successful' ? 'Successful' : 'Failed'}</p>

      {status === 'failed' && (
        <p className='step-failed'>
          {/* Sorry, network exception. The payment result cannot be checked temporarily */}
          {message}
        </p>
      )}

      {
        status === 'successful' ? (
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
        ) : (
          <Button
            className='step-pickup-again'
            onClick={() => {
              setStep(1)
            }}
          >
            Schedule a Pickup Again
          </Button>
        )
      }
    </div >
  )
}

export default FileStepSuccessful
