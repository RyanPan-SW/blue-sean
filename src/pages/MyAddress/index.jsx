import { Breadcrumb } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function AddressBook(props) {
  return (
    <div className='address'>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Link to='/account'>My Account</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Address Book</Breadcrumb.Item>
      </Breadcrumb>

      <h3 className='address-title'>Address Book</h3>
    </div>
  )
}
export default AddressBook
