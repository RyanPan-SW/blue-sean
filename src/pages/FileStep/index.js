import React, { useState, useEffect } from 'react'
import { getAllCity } from '@/api/fileStep'
import FileStep1 from '@/components/FileStep1'
import FileStep2 from '@/components/FileStep2'
import FileStep3 from '@/components/FileStep3'
import FileStepSuccessful from '@/components/FileStepSuccessful'
import { getConfigContent } from '@/api/config'
import './index.scss'

const code = {
  1: "SRIP", 2: "SRIP", 3: "CT", 4: "PSP",
}

function FileStep(props) {
  const [step, setStep] = useState(1)
  const [cityArray, setCityArray] = useState([])
  const [status, setPayStatus] = useState(null)
  const [message, setMessage] = useState(null)
  const [configContent, setConfigContent] = useState(null)

  useEffect(() => {
    // get all city list
    getAllCity().then((res) => {
      const { code, data } = res
      if (code === '200') {
        setCityArray(data.list)
      }
    })

    setConfigContent(null)
    // get pages config content
    let params = { code: code[step] }
    getConfigContent(params).then(res => {
      const { code, data } = res
      if (code === '200') {
        setConfigContent(data.content)
      } else {
        setConfigContent(null)
      }
    })

  }, [step])


  const getPayOrder = (res) => {
    if (res.code === '200') {
      setPayStatus(true)
      setStep(4)
    } else {
      if (res.code === '201') {
        setStep(4)
        setPayStatus(false)
        setMessage(res.data.msg)
      } else {
        message.error(res.data.msg)
      }
    }
  }

  return (
    <div className='file-step'>
      {([1, 2].includes(step) && configContent) && (
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
