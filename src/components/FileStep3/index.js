import React from 'react'
import { Radio, Space, Checkbox, Button } from 'antd'
import Paypal from '../../asset/paypal.png'
import CorporatePayment from '../../asset/corporate.png'
import './index.scss'

function FileStep3({ recipient = [], cityArray, setStep }) {
  const [value, setValue] = React.useState(1)

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  return (
    <div className='step3'>
      <div className='step3-title'>Step3: Appointment information</div>

      <div className='step3-item'>
        <div className='step3-decribe'>Delivery Time</div>
        <div className='step-content'>
          <div className='step-content-time'>
            <div className='time-box'>
              <p>12/11/2020</p>
              <p className='today'>Today</p>
            </div>
            <div className='time-box'>
              <p>13/11/2020</p>
              {/* <p>Today</p> */}
            </div>
            <div className='time-box'>
              <p>16/11/2020</p>
              {/* <p>Today</p> */}
            </div>
          </div>
          <div className='step-delivered'>
            <div className='delivered-time'>Delivered before 12:00 am</div>
            <div className='delivered-time'>Delivered before 14:00pm</div>
            <div className='delivered-time'>Delivered before 16:45pm</div>
          </div>
        </div>
      </div>

      <div className='step3-item'>
        <div className='step3-decribe'>Charge</div>
        <div className='step-charge'>Please choose the time first</div>
      </div>

      <div className='step3-item'>
        <div className='step3-decribe'>Payment Method</div>

        <Radio.Group onChange={onChange} value={value}>
          <Space direction='vertical'>
            <Radio value={1}>
              <img src={Paypal} alt='' />
            </Radio>
            <Radio value={2}>
              <img src={CorporatePayment} alt='' />
            </Radio>
          </Space>
        </Radio.Group>
      </div>

      <div className='step-agree'>
        <Checkbox onChange={onChange}>
          I agree <span className='contract'>XXXX contract terms</span>
        </Checkbox>
      </div>

      <div className='button-group'>
        <Button
          type='primary'
          className='button-back'
          onClick={() => {
            setStep(2)
          }}
        >
          Back
        </Button>
        <Button
          type='primary'
          className='button-pay'
          onClick={() => {
            setStep(4)
          }}
        >
          Pay Now
        </Button>
      </div>
    </div>
  )
}

export default FileStep3
