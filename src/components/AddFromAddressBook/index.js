import React from 'react'
import { Modal, Form, Input, Button, message, Table } from 'antd'
import { addNewAddress, updateAddress } from '@/api/address'
import './index.scss'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

function AddFromAddressBook(props) {
  const { Search } = Input

  const { visible, setVisible, data = [] } = props

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      isDefault: '0',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '3',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '4',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '5',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '6',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '7',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '8',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '9',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '10',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '11',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '12',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '13',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '14',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '15',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '16',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
    {
      key: '17',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      isDefault: '1',
      firstName: 'AA',
      lastName: 'BB',
      phone: '132313123',
      email: '1321312@313.com',
    },
  ]

  const columns = [
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (text, record, index) => {
        return (
          <div className='table-column'>
            <p>
              {`${record.firstName}  ${record.lastName}`}&nbsp;&nbsp;
              {record.isDefault === '0' && <span className='default'>Default</span>}
            </p>
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
      // render: (text, record, index) => {
      //   return (
      //     <div>
      //       <p>{}</p>
      //     </div>
      //   )
      // },
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  }

  return (
    <Modal
      destroyOnClose
      width={1100}
      centered
      title={<br />}
      visible={visible}
      onCancel={() => {
        setVisible(false)
      }}
      closable
      footer={null}
    >
      <div className='form-modal-body'>
        <div className='title-search'>
          <div className='select-from-your-address-book'>Select From Your Address Book</div>
          <Search
            className='search'
            enterButton='Search'
            placeholder=' Search contacts for a person
'
          />
        </div>

        <Table
          rowClassName='table-row'
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10, pageSizeOptions: 10, itemRender: itemRender }}
        />

        <Button className='form-submit'>Submit</Button>
      </div>
    </Modal>
  )
}

export default AddFromAddressBook

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a style={{ display: 'flex', alignItems: 'center' }}>
        <span>Previous</span>
        <LeftOutlined style={{ width: 8, height: 14, marginLeft: 15 }} />
      </a>
    )
  }
  if (type === 'next') {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a style={{ display: 'flex', alignItems: 'center' }}>
        <RightOutlined style={{ width: 8, height: 14, marginRight: 15 }} />
        <span>Next</span>
      </a>
    )
  }
  return originalElement
}
