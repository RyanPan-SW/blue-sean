import React, { useState, useEffect } from 'react'
import { Radio, Space, Checkbox, Button, message } from 'antd'
import Paypal from '../../asset/paypal.png'
import CorporatePayment from '../../asset/corporate.png'
import { getDayOrTime, getOptionalTime } from '@/api/fileStep'
import dayjs from 'dayjs'
import './index.scss'
import { Link } from 'react-router-dom'

function FileStep3({ recipient = [], cityArray, setStep }) {
  const [value, setValue] = useState(1)
  const [datelist, setDatelist] = useState([])
  const [activeDay, setActiveDay] = useState(0)
  const [activeTime, setActiveTime] = useState(0)
  const [paydata, setPaydata] = useState(null)
  const [checkedAgree, setCheckedAgree] = useState(false)

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
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  const onChangeAgree = (e) => {
    setCheckedAgree(e.target.checked)
  }

  const selectTime = (data, index) => {
    debugger
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
    }
    setStep(4)
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
          {paydata ? paydata.totle : 'Please choose the time first'}
        </div>
      </div>

      <div className='step3-item'>
        <div className='step3-decribe'>Payment Method</div>

        <Radio.Group onChange={onChangePayment} value={value} defaultValue={2}>
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
        <Checkbox onChange={onChangeAgree}>
          I agree <Link to="/contract" className='contract'>XXXX contract terms</Link>
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
    </div>
  )
}

export default FileStep3
