import React, { useState, useEffect } from 'react'
import { Breadcrumb, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import CustomizeModal from '@/components/CustomizeModal'
// import { ReactComponent as Fish } from '../../asset/fishing.svg'
// import { ReactComponent as Wait } from '../../asset/wait.svg'
import * as dayjs from 'dayjs'
import { getOrderDateils } from '@/api/orders'
import FieldDom from '@/components/Field'
import './index.scss'

function DetailsView(props) {
  const [cancelVisible, setCancelVisible] = useState(false)
  const [changeVisible, setChangeVisible] = useState(false)
  const [overTime, setOverTime] = useState(false)
  const [data, setData] = useState(null)

  const [form] = Form.useForm()

  const onCancel = () => {
    console.log('取消订单')
  }

  const onOk = () => {
    setCancelVisible(false)
  }

  useEffect(() => {
    getOrderDateils({ number: 111 }).then((res) => {
      let date1 = dayjs(`${res?.orderDetails.orderDay} ${res?.orderDetails.orderTime}`)
      let date2 = dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss'))
      if (date2.diff(date1, 'minute') >= 30) {
        // setOverTime(true)
      }
      setData(res)
    })
  }, [])

  const showChangeForm = () => {
    setChangeVisible(true)
  }

  const onFinish = (e) => {
    form
      .validateFields()
      .then((values) => {
        console.log('values', values)
      })
      .catch((errorInfo) => {
        console.log('errorInfo', errorInfo)
      })
  }

  return (
    <div className='details'>
      <div className='container'>
        <Breadcrumb separator='>'>
          <Breadcrumb.Item>
            <Link to='/account'>My Account</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/orders'>My Orders</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Detail View</Breadcrumb.Item>
        </Breadcrumb>

        <div className='detail-notes'>
          <h3>Notes:</h3>
          {/* <p>这里可以放一些规则说明，比如取消和修改快递的一些规则说明。 </p>
          <p>修改的规则： </p>
          <p>取消的规则：</p> */}
          <div dangerouslySetInnerHTML={{ __html: data?.notes }}></div>
        </div>

        <div className='detail-orders'>
          <div className='order-title'>
            <div>
              <b>Order Placed: </b>
              <span>
                {data?.orderDetails.orderTime} on {data?.orderDetails.orderDay}
              </span>
              &nbsp;&nbsp;|&nbsp;&nbsp;<b>Tracking Numb: </b>
              {data?.orderDetails.number}
            </div>
            {data?.orderDetails.status <= 2 && (
              <div
                className='orders-cancel'
                onClick={() => {
                  setCancelVisible(true)
                }}
              >
                Cancel
              </div>
            )}
          </div>

          {data?.orderDetails.status < 3 ? (
            <div className='order-steps'>
              <div
                className={`order-step-item ${
                  data?.orderDetails.status >= 0 ? 'order-step-fished' : null
                }`}
              >
                <div className='order-step-box'>
                  <div className='step-status'>Padding</div>
                  <div className='step-icon'></div>
                  <div className='step-line'></div>
                  <div className='step-content'>
                    {data?.orderDetails.status === 0 && 'waiting to be received'}
                  </div>
                </div>
              </div>

              <div
                className={`order-step-item ${
                  data?.orderDetails.status >= 1 ? 'order-step-fished' : null
                }`}
              >
                <div className='order-step-box'>
                  <div className='step-status'>In transit</div>
                  <div className='step-icon'></div>
                  <div className='step-line'></div>
                  <div className='step-content'>{/* this's content */}</div>
                </div>
              </div>

              <div
                className={`order-step-item ${
                  data?.orderDetails.status >= 2 ? 'order-step-fished' : null
                }`}
              >
                <div className='order-step-box'>
                  <div className='step-status'>Delivered</div>
                  <div className='step-icon'></div>
                  <div className='step-line'></div>
                  <div className='step-content'>
                    <p>Expected</p>
                    <p>{data?.orderDetails.expectedTime}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='order-cancel'>
              <div className='order-cancel-item'>
                <div className='order-cancel-box'>
                  <div className='cancel-status'>Canceled</div>
                  <div className='cancel-icon'></div>
                  <div className='cancel-content'>
                    <p>11:37:59  on Dec 11, 2020</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='details-sender'>
          <div className='details-sender-title'>
            {!overTime && <span onClick={showChangeForm}>Modify</span>}
          </div>

          <div className='sender-content'>
            <div className='sender-item'>
              <div className='sender-item-title'>Sender:</div>
              <div className='sender-item-content'>
                <p>
                  {data?.orderDetails.sender.firstName || '-'}&nbsp;
                  {data?.orderDetails.sender.lastName || '-'}
                </p>
                <p>{data?.orderDetails.sender.CompanyName}</p>
                <p>{data?.orderDetails.sender.address}</p>
                <p>{data?.orderDetails.sender.zipCode}</p>
                <p>{data?.orderDetails.sender.phone}</p>
                <p>{data?.orderDetails.sender.email}</p>
              </div>
            </div>
            <div className='sender-item'>
              <div className='sender-item-title'>Recipient:</div>
              <div className='sender-item-content'>
                <p>
                  {data?.orderDetails.recipient.firstName || '-'}&nbsp;
                  {data?.orderDetails.recipient.lastName || '-'}
                </p>
                <p>{data?.orderDetails.recipient.CompanyName}</p>
                <p>{data?.orderDetails.recipient.address}</p>
                <p>{data?.orderDetails.recipient.zipCode}</p>
                <p>{data?.orderDetails.recipient.phone}</p>
                <p>{data?.orderDetails.recipient.email}</p>
              </div>
            </div>
          </div>

          <div className='detail-payment'>
            <div>
              <div className='payment-item'>
                <span className='payment-item-title'>Payment method:</span>
                <span className='payment-item-content'>
                  {data?.orderDetails.paymentMethod || '--'}
                </span>
              </div>
              <div className='payment-item'>
                <span className='payment-item-title'>Iterm:</span>
                <span className='payment-item-content'>{data?.orderDetails.iterm || '--'}</span>
              </div>
            </div>
            <div>
              <div className='payment-item'>
                <span className='payment-item-title'>Charges:</span>
                <span className='payment-item-content'>$ {data?.orderDetails.charges || '--'}</span>
              </div>
              <div className='payment-item'>
                <span className='payment-item-title'>Count:</span>
                <span className='payment-item-content'>{data?.orderDetails.count || '--'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomizeModal
        width={'57%'}
        visible={cancelVisible}
        onCancel={onCancel}
        cancelText={overTime ? null : 'Yes'}
        okText={overTime ? 'Ok' : 'No'}
        onOk={onOk}
      >
        <div>
          {overTime ? (
            <p>
              Sorry，you can't cancel the order now. If you need any help, please contact us.
              <br /> PH: 07 5649 8619 <br /> Office Hours: Monday – Friday 8:30am-5:00pm
            </p>
          ) : (
            <p>
              Free cancellation within 30 minutes after placing an order.Would you want to cancel
              this order?
            </p>
          )}
        </div>
      </CustomizeModal>

      <CustomizeModal
        width={'70%'}
        visible={changeVisible}
        onCancel={() => {
          setChangeVisible(false)
        }}
        cancelText={null}
        onOk={() => {
          setChangeVisible(false)
        }}
        footer={
          overTime ? null : (
            <div className='modal-recipient-footer'>
              <div>
                <span
                  className='modal-recipient-back'
                  onClick={() => {
                    setChangeVisible(false)
                  }}
                >
                  Back
                </span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <span className='modal-recipient-submit' onClick={onFinish}>
                  Submit
                </span>
              </div>
            </div>
          )
        }
      >
        {overTime ? (
          <>
            <p>
              Sorry, it's more than 30 minutes. You are not allowed to modify the order information.
              If you need any help, please contact us.
            </p>
            <p>PH: 07 5649 8619</p>
            <p>Office Hours: Monday – Friday 8:30am-5:00pm</p>
          </>
        ) : (
          <>
            <h3>Sender Information</h3>
            <Form
              form={form}
              layout='vertical'
              style={{ display: 'flex' }}
              initialValues={{
                FirstName: data?.orderDetails.recipient.firstName || '',
                LastName: data?.orderDetails.recipient.lastName,
                Email: data?.orderDetails.recipient.email,
                StreetAddress: data?.orderDetails.recipient.StreetAddress,
                City: data?.orderDetails.recipient.city,
                PhoneNumber: data?.orderDetails.recipient.phone,
                CompanyName: data?.orderDetails.recipient.CompanyName,
                address: data?.orderDetails.recipient.address,
                ZIPCode: data?.orderDetails.recipient.zipCode,
              }}
              // onFinish={onFinish}
            >
              <div style={{ flex: 1, padding: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Form.Item
                    label='First Name'
                    name='FirstName'
                    style={{ width: '45%' }}
                    rules={[{ required: true, message: <FieldDom /> }]}
                  >
                    <Input placeholder='First Name' />
                  </Form.Item>

                  <Form.Item
                    label='Last Name'
                    name='LastName'
                    style={{ width: '45%' }}
                    rules={[{ required: true, message: <FieldDom /> }]}
                  >
                    <Input placeholder='Last Name' name={['name', 'last']} />
                  </Form.Item>
                </div>

                <Form.Item
                  label='Email'
                  name='Email'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                  label='Street Address'
                  name='StreetAddress'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Street Address' />
                </Form.Item>

                <Form.Item
                  label='City'
                  name='City'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='City' />
                </Form.Item>
              </div>

              <div style={{ flex: 1, padding: 30 }}>
                <Form.Item
                  label='Phone Number'
                  name='PhoneNumber'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='email' />
                </Form.Item>

                <Form.Item
                  label='Company Name'
                  name='CompanyName'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Company Name' />
                </Form.Item>

                <Form.Item
                  label='Apt/Suite/Other'
                  name='address'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Apt/Suite/Other' />
                </Form.Item>

                <Form.Item
                  label='ZIP Code'
                  name='ZIPCode'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='ZIP Code' />
                </Form.Item>
              </div>
            </Form>

            <h3>Recipient Information</h3>
            <Form
              form={form}
              layout='vertical'
              style={{ display: 'flex' }}
              initialValues={{
                FirstName: data?.orderDetails.recipient.firstName || '',
                LastName: data?.orderDetails.recipient.lastName,
                Email: data?.orderDetails.recipient.email,
                StreetAddress: data?.orderDetails.recipient.StreetAddress,
                City: data?.orderDetails.recipient.city,
                PhoneNumber: data?.orderDetails.recipient.phone,
                CompanyName: data?.orderDetails.recipient.CompanyName,
                address: data?.orderDetails.recipient.address,
                ZIPCode: data?.orderDetails.recipient.zipCode,
              }}
              // onFinish={onFinish}
            >
              <div style={{ flex: 1, padding: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Form.Item
                    label='First Name'
                    name='FirstName'
                    style={{ width: '45%' }}
                    rules={[{ required: true, message: <FieldDom /> }]}
                  >
                    <Input placeholder='First Name' />
                  </Form.Item>

                  <Form.Item
                    label='Last Name'
                    name='LastName'
                    style={{ width: '45%' }}
                    rules={[{ required: true, message: <FieldDom /> }]}
                  >
                    <Input placeholder='Last Name' name={['name', 'last']} />
                  </Form.Item>
                </div>

                <Form.Item
                  label='Email'
                  name='Email'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                  label='Street Address'
                  name='StreetAddress'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Street Address' />
                </Form.Item>

                <Form.Item
                  label='City'
                  name='City'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='City' />
                </Form.Item>
              </div>

              <div style={{ flex: 1, padding: 30 }}>
                <Form.Item
                  label='Phone Number'
                  name='PhoneNumber'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='email' />
                </Form.Item>

                <Form.Item
                  label='Company Name'
                  name='CompanyName'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Company Name' />
                </Form.Item>

                <Form.Item
                  label='Apt/Suite/Other'
                  name='address'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Apt/Suite/Other' />
                </Form.Item>

                <Form.Item
                  label='ZIP Code'
                  name='ZIPCode'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='ZIP Code' />
                </Form.Item>
              </div>
            </Form>
          </>
        )}
      </CustomizeModal>
    </div>
  )
}

export default DetailsView
