import React, { useState } from 'react'
import { Breadcrumb, Steps } from 'antd'
import { Link } from 'react-router-dom'
import CustomizeModal from '@/components/CustomizeModal'
import { ReactComponent as Fish } from '../../asset/fishing.svg'
import { ReactComponent as Wait } from '../../asset/wait.svg'

import './index.scss'

const { Step } = Steps

function DetailsView(props) {
  const [visible, setVisible] = useState(false)

  const steps = [
    { title: 'Pending', waitIcon: <Wait />, fishIcon: <Fish /> },
    { title: 'In transit', waitIcon: <Wait />, fishIcon: <Fish /> },
    { title: 'Delivered', waitIcon: <Wait />, fishIcon: <Fish /> },
  ]

  const customDot = (iconDot, { index, status, title, description }) => {
    return (
      <div>
        <span style={{ color: '#000' }}>{title}</span>
        <div>{iconDot}</div>
      </div>
    )
  }

  return (
    <div className='details'>
      <div className='container'>
        <Breadcrumb separator='>'>
          <Breadcrumb.Item>
            <Link to='/account'>My Account</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/order'>My Orders</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Detail View</Breadcrumb.Item>
        </Breadcrumb>

        <div className='detail-notes'>
          <h3>Notes:</h3>
          <p>这里可以放一些规则说明，比如取消和修改快递的一些规则说明。 </p>
          <p>修改的规则： </p>
          <p>取消的规则：</p>
        </div>

        <div className='detail-orders'>
          <div className='order-title'>
            <div>
              <b>Order Placed: </b>
              <span>10:57:59 on Dec 11, 2020</span>&nbsp;&nbsp;|&nbsp;&nbsp;<b>Tracking Numb: </b>
              DC1000000001
            </div>
            <div
              className='orders-cancel'
              onClick={() => {
                setVisible(true)
              }}
            >
              Cancel
            </div>
          </div>

          <div style={{ marginTop: 50 }}>
            <Steps current={1} progressDot={customDot}>
              <Step />
              <Step />
              <Step />
            </Steps>
          </div>

          {/*  <div className='order-steps'>
            <div className='order-step-item'>
              <div>
                <div className='step-content'>1</div>
                <div className='step-icon'>2</div>
              </div>
            </div>
            <div className='order-step-item'>
              <div>
                <div className='step-content'>1</div>
                <div className='step-icon'>2</div>
              </div>
            </div>
            <div className='order-step-item'>
              <div>
                <div className='step-content'>1</div>
                <div className='step-icon'>2</div>
              </div>
            </div>
          </div> */}
        </div>

        <div className='details-sender'>
          <div className='details-sender-title'>
            <span>Modify</span>
          </div>

          <div className='sender-content'>
            <div className='sender-item'>
              <div className='sender-item-title'>Sender:</div>
              <div className='sender-item-content'>
                <p>George Orwell</p>
                <p>Street Address Apt/Suite/Other City</p>
                <p>4999</p>
                <p>0444444-8899</p>
                <p>Orwell@gmail.com</p>
              </div>
            </div>
            <div className='sender-item'>
              <div className='sender-item-title'>Recipient:</div>
              <div className='sender-item-content'>
                <p>Angelina Jolie</p>
                <p>1101 S Main St APT 203 Cold Coast</p>
                <p>4999</p>
                <p>040322931</p>
                <p>Jolie@gmail.com</p>
              </div>
            </div>
          </div>

          <div className='detail-payment'>
            <div>
              <div className='payment-item'>
                <span className='payment-item-title'>Payment method:</span>
                <span className='payment-item-content'>PayPal</span>
              </div>
              <div className='payment-item'>
                <span className='payment-item-title'>Iterm:</span>
                <span className='payment-item-content'>Document</span>
              </div>
            </div>
            <div>
              <div className='payment-item'>
                <span className='payment-item-title'>Charges:</span>
                <span className='payment-item-content'>$ 6.88</span>
              </div>
              <div className='payment-item'>
                <span className='payment-item-title'>Count:</span>
                <span className='payment-item-content'>1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomizeModal width={'57%'} visible={visible}>
        <div className='cusModal-body'>
          <p>
            Sorry，you can't cancel the order now. If you need any help, please contact us.
            <br /> PH: 07 5649 8619 <br /> Office Hours: Monday – Friday 8:30am-5:00pm
          </p>
        </div>
        <div className='cusModal-footer'>
          <span
            className='cusModal-cancel'
            onClick={() => {
              setVisible(false)
            }}
          >
            ok
          </span>
        </div>
      </CustomizeModal>
    </div>
  )
}

export default DetailsView
