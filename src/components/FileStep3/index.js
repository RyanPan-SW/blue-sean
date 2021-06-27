import React, { useState, useEffect } from 'react'
import { Radio, Space, Checkbox, Button, Input, Form, Modal, Tooltip } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { getDayOrTime, getOptionalTime, methodOfPayment } from '@/api/fileStep'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import visa from '../../asset/visa.png'
import doubt from '../../asset/doubt.png'
import lock from '../../asset/lock.png'
import Bpay from '../../asset/bpay.png'
import Tanhao from '../../asset/tanhao.png'

import './index.scss'

const paymentEmnu = {
  visa: 1,
  corporate: 2,
  bpay: 3,
}

function FileStep3({ recipient = [], cityArray, getPayOrder, setStep }) {
  const [form] = Form.useForm()

  const [payment, setPayment] = useState(null)
  const [datelist, setDatelist] = useState([])
  const [activeDay, setActiveDay] = useState(0)
  const [activeTime, setActiveTime] = useState(0)
  const [paydata, setPaydata] = useState(null)
  const [PaypalModal, setPaypalModal] = useState(false)
  const [code, setCode] = useState(null)
  const [phoneHomeRequired, setPhoneHomeRequired] = useState(true)
  const [phoneMobileRequired, setPhoneMobileRequired] = useState(true)

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

  const selectTime = (data, index) => {
    const { time } = data
    setActiveTime(index)
    const params = { date: datelist[activeDay].date, time: time }
    getDayOrTime(params).then((res) => {
      const { code, data } = res
      if (code === '200' && !data.msg) {
        setPaydata(data)
      }
    })
  }

  const phoneDom = (
    <div className='phone-tip'>
      <ExclamationCircleFilled
        style={{
          color: phoneHomeRequired && phoneMobileRequired ? '#ff4d4f' : '#0113B3',
          marginRight: 6,
        }}
      />
      <span style={{ color: phoneHomeRequired && phoneMobileRequired ? '#ff4d4f' : '#0113B3' }}>
        At least one phone number is required.
      </span>
    </div>
  )

  const onValuesChange = (changeValue, allValues) => {
    if (allValues.phoneHome) {
      setPhoneHomeRequired(true)
      setPhoneMobileRequired(false)
    } else if (allValues.phoneMobile) {
      setPhoneHomeRequired(false)
      setPhoneMobileRequired(true)
    } else {
      setPhoneMobileRequired(true)
      setPhoneHomeRequired(true)
    }
  }

  const onFinish = (values) => {
    const params = { payType: `0${payment}`, paymentCode: code }
    methodOfPayment(params).then((res) => {
      getPayOrder(res)
    })
  }

  return (
    <div className='step3'>
      {/* <Space direction="vertical"> */}
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
                return (
                  <s key={index} className='disabled-time'>
                    {item.title}
                  </s>
                )
              }
            })}
          </div>
        </div>
      </div>

      <div className='step3-item'>
        <div className='step3-decribe'>Charge</div>
        <div className='step-charge'>
          <p>{paydata ? `$${paydata?.total || '0.00'}` : 'Please choose the time first.'}</p>
          {paydata?.total && (
            <span className='step3-charge-tip'>
              If you use corporate payment, you only have to pay $6.
            </span>
          )}
        </div>
      </div>

      <div className='step3-item'>
        <div className='step3-decribe'>Payment Method</div>

        <div className='step-content'>
          <Form layout='vertical' form={form} onValuesChange={onValuesChange} onFinish={onFinish}>
            <div className='step3-card-visa'>
              <div className='step3-card-visa-left'>
                <Space>
                  <Form.Item
                    label='First Name'
                    name='firstName'
                    messageVariables={{ another: 'good' }}
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter.',
                      },
                    ]}
                  >
                    <Input placeholder='' />
                  </Form.Item>

                  <Form.Item
                    label='Last Name'
                    name='lastName'
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter.',
                      },
                    ]}
                  >
                    <Input placeholder='' />
                  </Form.Item>
                </Space>

                <Form.Item
                  label='Phone (home)'
                  name='phoneHome'
                  rules={[
                    {
                      required: phoneHomeRequired,
                      message: 'Please Enter.',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              <div className='step3-card-visa-right'>
                <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter.',
                    },
                  ]}
                >
                  <Input placeholder='' />
                </Form.Item>

                <Form.Item
                  label='Phone (mobile)'
                  name='phoneMobile'
                  extra={phoneDom}
                  rules={[{ required: phoneMobileRequired, message: 'Please Enter.' }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>

            <Radio.Group onChange={onChangePayment}>
              <Space direction='vertical' size='large'>
                <Radio value={paymentEmnu['visa']}>
                  <span>
                    Credit or debit card <img src={visa} alt='' />
                  </span>
                  <div className='step3-visa-tip'>
                    Surcharge: 1.40% will be added to the payment amount
                  </div>

                  {payment === paymentEmnu['visa'] && (
                    <div className='step3-visa-form'>
                      <Form.Item
                        label='Card Number'
                        name='cardNumber'
                        rules={[
                          {
                            required: true,
                            message: 'Enter a valid card number.',
                          },
                        ]}
                      >
                        <Input
                          suffix={
                            <Tooltip
                              placement='right'
                              color={'#FFF'}
                              title={
                                <span style={{ color: '#666' }}>
                                  All transactions are secure and encrypted.
                                </span>
                              }
                              trigger='hover'
                            >
                              <img src={lock} alt='' />
                            </Tooltip>
                          }
                        />
                      </Form.Item>

                      <div className='card-visa'>
                        <Form.Item
                          label='Expiry date(MM/YY)'
                          name='Expiry'
                          rules={[
                            { required: true, message: 'Please enter.' },
                            ({ getFieldValue }) => ({
                              validator: (_, value) => {
                                const [M, Y] = value.split('/')
                                const nowY = dayjs().format('YY')
                                if (!value || (M.match(/^0?[0-9]$|^1[0-2]$/) && Y >= nowY)) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(
                                  <span>
                                    Enter a valid card expiry <br /> date.
                                  </span>,
                                )
                              },
                            }),
                          ]}
                        >
                          <Input placeholder='MM/YY' maxLength={5} />
                        </Form.Item>

                        <Form.Item
                          label='CVV'
                          name='CVV'
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp(/^\d+$/),
                              message: (
                                <span>
                                  Enter the CVV or security
                                  <br /> code on your card.
                                </span>
                              ),
                            },
                          ]}
                        >
                          <Input
                            maxLength={3}
                            suffix={
                              <Tooltip
                                placement='right'
                                color={'#FFF'}
                                title={
                                  <span style={{ color: '#666' }}>
                                    3-digit security code usually found on the back of your card.
                                  </span>
                                }
                                trigger='hover'
                              >
                                <img src={doubt} alt='' />
                              </Tooltip>
                            }
                          />
                        </Form.Item>
                      </div>
                    </div>
                  )}
                </Radio>

                <Radio value={paymentEmnu['corporate']}>
                  <span>Corporate payment</span>

                  {payment === paymentEmnu['corporate'] && (
                    <div className='step3-corporate-form'>
                      <Form.Item
                        label='Corporate Payment Code'
                        name='corporateCode'
                        rules={[{ required: true, message: 'Please Enter.' }]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  )}
                </Radio>

                <Radio value={paymentEmnu['bpay']}>
                  <img src={Bpay} alt='' />

                  {payment === paymentEmnu['bpay'] && (
                    <div className='step3-bpay-div'>
                      <div className='step3-bpay-icon'>
                        <img src={Tanhao} alt='' />
                      </div>
                      <div className='step3-bpay-dirscrbe'>
                        <p>
                          To pay by BPAY you must use your bank or financial institution’s online
                          banking facility.
                        </p>
                        <p>
                          We provide you with a biller code and reference needed for this BPAY
                          payment.
                        </p>
                        <p>Click on Continue to view your biller code and reference.</p>
                      </div>
                    </div>
                  )}
                </Radio>
              </Space>
            </Radio.Group>

            <Form.Item
              className='step-agree'
              style={{ paddingTop: payment === 2 ? 55 : 180 }}
              name='agree'
              valuePropName='checked'
              rules={[{ required: true, message: 'Please agree contract terms' }]}
            >
              <Checkbox>
                <span className='agree'>I agree</span>
                <Link to='/contract' className='contract'>
                  XXXX contract terms
                </Link>
              </Checkbox>
            </Form.Item>

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
                htmlType='submit' /* onClick={payNow} */
              >
                Pay Now
              </Button>
            </div>
          </Form>
        </div>
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
      {/* </Space> */}
    </div>
  )
}

export default FileStep3
