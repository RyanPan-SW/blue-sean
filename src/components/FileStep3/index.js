import React, { useState, useEffect } from 'react'
import { Radio, Space, Checkbox, Button, message, Input, Modal } from 'antd'
import Paypal from '../../asset/paypal.png'
import CorporatePayment from '../../asset/corporate.png'
import { getDayOrTime, getOptionalTime, methodOfPayment } from '@/api/fileStep'
import dayjs from 'dayjs'
import './index.scss'
import { Link } from 'react-router-dom'

const paymentEmnu = {
  paypal: 1,
  corporate: 2,
}

function FileStep3({ recipient = [], cityArray, getPayOrder, setStep }) {
  const [payment, setPayment] = useState(1)
  const [datelist, setDatelist] = useState([])
  const [activeDay, setActiveDay] = useState(0)
  const [activeTime, setActiveTime] = useState(0)
  const [paydata, setPaydata] = useState(null)
  const [checkedAgree, setCheckedAgree] = useState(false)
  const [PaypalModal, setPaypalModal] = useState(false)
  const [code, setCode] = useState(null)

  useEffect(() => {
    getOptionalTime().then((res) => {
      const { code, data } = res
      if (code === '200' && data.dateList) {
        for (const item of data.dateList) {
          const [day, month, year] = item.date.split('/')
          item.day = day
          item.month = month
          item.year = year
        }
        setDatelist(data.dateList)
      }
    })
  }, [])

  const isToday = ({ year, month, day }) => {
    let time = `${year}-${month}-${day}`
    return dayjs().isSame(dayjs(time), 'day')
  }

  const onChangePayment = (e) => {
    setPayment(e.target.value)
  }

  const onChangeAgree = (e) => {
    setCheckedAgree(e.target.checked)
  }

  const selectTime = (data, index) => {
    const { time } = data
    setActiveTime(index)
    const params = { date: datelist[activeDay].date, time: time }
    getDayOrTime(params).then((res) => {
      const { code, data } = res
      if (code === '200' && !data.msg) {
        setPaydata(data)
      } else {
        message.error(data.msg)
      }
    })
  }

  const payNow = () => {
    if (!checkedAgree) {
      message.warn('Please check I agree XXXX contract terms.')
      return
    } else if (payment === paymentEmnu['paypal']) {
      setPaypalModal(true)
      return
    } else if (payment === paymentEmnu['corporate'] && !code) {
      message.warn('Please input Corporate Payment Code.')
      return
    } else {
      const params = { payType: `0${payment}`, paymentCode: code }
      methodOfPayment(params).then((res) => {
        
        getPayOrder(res)
      })
    }
  }

  return (
    <div className='step3'>
      <div className='step3-title'>Step3: Appointment information</div>

      <div className='step3-item'>
        <div className='step3-decribe'>Delivery Time</div>
        <div className='step-content'>
          <div className='step-content-time'>
            {datelist?.map((item, index) => {
              return (
                <div
                  key={item.date}
                  className={activeDay === index ? 'time-active' : 'time-box'}
                  onClick={() => setActiveDay(index)}
                >
                  {isToday(item) ? (
                    <p>
                      <p style={{ lineHeight: '25px' }}>{item.date}</p>
                      <p className='today'>Today</p>
                    </p>
                  ) : (
                    <p style={{ lineHeight: '50px' }}>{item.date}</p>
                  )}
                </div>
              )
            })}
          </div>
          <div className='step-delivered'>
            {(datelist[activeDay]?.timeList || []).map((item, index) => {
              if (item.enable === '1') {
                return (
                  <div
                    key={index}
                    className={activeTime === index ? 'delivered-active' : 'delivered-time'}
                    onClick={() => selectTime(item, index)}
                  >
                    {item.title}
                  </div>
                )
              } else {
                return <s className='disabled-time'>{item.title}</s>
              }
            })}
          </div>
        </div>
      </div>

      <div className='step3-item'>
        <div className='step3-decribe'>Charge</div>
        <div className='step-charge'>
          {paydata ? `$${paydata.total}` : 'Please choose the time first'}
        </div>
      </div>

      <div className='step3-item'>
        <div className='step3-decribe'>Payment Method</div>

        <div className='step-content'>
          <Space direction='vertical'>
            <Radio.Group onChange={onChangePayment} value={payment}>
              <Space direction='vertical'>
                <Radio value={paymentEmnu['paypal']}>
                  <img src={Paypal} alt='' />
                </Radio>
                <Radio value={paymentEmnu['corporate']}>
                  <img src={CorporatePayment} alt='' />
                </Radio>
              </Space>
            </Radio.Group>

            {payment === 2 && (
              <div className='payment-code'>
                <div>Corporate Payment Code:</div>

                <Input
                  className='code'
                  onChange={(e) => {
                    setCode(e.target.value)
                  }}
                />
              </div>
            )}
          </Space>
        </div>
      </div>

      <div className='step-agree' style={{ paddingTop: payment === 2 ? 55 : 180 }}>
        <Checkbox onChange={onChangeAgree}>
          <span className='agree'>I agree</span>
          <Link to='/contract' className='contract'>
            XXXX contract terms
          </Link>
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
        <Button type='primary' className='button-pay' onClick={payNow}>
          Pay Now
        </Button>
      </div>

      <Modal visible={PaypalModal} centered closable={false} footer={null}>
        <p>
          Please pay in the newly opened payment platform page. Please do not close this window
          until you have completed the payment.
        </p>

        <div className='paypal-modal-footer'>
          <Button
            onClick={() => {
              setPaypalModal(false)
            }}
            type='primary'
            className='paypal-modal-cancel'
          >
            Change payment method
          </Button>
          <Button
            onClick={() => {
              setPaypalModal(false)
            }}
            type='primary'
            className='paypal-modal-ok'
          >
            Completed payment
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default FileStep3
