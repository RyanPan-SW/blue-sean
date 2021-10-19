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
  const { className = '', id, type, visible, form, onCancel, getAddressList, tablePramas } = props
  const [cityarray, setCityarray] = useState([])

  useEffect(() => {
    getAllCity().then((res) => {
      if (res.code === '200') setCityarray(res.data.list)
    })
  }, [])

  const onFinishAddress = (values) => {
    if (type === 'add') {
      // add new address
      addNewAddress(values).then((res) => {
        const { code,data } = res
        if (code === '200') {
          onCancel(false)
          message.success(data.msg)
          getAddressList(tablePramas)
        }
      })
    } else if (type === 'edit') {
      // edit address
      const updateValues = { addressId: id, ...form.getFieldsValue() }
      updateAddress(updateValues).then((res) => {
        const { code, data } = res
        if (code === '200') {
          message.success(data.msg)
          getAddressList(tablePramas)
          onCancel(false)
        }
      })
    }
  }

  return (
    <Modal
      centered
      maskClosable={false}
      width={1100}
      title={modalTitle[type]}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      className={className}
    >
      <Form form={form} layout='vertical' onFinish={onFinishAddress} validateTrigger="onBlur">
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
                normalize={normFile}
                style={{ width: '45%' }}
                rules={[{ required: true, message: 'Please Enter' }]}
              >
                <Input placeholder='Last Name' name={['name', 'last']} />
              </Form.Item>
            </div>

            <Form.Item
              label='Email'
              name='email'
              normalize={normFile}
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
            >
              <Input placeholder='Email' />
            </Form.Item>

            <Form.Item
              label='Street Address'
              name='address'
              normalize={normFile}
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='Street Address' />
            </Form.Item>

            <Form.Item
              label='City'
              name='cityCode'
              normalize={normFile}
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
              normalize={normFile}
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='email' />
            </Form.Item>

            <Form.Item label='Company Name' normalize={normFile} name='companyName'>
              <Input placeholder='Company Name' />
            </Form.Item>

            <Form.Item label='Apt/Suite/Other' name='other' normalize={normFile}>
              <Input placeholder='Apt/Suite/Other' />
            </Form.Item>

            <Form.Item
              label='ZIP Code'
              name='zipcode'
              normalize={normFile}
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='ZIP Code' />
            </Form.Item>
          </div>
        </div>

        <Form.Item label='Note' name='note' normalize={normFile}>
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
