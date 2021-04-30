// TODO:寄件列表
import React, { useState, useEffect } from 'react'
// import { getOrdersList } from '@/api/orders'
import { enumsOrderStatus } from '@/helper/env'
import { Input, Tabs, Breadcrumb, Popover, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import './index.scss'
import CustomizeModal from '@/components/CustomizeModal'
import { getOrdersList, searchOrder } from '@/api/orders'

const { TabPane } = Tabs

function MyOrder(params) {
  const [ordersdata, setOrdersdata] = useState([])
  const [listtotal, setListtotal] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    getOrdersList().then((res) => {
      setOrdersdata(res.data || [])
      setListtotal(res.total || 0)
    })
  }, [])

  const onCancel = () => {
    setVisible(false)
  }

  const onSearchOrders = (value, e) => {
    // console.log(value, 'value', e, 'e')
    searchOrder(value).then((res) => {
      console.log(res)
      if (res.data.length !== 0) {
        setOrdersdata(res.data)
      setListtotal(res.total || 0)
      } else {
        setVisible(true)
      }
    })
  }

  const changePageSize = (page, pageSize) => {
    console.log('object', page, pageSize)
    getOrdersList(page, pageSize).then((res) => {
      setOrdersdata(res.data)
      setListtotal(res.total || 0)
    })
  }

  return (
    <div className='order-content'>
      <div className='container'>
        <Breadcrumb separator='>'>
          <Breadcrumb.Item>
            <Link to='/account'>My Account</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>My Orders</Breadcrumb.Item>
        </Breadcrumb>

        <div className='order-top'>
          <h2 className='order-title'>My Orders</h2>

          <Input.Search
            className='order-search'
            enterButton={<span className='order-addoAfter'>Search Orders</span>}
            onSearch={onSearchOrders}
          />
        </div>

        <h4 className='order-subTitle'>Modify or Cancel Pickups</h4>

        <p>
          You can modify a scheduled pickup at any time by changing the pickup date, pickup location
          and receiving location, or you can cancel the pickup. Click a pickup in your list of
          orders to view details and make changes.
        </p>

        <Tabs defaultActiveKey='1' tabBarStyle={{ color: '#333' }}>
          <TabPane tab='Orders' key='1'>
            <div>
              <div>
                {ordersdata.map((item, index) => {
                  return (
                    <div className='ordersList' key={index}>
                      <div className='list-title'>Tracking number: {item.number}</div>
                      <div className='list-content'>
                        <div className='list-news'>
                          <div className='list-from'>
                            <p>{LengthLimit(item.from, 25)}</p>
                            <p>{LengthLimit(item.senderName, 25)}</p>
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
                            <p>{LengthLimit(item.to, 25)}</p>
                            <p>{LengthLimit(item.addresseeName, 25)}</p>
                          </div>
                        </div>

                        <Link to='/detailsview' className='list-details'>
                          View Details
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
              {listtotal > 15 && (
                <Pagination
                  style={{ textAlign: 'right', paddingTop: 30 }}
                  defaultCurrent={1}
                  // defaultPageSize={15}
                  pageSize={15}
                  total={listtotal}
                  onChange={changePageSize}
                />
              )}
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

      <CustomizeModal visible={visible} cancelText={null} onCancel={onCancel} onOk={onCancel}>
        <div>
          <p>No results were found. Please try other searches.</p>
        </div>
      </CustomizeModal>
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
