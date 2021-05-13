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
  const [step, setStep] = useState(3)
  const [cityArray, setCityArray] = useState([])
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
            return <FileStep2 recipient={[{}]} cityArray={cityArray} setStep={setStep} />

          case 3:
            return <FileStep3 setStep={setStep} />

          case 4:
            return <FileStepSuccessful setStep={setStep} status={status} />

          default:
            return <></>
        }
      })()}
    </div>
  )
}

export default FileStep
