import { getConfigContent } from '@/api/config'
import React, { useState, useEffect } from 'react'
import './index.scss'

function WebsiteTerms(props) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    getConfigContent({ code: 'contact_us' }).then((res) => {
      setContent(res.data)
    })
  }, [])

  return (
    <div className='contranct'>
      <div className='container'>
        <h4 className='title'>Website Terms of Use</h4>

        <ul className='content-ul' dangerouslySetInnerHTML={{ __html: content }}></ul>
      </div>
    </div>
  )
}

export default WebsiteTerms
