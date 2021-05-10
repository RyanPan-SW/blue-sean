import React from 'react'
import { Radio, Space, Checkbox, Button } from 'antd'
import Paypal from '../../asset/paypal.png'
import Successful from '../../asset/Successful.png'
import Failed from '../../asset/Failed.png'
import './index.scss'
import { Link } from 'react-router-dom'

function FileStepSuccessful({ setStep, status }) {
  return (
    <div className='step-successful'>
      <img
        className='step-successful-img'
        src={status === 'successful' ? Successful : Failed}
        alt=''
      />

      <p className='step-scussful-text'>{status === 'successful' ? 'Successful' : 'Failed'}</p>

      {status === 'failed' && (
        <p className='step-failed'>
          Sorry, network exception. The payment result cannot be checked temporarily
        </p>
      )}

      {status === 'successful' ? (
        <>
          <div className='step-button-group'>
            <Button
              onClick={() => {
                setStep(3)
              }}
            >
              Back
            </Button>
            <Button>
              <Link to='/orders'>Check My Order</Link>
            </Button>
          </div>

          <p className='step-service'>Service Instructions:</p>

          <p className='step-decribe'>
            这里可以放一些规则说明，比如取消和修改快递的一些规则说明。 <br />
            修改的规则： <br />
            取消的规则：
            <br />
          </p>
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
      )}
    </div>
  )
}

export default FileStepSuccessful
