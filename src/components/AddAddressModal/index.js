import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Button, message, Select } from 'antd'
import { addNewAddress, updateAddress } from '@/api/address'
import { getAllCity } from '@/api/fileStep'
import { normFile } from '@/helper'

const modalTitle = {
  add: 'Add a New  Address',
  edit: 'Edit Address Entry',
}

function AddressModal(props) {
  const { id, type, visible, form, onCancel, getAddressList } = props
  const [cityarray, setCityarray] = useState([])

  useEffect(() => {
    getAllCity().then((res) => {
      if (res.code === '200') setCityarray(res.data.list)
    })
  }, [])

  const onFinishAddress = (values) => {
    if (type === 'add') {
      addNewAddress(values).then((res) => {
        const { code, data } = res
        if (code !== '200') {
          message.error(res.errmsg)
          return
        } else if (code === '200') {
          message.success(data.msg)
          onCancel(false)
          getAddressList()
        }
      })
    } else if (type === 'edit') {
      const updateValues = form.getFieldsValue()
      updateAddress({ ...updateValues, id }).then((res) => {
        const { code, data } = res
        if (code !== '200') {
          message.error(res.errmsg)
          return
        } else if (code === '200') {
          message.success(data.msg)
          onCancel(false)
          getAddressList()
        }
      })
    }
  }

  return (
    <Modal
      centered
      width={1100}
      title={modalTitle[type]}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout='vertical' onFinish={onFinishAddress}>
        <div className='form-content'>
          <div className='form-column'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item
                label='First Name'
                name='firstName'
                normalize={normFile}
                style={{ width: '45%' }}
                rules={[{ required: true, message: 'Please Enter' }]}
              >
                <Input placeholder='First Name' />
              </Form.Item>

              <Form.Item
                label='Last Name'
                name='lastName'
                style={{ width: '45%' }}
                rules={[{ required: true, message: 'Please Enter' }]}
              >
                <Input placeholder='Last Name' name={['name', 'last']} />
              </Form.Item>
            </div>

            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='Email' />
            </Form.Item>

            <Form.Item
              label='Street Address'
              name='address'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='Street Address' />
            </Form.Item>

            <Form.Item
              label='City'
              name='cityCode'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Select placeholder='Please Select'>
                {cityarray.map((item, index) => {
                  return (
                    <Select.Option key={item.cityCode} value={item.cityCode}>
                      {item.cityName}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>

          <div className='form-column'>
            <Form.Item
              label='Phone Number'
              name='phone'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='email' />
            </Form.Item>

            <Form.Item
              label='Company Name'
              name='companyName'
              // rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='Company Name' />
            </Form.Item>

            <Form.Item
              label='Apt/Suite/Other'
              name='other'
              // rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='Apt/Suite/Other' />
            </Form.Item>

            <Form.Item
              label='ZIP Code'
              name='zipcode'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='ZIP Code' />
            </Form.Item>
          </div>
        </div>

        <Form.Item label='Note' name='note'>
          <Input.TextArea />
        </Form.Item>

        <Form.Item className='form-submit'>
          <Button className='form-submit-button' type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddressModal
