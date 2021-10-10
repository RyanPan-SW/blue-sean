import React, { useState, useEffect } from 'react'
import { getAllCity } from '@/api/fileStep'
import FileStep1 from '@/components/FileStep1'
import FileStep2 from '@/components/FileStep2'
import FileStep3 from '@/components/FileStep3'
import FileStepSuccessful from '@/components/FileStepSuccessful'
import { getConfigContent } from '@/api/config'
import './index.scss'

function FileStep(props) {
  const [step, setStep] = useState(1)
  const [cityArray, setCityArray] = useState([])
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState(null)
  const [configContent, setConfigContent] = useState('')

  useEffect(() => {
    // get all city list
    getAllCity().then((res) => {
      const { code, data } = res
      if (code === '200') {
        setCityArray(data.list)
      }
    })

    getConfig()
  })

  const getConfig = () => {
    // get pages config content
    let params = {};
    if (step === 1 || step === 2) {
      params = { code: 'SRIP' }
    } else if (step === 3) {
      params = { code: 'CT' }
    } else if (step === 4) {
      params = { code: 'PSP' }
    }
    getConfigContent(params).then(res => {
      setConfigContent(res.data.content || '')
    })
  }


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
      {![3, 4].includes(step) && (
        <div className='file-notes'>
          <div className='notes-title'>Notes:</div>
          <div dangerouslySetInnerHTML={{ __html: configContent }}></div>
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
            return <FileStepSuccessful setStep={setStep} status={status} message={message} configContent={configContent} />

          default:
            return <></>
        }
      })()}
    </div>
  )
}

export default FileStep
