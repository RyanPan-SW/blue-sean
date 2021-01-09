import React from 'react'
import servicesPage from '../../../asset/services-page.png'
import servicesbody from '../../../asset/services-body.png'
import serviceslegal from '../../../asset/services-legal.png'

function Services({ type = 1 }) {
  return (
    <div>
      <div className='services'>
        {Number(type) === 1 && (
          <div>
            <h3>Property Settlement & Lodgment Services</h3>

            <div className='services-content'>
              <div className='services-img'>
                <img src={servicesPage} alt='' />
              </div>

              <ul className='services-list'>
                <li>
                  Collecting settlement documents from legal professionals or individual request;
                </li>
                <li>
                  Attending settlement for any residential / commercial property & business
                  transactions;
                </li>
                <li>
                  Effecting settlement based on your instructions (we are able to complete stamping
                  endorsements on required settlement documents pursuant to your stamped contract);
                </li>
                <li>Attending to deposit of cheque;</li>
                <li>
                  Returning settlement package to you on the same day or the next business day if
                  outside business hour;
                </li>
                <li>And Lodging DNRME forms or requisitions in person or electronically.</li>
              </ul>
            </div>
          </div>
        )}

        {Number(type) === 2 && (
          <div>
            <h3>Property & Body Corporate Searches & Report</h3>

            <div className='services-content'>
              <div className='services-img'>
                <img src={servicesbody} alt='' />
              </div>

              <ul className='services-list'>
                <li>
                  Residential and Commercial properties conveyancing search services (for any
                  searches on the Lexon’s Searches List);
                </li>
                <li>Farmlands conveyancing search services;</li>
                <li>Business and Commercial Conveyancing searches; </li>
                <li>Creditors and borrowers searches;</li>
                <li>Commercial leasing searches;</li>
                <li className='noTransform'>
                  Body Corporate Records and Information searches, including:
                </li>
                <li>Body Corporate Roll Searches;</li>
                <li>Information Certificate;</li>
                <li>Disclosure Statement;</li>
                <li>CMS/BMS and By-Law searches;</li>
                <li>Adjudicator searches; </li>
                <li>Certificate of Currency searches;</li>
                <li>Historical Titles and Encumbrances; and</li>
                <li>Any other relevant searches based on your needs.</li>
                <li>
                  Search Reports services management rights business purchases and above (our
                  accurate reports are for your efficiency).
                </li>
              </ul>
            </div>
          </div>
        )}

        {Number(type) === 3 && (
          <div>
            <h3>Legal Documents Deliveries & Services of Court Documents </h3>

            <div className='services-content'>
              <div className='services-img'>
                <img src={serviceslegal} alt='' />
              </div>

              <ul className='services-list'>
                <li>
                  Same day legal documents courier services in Brisbane and Gold Coast (please check
                  our cut-off times before you place order);
                </li>
                <li>Serving court documents personally;</li>
                <li>Prompt and secure delivery; and </li>
                <li>
                  Notification to you upon delivery completion with recipients’ signatures and
                  verified ID.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Services)
