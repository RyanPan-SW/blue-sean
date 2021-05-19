import { getConfigContent } from '@/api/config'
import React, { useState, useEffect } from 'react'
import './index.scss'

function PrivacyPolicy() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    getConfigContent({ code: 'contact_us' }).then((res) => {
      setContent(res.data)
    })
  }, [])

  return (
    <div className='container'>
      <div className='privacy'>
        <h3 className='privacy-title'>Privacy & Cookie Policy</h3>
        <ul className='privacy-content' dangerouslySetInnerHTML={{ __html: content }}></ul>
      </div>
    </div>
  )
}

export default PrivacyPolicy
