import React, { useState, useEffect } from 'react'
import { getAllCity } from '@/api/fileStep'
import './index.scss'
import FileStep1 from '@/components/FileStep1'
import FileStep2 from '@/components/FileStep2'
import FileStep3 from '@/components/FileStep3'
import FileStepSuccessful from '@/components/FileStepSuccessful'

/* const recipient = {
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
} */

function FileStep(props) {
  const [step, setStep] = useState(1)
  const [cityArray, setCityArray] = useState([])
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getAllCity().then((res) => {
      const { code, data } = res
      if (code === '200') {
        setCityArray(data.list)
      }
    })
  }, [])

  const getPayOrder = (res) => {
    if (res.code === '201') {
      setStep(4)
      setStatus('failed')
      setMessage(res.data.msg)
    } else if (res.code === '200') {
      setStatus('successful')
      setStep(4)
    }
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
            return <FileStep1 cityArray={cityArray} setStep={setStep} history={props.history} />

          case 2:
            return <FileStep2 cityArray={cityArray} setStep={setStep} history={props.history} />

          case 3:
            return <FileStep3 getPayOrder={getPayOrder} setStep={setStep} />

          case 4:
            return <FileStepSuccessful setStep={setStep} status={status} message={message} />

          default:
            return <></>
        }
      })()}
    </div>
  )
}

export default FileStep
