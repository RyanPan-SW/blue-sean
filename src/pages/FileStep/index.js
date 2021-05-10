import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd'
import userBook from '../../asset/userbook.png'
import deleteIcon from '../../asset/delete.png'
import { getAllCity } from '@/api/fileStep'
import './index.scss'
import FileStep1 from '@/components/FileStep1'
import FileStep2 from '@/components/FileStep2'
import FileStep3 from '@/components/FileStep3'
import FileStepSuccessful from '@/components/FileStepSuccessful'

const messageTitle = 'Please Enter.'

function FileStep(params) {
  const recipient = {
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone Number',
    email: 'Email',
    companyName: 'Company Name',
    address: 'Street Address',
    cityCode: 'City',
    other: 'Apt/Suite/Other',
    zipcode: 'ZIP Code',
    note: 'Note',
  }

  const [cityArray, setCityArray] = useState([])
  const [step, setStep] = useState(1)
  const [recipientArray, setRecipientArray] = useState([recipient])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    getAllCity().then((res) => {
      const { code, data } = res
      if (code === '200') {
        setCityArray(data.list)
      }
    })
  }, [])

  useEffect(() => {}, [step])

  const addNewRecipient = () => {
    const arrayData = recipientArray
    setRecipientArray(arrayData.push(recipient))
  }

  const payNow = () => {
    // payNow().then((res) => {
    //   if (res.code === '200') {
    //     setStatus('successful')
    //   } else {
    //     setStatus('failed')
    //   }
    // })
  }

  return (
    <div className='file-step'>
      {step !== 4 && (
        <div className='file-notes'>
          <div className='notes-title'>Notes:</div>
          <p>这里可以放一些规则说明，比如取消和修改快递的一些规则说明。</p>
          <p>修改的规则：</p>
          <p>取消的规则：</p>
        </div>
      )}

      {(() => {
        switch (step) {
          case 1:
            return <FileStep1 cityArray={cityArray} setStep={setStep} />

          case 2:
            return <FileStep2 recipient={[{}]} cityArray={cityArray} setStep={setStep} />

          case 3:
            return <FileStep3 setStep={setStep} />

          case 4:
            return <FileStepSuccessful setStep={setStep} status={status} />

          default:
            break
        }
      })()}
    </div>
  )
}

export default FileStep
