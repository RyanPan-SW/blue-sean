// TODO:寄件列表
import { enumsOrderStatus } from '@/helper/env'
import { Input, Tabs, Breadcrumb, Popover, Pagination } from 'antd'
import { number } from 'bfj/src/events'
import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const { TabPane } = Tabs

const ordersList = [
  {
    number: 'Tracking number: DC1000000000000000',
    from: 'Brisbane',
    sender: 'George Orwell',
    to: 'Gold Coast',
    addressee: 'Angelina Jolie',
    status: 1,
  },
  {
    number: 'Tracking number: DC1000000000000001',
    from: 'Brisbane',
    sender: 'George Orwell',
    to: 'Gold Coast',
    addressee: 'Angelina Jolie',
    status: 2,
  },
  {
    number: 'Tracking number: DC1000000000000002',
    from: 'Brisbane',
    sender: 'George Orwell',
    to: 'Gold Coast',
    addressee: 'Angelina Jolie',
    status: 3,
  },
  {
    number: 'Tracking number: DC1000000000000003',
    from: 'Brisbane',
    sender: 'George Orwell',
    to: 'Gold Coast',
    addressee: 'Angelina Jolie',
    status: 4,
  },
]
const pageSize = 15

function MyOrder(params) {
  return (
    <div className='order-content'>
      <div className='container'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/account'>My Account</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>My Orders</Breadcrumb.Item>
        </Breadcrumb>

        <div className='order-top'>
          <h2 className='order-title'>My Orders</h2>

          <Input
            className='order-search'
            addonAfter={<span className='order-addoAfter'>Search Orders</span>}
          />
        </div>

        <h4 className='order-subTitle'>Modify or Cancel Pickups</h4>

        <p>
          You can modify a scheduled pickup at any time by changing the pickup date, pickup location
          and receiving location, or you can cancel the pickup. Click a pickup in your list of
          orders to view details and make changes.
        </p>

        <Tabs defaultActiveKey='1'>
          <TabPane tab='Orders' key='1'>
            <div>
              <div>
                {ordersList.map((item, index) => {
                  return (
                    <div className='ordersList'>
                      <div className='list-title'>{item.number}</div>
                      <div className='list-content'>
                        <div className='list-news'>
                          <div className='list-from'>
                            <p>{item.from}</p>
                            <p>{LengthLimit(item.sender, 25)}</p>
                          </div>
                          <div className='list-status'>
                            <div>
                              <i className='list-status-icon'></i>
                              <i className='list-status-icon'></i>
                              <i className='list-status-icon'></i>
                              <i className='list-status-icon'></i>
                              <i className='list-status-icon'></i>
                            </div>
                            <div
                              className={
                                item.status === 1 || item.status === 4 ? 'colorbcbc' : 'color666'
                              }
                            >
                              {enumsOrderStatus[item.status]}
                            </div>
                          </div>
                          <div className='list-to'>
                            <p>{item.to}</p>
                            <p>{LengthLimit(item.addressee, 25)}</p>
                          </div>
                        </div>

                        <Link to="/detailsview" className='list-details'>View Details</Link>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div>
                <Pagination
                  defaultCurrent={1}
                  pageSize={pageSize}
                  total={ordersList.length / pageSize}
                ></Pagination>
              </div>
            </div>
          </TabPane>
          <TabPane tab='Open Orders' key='2'>
            <div className='order-nothing'>
              You have not placed any orders in. <b>Schedule a New Pickup</b>
            </div>
          </TabPane>
          <TabPane tab='Completed orders' key='3'>
            3
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default MyOrder

function LengthLimit(str, number) {
  if (typeof str == 'string') {
    if (str.length > number) {
      return <Popover content={str}>{`${str.substr(0, number)}...`}</Popover>
    } else {
      return str
    }
  } else {
    return ''
  }
}
