import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Table, Tag, Space } from 'antd'
import './index.scss'

function AddressBook(props) {
  const columns = [
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (text, record, index) => {
        console.log('11111111', text, record, index)
        return (
          <div>
            <p>{record.name}</p>
            <p>{record.phone}</p>
            <p>{record.email}</p>
          </div>
        )
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Operate',
      key: 'operate',
      dataIndex: 'operate',
      render: (tags) => (
        <>
          <p>Cancel as default address</p>
          <p>Edit</p>
          <p>Remove</p>
        </>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      name: 'Angelina Jolie',
      phone: '040322931',
      email: 'Jolie@gmail.com',
      address: '1101 S Main St APT 203 Cold Coast',
      operate: 1,
    },
    {
      key: '2',
      name: 'Angelina Jolie',
      phone: '040322931',
      email: 'Jolie@gmail.com',
      address: 'London No. 1 Lake Park',
      operate: 0,
    },
    {
      key: '3',
      name: 'Angelina Jolie',
      phone: '040322931',
      email: 'Jolie@gmail.com',
      address: 'Sidney No. 1 Lake Park',
      operate: 0,
    },
  ]

  return (
    <div style={{ background: '#FFF' }}>
      <div className='container'>
        <div className='address'>
          <Breadcrumb separator='>'>
            <Breadcrumb.Item>
              <Link to='/account'>My Account</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Address Book</Breadcrumb.Item>
          </Breadcrumb>

          <h3 className='address-title'>Address Book</h3>

          <Table
            className='address-table'
            columns={columns}
            dataSource={data}
            footer={() => <div className="table-footer">+ Add a New Address</div>}
          />
        </div>
      </div>
    </div>
  )
}
export default AddressBook
