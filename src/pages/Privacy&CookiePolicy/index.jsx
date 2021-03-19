import React from 'react'
import './index.scss'

const content = (
  <>
    <p>
      This Privacy & Cookie Policy of Dictionary.com, LLC (“Dictionary,” “we,” “us,” or “our”)
      describes our practices concerning the personal information collected through our websites,
      including Dictionary.com and Thesaurus.com (the “Sites”) and any related Dictionary products
      and services including the Dictionary.com mobile app available here, the Grammar Coach tool
      available here, and Dictionary Academy Tutors available here (provision of the Sites and
      related products and services, collectively the “Services.”). It explains how cookies, web
      beacons, pixel tags, clear gifs, and other similar files or technologies may be used to
      collect and store the information automatically collected about your computer, device, and
      Service usage and how you can control the use of these technologies.
    </p>
    <br />
    <p>
      If you do not accept the use of cookies, please disable them as described in the Cookie
      Controls.
    </p>
    <br />
    <p>
      This Privacy & Cookie Policy of Dictionary.com, LLC (“Dictionary,” “we,” “us,” or “our”)
      describes our practices concerning the personal information collected through our websites,
      including Dictionary.com and Thesaurus.com (the “Sites”) and any related Dictionary products
      and services including the Dictionary.com mobile app available here, the Grammar Coach tool
      available here, and Dictionary Academy Tutors available here (provision of the Sites and
      related products and services, collectively the “Services.”). It explains how cookies, web
      beacons, pixel tags, clear gifs, and other similar files or technologies may be used to
      collect and store the information automatically collected about your computer, device, and
      Service usage and how you can control the use of these technologies.
    </p>
    <p>
      If you do not accept the use of cookies, please disable them as described in the Cookie
      Controls.
    </p>
  </>
)
function PrivacyPolicy() {
  return (
    <div className='container'>
      <div className='privacy'>
        <h3 className='privacy-title'>Privacy Policy</h3>
        <div className="privacy-content">{content}</div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
