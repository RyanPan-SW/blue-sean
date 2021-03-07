// TODO:寄件列表
import { Input, Tabs } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const { TabPane } = Tabs

function MyAccount(params) {
  return (
    <div>
      <div>
        <Link to='/account'>My Account</Link> > My Orders
      </div>

      <div>
        <h2>My Orders</h2>

        <Input.Search />
      </div>

      <h4>Modify or Cancel Pickups</h4>

      <p>
        You can modify a scheduled pickup at any time by changing the pickup date, pickup location
        and receiving location, or you can cancel the pickup. Click a pickup in your list of orders
        to view details and make changes.
      </p>

      <Tabs defaultActiveKey='1'>
        <TabPane tab='Oeder' key='1'>
          ou have not placed any orders in. <b>Schedule a New Pickup</b>
        </TabPane>
        <TabPane tab='Open Orders' key='2'>
          2
        </TabPane>
        <TabPane tab='Completed orders' key='3'>
          3
        </TabPane>
      </Tabs>
    </div>
  )
}
export default MyAccount
