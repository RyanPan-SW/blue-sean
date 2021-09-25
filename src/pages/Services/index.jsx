import React, { useEffect, useState } from 'react'
import housingProperty from '../../asset/services-page.png'
import LegalInvestigation from '../../asset/services-body.png'
import DocumentBusiness from '../../asset/services-legal.png'

import './index.scss'
import { Link } from 'react-router-dom'
import { getConfigContent } from '@/api/config'

const serverPageContent = {
  housingProperty: {
    code: 'PSLS',
    title: 'Property Settlement & Lodgment Services',
    image: housingProperty,
    describe: [
      'Collecting settlement documents from legal professionals or individual request;',
      'Attending settlement for any residential / commercial property & business transactions;',
      'Effecting settlement based on your instructions (we are able to complete stamping endorsements on required settlement documents pursuant to your stamped contract);',
      'Attending to deposit of cheque;',
      'Returning settlement package to you on the same day or the next business day if outside business hour;',
      'And Lodging DNRME forms or requisitions in person or electronically.',
    ],
  },
  legalInvestigation: {
    code: 'PBCSR',
    title: 'Property & Body Corporate Searches & Report',
    image: LegalInvestigation,
    describe: [
      'Residential and Commercial properties conveyancing search services (for any searches on the Lexon’s Searches List);',
      'Farmlands conveyancing search services;',
      'Business and Commercial Conveyancing searches; ',
      'Creditors and borrowers searches;',
      'Commercial leasing searches;',
      'Body Corporate Records and Information searches, including:',
      'Body Corporate Roll Searches;',
      'Information Certificate;',
      'Disclosure Statement;',
      'CMS/BMS and By-Law searches;',
      'Adjudicator searches; ',
      'Certificate of Currency searches;',
      'Historical Titles and Encumbrances; and',
      'Any other relevant searches based on your needs.',
      'Search Reports services management rights business purchases and above (our accurate reports are for your efficiency).',
    ],
  },
  documentBusiness: {
    code: 'LDDSOCD',
    title: 'Property & Body Corporate Searches & Report',
    image: DocumentBusiness,
    describe: [
      'Same day legal documents courier services in Brisbane and Gold Coast (please check our cut-off times before you place order);',
      'Serving court documents personally;',
      'Become A Runner and secure delivery; and ',
      'Notification to you upon delivery completion with recipients’ signatures and verified ID.',
    ],
  },
}

const Services = (props) => {
  const { id = 'housingProperty' } = props.match.params
  const [content, setContent] = useState('')

  useEffect(() => {
    getConfigContent({ code: serverPageContent[id]['code'] }).then((res) => {
      const { code, data } = res
      if (code === '200') {
        setContent(data.content)
      }
    })
  }, [id])

  return (
    <div className='services-pages'>
      <div className='container'>
        <h3>{serverPageContent[id]?.title || ''}</h3>

        <div
          className={
            id === 'legalInvestigation' ? 'legalInvestigation-content' : 'services-content'
          }
        >
          <div className='services-img'>
            <img src={serverPageContent[id]?.image || ''} alt='' />
          </div>

          <ul className='services-list'>
            <li dangerouslySetInnerHTML={{ __html: content }}></li>
            {/* {serverPageContent[id]?.describe.map((item, index) => {
              return <li key={index}>{item}</li>
            })} */}
          </ul>
        </div>

        {id === 'documentBusiness' && (
          <>
            <div className='services-or'>or</div>
            <Link to='/filestep/add' className='services-pickup'>
              Schedule a New Pickup
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Services

// function getQueryVariable(variable) {
//   var query = window.location.search.substring(1)
//   var vars = query.split('&')
//   for (var i = 0; i < vars.length; i++) {
//     var pair = vars[i].split('=')
//     if (pair[0] === variable) {
//       return pair[1]
//     }
//   }
//   return false
// }
