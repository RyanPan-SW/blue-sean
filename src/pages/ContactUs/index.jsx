import React, { useEffect, useState } from 'react'
import { getConfigContent } from '@/api/config'
import './index.scss'

function ContactUs(props) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    getConfigContent({ code: 'contact_us' }).then((res) => {
      setContent(res.data)
    })
  }, [])

  return (
    <div className='contact-us'>
      <div className='container'>
        <h3 className='contact-title'>Contact Us</h3>

        <div className='contact-content' dangerouslySetInnerHTML={{ __html: content }}></div>
        {/* <p style={{ marginTop: 60 }}>
        PLEASE READ THESE WEB SITE TERMS OF USE CAREFULLY BEFORE USING THIS WEB SITE (THE "WEB
        SITE"). THESE WEB SITE TERMS OF USE (THE "TERMS OF USE") GOVERN YOUR ACCESS TO AND USE OF
        THE WEB SITE. THE WEB SITE IS AVAILABLE FOR YOUR USE ONLY ON THE CONDITION THAT YOU AGREE TO
        THE TERMS OF USE SET FORTH BELOW. IF YOU DO NOT AGREE TO ALL OF THE TERMS OF USE, DO NOT
        ACCESS OR USE THE WEB SITE. BY ACCESSING OR USING THE WEB SITE, YOU AND THE ENTITY YOU ARE
        AUTHORISED TO REPRESENT (HEREINAFTER "YOU" OR "YOUR") SIGNIFY YOUR AGREEMENT TO BE BOUND BY
        THE TERMS OF USE.
      </p> */}
      </div>
    </div>
  )
}

export default ContactUs
