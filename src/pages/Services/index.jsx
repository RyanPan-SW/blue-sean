import React, { useEffect, useState } from 'react'
import housingProperty from '../../asset/services-page.png'
import LegalInvestigation from '../../asset/services-body.png'
import DocumentBusiness from '../../asset/services-legal.png'
import { Link } from 'react-router-dom'
import { getConfigContent } from '@/api/config'
import { Spin } from 'antd'

import './index.scss'

const serverPageContent = {
  housingProperty: { code: 'PSLS' },
  legalInvestigation: { code: 'PBCSR' },
  documentBusiness: { code: 'LDDSOCD' },
}

const Services = (props) => {
  const { id = 'housingProperty' } = props.match.params
  const [data, setContent] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getConfigContent({ code: serverPageContent[id]['code'] })
      .then(({ code, data }) => {
        setLoading(false)
        if (code === '200') {
          setContent(data)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.info(error)
      })
  }, [id])

  return (
    <div className='services-pages'>
      <Spin spinning={loading}>
        <div className='container services-pages-content '>
          <div className='services-pages-title'>{data.title}</div>
          <div
            className='service-ueditor-content clearfix'
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>

          {id === 'documentBusiness' && (
            <>
              <div className='services-or'>or</div>
              <Link to='/filestep/add' className='services-pickup'>
                Schedule a New Pickup
              </Link>
            </>
          )}
        </div>
      </Spin>
    </div>
  )
}

export default Services
