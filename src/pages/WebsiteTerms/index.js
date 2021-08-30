import { getConfigContent } from '@/api/config'
import React, { useState, useEffect } from 'react'
import './index.scss'

function WebsiteTerms(props) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    getConfigContent({ code: 'WTOU' }).then((res) => {
      setContent(res.data.content)
    })
  }, [])

  return (
    <div className='contranct'>
      <div className='container'>
        <h3 className='title'>Website Terms of Use</h3>

        {/* <ul className='content-ul' dangerouslySetInnerHTML={{ __html: content }}></ul> */}

        <ul>
          <h5><u>DC Global Solutions Website Terms and Conditions</u></h5>
          <br />
          <p>These Terms and Conditions describe the rights and obligations of clients of DC Settlements Pty Ltd (ABN 86 637 002 234) (DC Global Solutions,  the Company, we, us) and govern the use of our Platform or Software (as defined below) by individuals and companies (you, your, DC Global Solutions User, User) to access the Services to facilitate the delivery of documents to an End Recipient. In order to use the Services and the associated Software as listed below, you must read and agree to these Terms and Conditions. By accessing the Platform, receiving any Service supplied by us or installing and utilising any associated Software we provide to enable you to use the Service, you expressly acknowledge and agree to be bound these Terms and Conditions as well as any future amendments, revisions or additions thereto which we will publish from time to time.The Company reserves its right to modify or amend this Terms and Conditions at any time which, unless otherwise provided by us, will take effect immediately upon its posting in our Platform and will be applicable from the date of the posting. Your continued use of the Company’s Service or Software after the posting shall be deemed as your consent to such changes.</p>
          <br />
          <h5>1. SERVICES</h5>
          <br />

          <p> 1.1. We provide delivery technology via a Platform that connects you with crowd-sourced Driver Partners and facilitate the delivery of goods in accordance with the terms of this Terms and Conditions.</p>
          <br />

          <h5>2. RESPONSIBILITIES AND RESTRICTIONS</h5>
          <br />
          <p>2.1. <span className="fwblod">Use of Service and Software.</span> You may only use the Services and Software in the regular course of your business, and not for resale, distribution, leasing, rental, loaning, sales, sublicensing, distribution or otherwise transfer of your use of the Services. Your use of the Services and the Software cannot be transferred to an unauthorised third party, unless otherwise stated in this Terms and Conditions and provided that we agree in writing.</p>
          <p>2.2. <span className="fwblod">DC Global Solutions User Responsibilities.</span> You are solely responsible for all activity that occurs under your accounts. You will:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;be solely responsible for all DC Global Solutions User activity, which must be in accordance with this Terms and Conditions;</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;use commercially reasonable efforts to prevent unauthorized access to, or use of, the Services and notify us promptly of any known unauthorized access or use; and</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp; use the Service only in accordance with applicable laws and regulations, including privacy laws, anti-SPAM laws and work health and safety laws in the relevant jurisdiction.</p>
          <p>(d)&nbsp;&nbsp;&nbsp;&nbsp;Keep secure and confidential your account password or any identification we provide you which allows you access to the Service.</p>
          <p>(e)&nbsp;&nbsp;&nbsp;&nbsp;Only use an access point or 4G or 5G data account (AP), which you are authorised to use.</p>
          <p>(f)&nbsp;&nbsp;&nbsp;&nbsp; Provide us with whatever proof of identity and other information that we may reasonably request.</p>
          <br />
          <h5>2.3. <span className="fwblod">Restrictions.</span> You must not</h5>
          <br />
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;use, or permit the use of, the Service except as expressly authorized under this Terms and Conditions,</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;authorise others to use your User status or assign your DC Global Solutions User account to any third-party without securing our consent,</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;interfere with or disrupt the integrity or performance of the Platform or Software or any third-party application or third-party data or contents contained therein or impair the proper operation of the network,</p>
          <p>(d)&nbsp;&nbsp;&nbsp;&nbsp;disrupt, disable, translate, harm, decompile, or reverse engineer the Service, Software and the Platform,</p>
          <p>(e)&nbsp;&nbsp;&nbsp;&nbsp;copy or distribute the Software or other contents in our Platform without the Company’s written consent,</p>
          <p>(f)&nbsp;&nbsp;&nbsp;&nbsp;introduce or launch in the Software or Platform any Disabling Code or any program which may make multiple server requests per second that unduly burdens the performance of the Service, Platform or Software,</p>
          <p>(g)&nbsp;&nbsp;&nbsp;&nbsp;use the Platform to facilitate the delivery of Unacceptable Items (as defined in clause 20)</p>
          <p>(h)&nbsp;&nbsp;&nbsp;&nbsp;attempt to gain unauthorised access to the Software or Service or its related systems or network, or.</p>
          <p>(i)&nbsp;&nbsp;&nbsp;&nbsp;take any other action with respect to the Services not expressly permitted under this Terms and Conditions.</p>

          <br />
          <h5>3. LICENCE GRANT AND RESTRICTIONS OF DC GLOBAL SOLUTIONS USER</h5>
          <br />

          <p>3.1. We grant you a non-exclusive, non-transferable and revocable licence to access and use the Platform, Software and Service in accordance with this Terms and Conditions and any applicable Order Form.</p>
          <p>3.2. At all times, you must not:</p>
          <p>a.  Modify or make any derivative works based upon the Service or the Software;</p>
          <p>b.  Create internet “links” to the Software or “frame” or “mirror” any Software on any other server or wireless or internet-based device;</p>
          <p>c.  Launch an automated program or script including, but not limited to, web spiders, web crawlers, web robots, web ants, web indexers bots, viruses or worms, or any program which may make multiple server requests per second, or unduly burdens or hinders the operation and/or performance of the Platform, Service or Software.</p>

          <br />
          <h5>4. ACCEPTABLE USE</h5>
          <br />

          <p>4.1. You must not and you will not allow third parties, to use the Services:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp; to generate or facilitate unsolicited bulk commercial email;</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp; to violate, or encourage the violation of, the legal rights of others;</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;for any unlawful, invasive, infringing, defamatory, or fraudulent purpose;</p>
          <p>(d)&nbsp;&nbsp;&nbsp;&nbsp; to intentionally distribute any Disabling Code;</p>
          <p>(e)&nbsp;&nbsp;&nbsp;&nbsp; to interfere with the use of the Platform;</p>
          <p>(f)&nbsp;&nbsp;&nbsp;&nbsp; to alter, disable, interfere with, circumvent or reverse-engineer any aspect of the Platform;</p>
          <p>(g)&nbsp;&nbsp;&nbsp;&nbsp; do anything that leads, or may lead, to a decrease in the value of our intellectual property rights in the platform;</p>
          <p>(h)&nbsp;&nbsp;&nbsp;&nbsp;use or exploit any of the material appearing on the Platform for, or in connection with, any business or enterprise (whether for profit or otherwise), including any business or enterprise that is in competition with us.</p>

          <br />
          <h5>5. ACCESS</h5>
          <br />
          <p>5.1. We will provide access to the Platform to the best of our abilities, however:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;Access to the Platform may be prevented by issues outside of our control; and</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;We accept no responsibility for ongoing access to the Platform.</p>

          <br />
          <h5>6. PRIVACY</h5>
          <br />
          <p>6.1. We maintain the Privacy Policy in compliance with the provisions of the Privacy Act for data that we collect about the users and other individuals.</p>
          <p>6.2   We may offer you the ability to use third-party applications in combination with the Platform. We may allow the third-party providers access to Customer Data as required for the interoperation of such third-party application with the Platform. The use of a third-party application with the Platform may require you to agree to a separate Terms and Conditions with the provider of the third-party application and the Company disclaims any and all liability arising from such Terms and Conditions between you and the third-party providers. Moreover, the Company and its licensors shall neither be liable for your use of third-party applications nor for any contents, products, services or other materials available from such sites or third-party providers.  If you do not want to utilise this, you should notify us in writing or opt out of all marketing communications.</p>

          <br />
          <h5>7. FEES AND PAYMENT</h5>
          <br />

          <p>7.1. You will be charged the cost of the delivery and any surcharges which are determined by the prevailing rates indicated in the Platform at the time of the acceptance of the Order. The rates are subject to changes at the sole discretion of the Company.</p>
          <p>7.2. <span className="fwblod">Fees, Invoicing and Payment.</span>  We will invoice you in accordance with the relevant Service. Unless otherwise stated, fees are due immediately upon your receipt of the invoice. You are responsible for providing us with complete, accurate and up to date billing and contact information.Except as otherwise specified by us or indicated in an Order Form:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;All prices, delivery charges and additional delivery charges, if applicable, will be quoted and paid in Australian Dollars;</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;The prices are inclusive of GST;</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;Payment obligations are non-cancellable; and</p>
          <p>(d)&nbsp;&nbsp;&nbsp;&nbsp;all prices and delivery charges paid are non-refundable unless you comply with our Refund Policy.For integrated DC Global Solutions Users, any fees which the Company may charge you for the Software or Service are due in line with your formal contract.</p>

          <br />
          <h5>7.3. CBD Delivery Surcharge</h5>
          <br />
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;In the event that the delivery location is in the CBD area, the Company shall impose a CBD surcharge for deliveries that either have a pick-up or drop-off location in Brisbane, Melbourne, Perth and Sydney. If both the pick-up and drop-off location are in the CBD, the CBD surcharge will only be charged once.</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;Deliveries ready after 1:00PM in their respective time zone (AEST, AWST, ACST, LHST) will receive a higher CBD surcharge than deliveries with a ready time before 1:00pm.</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;For Bulk Rate Runs, CBD surcharges are capped on 10 CBD deliveries.</p>

          <br />
          <h5>7.4. Wait Time Fee Charges</h5>
          <br />

          <p>(a) Single Delivery</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;i. Wait time charges will apply after the first 10 minutes of the driver arriving and waiting at either the pickup or delivery location.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;ii. A fee of $4.04 (incl. GST) or $3.64 (excl. GST) will be charged for every additional 5 minutes the driver is kept waiting.</p>
          <p>(b) Runs</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;i. Wait time charges will apply after the first 10 minutes of arrival for the first delivery and 1 minute for every subsequent delivery in the run.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;ii. A fee of $4.04 (inc GST) or $3.64 (ex GST) will be charged for every additional 5 minutes the driver is kept waiting.</p>
          <p>7.5. Item Quantity</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;Car Deliveries – If there are more than two (2) items in a delivery, the user will be charged $1.51 inclusive of GST or $1.35 exclusive of GST per additional item.</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;Van Deliveries – If there are more than four (4) items in a delivery, the user will be charged $1.51 inclusive of GST or $1.35 exclusive of GST per additional item.</p>
          <p>7.6. <span className="fwblod">Uncontrollable Events and Extreme Weather Conditions Surcharge.</span> For deliveries that are booked during uncontrollable events including, but not limited to, pandemic, border closure, city lockdowns or extreme weather conditions, the Company in the exercise of its discretion, may impose a surcharge.</p>
          <p>7.7. <span className="fwblod">Refund.</span> The fees previously paid are refundable at the Company’s reasonable discretion. This Refund Policy shall apply only in circumstances where a delivery is late due to a controllable circumstance or if there is no available Driver Partner to make the delivery. Delays in delivery by reason of any uncontrollable circumstance including, but not limited to, Force Majeure events are not refundable. The DC Global Solutions User must escalate any affected deliveries within three (3) Business Days. The Company reserves its right to review and investigate all affected deliveries before a final decision is made. For further information, see our Refund Policy.</p>
          <p>7.8. <span className="fwblod">Overdue Fees.</span> If payment is not received from you by the due date, then at our discretion, we may charge interest at the rate of 1.5% above the then current Reserve Bank of Australia cash rate on the outstanding balance from the date such payment was due until the date paid.</p>
          <p>7.9. <span className="fwblod">Late Deliveries.</span> See Schedule1.</p>
          <p>7.10.  <span className="fwblod">Suspension of Services.</span> Except with respect to any fees disputed in good faith by you, if any fees are thirty (30) or more days overdue, we may, without limiting our other rights and remedies, suspend the provision of Services and your use of the Platform and Software until we are paid in full.</p>
          <p>7.11.  <span className="fwblod">Payment Disputes.</span> If an invoiced amount is disputed in good faith by you, you must notify us immediately in writing and provide sufficient details of the invoice dispute. If you fail to do so, you are deemed to have waived your right to dispute that invoice and the invoice will be deemed payable. Nothing in this clause shall be deemed to waive your obligation to pay any undisputed amounts in accordance with clause 7.2 (Fees, Invoicing and Payment).</p>
          <p>7.12.  <span className="fwblod">Audit Rights.</span> We may to audit your compliance with this Terms and Conditions at any time during the Term. You must cooperate with any reasonable request by us in connection with any proposed audit. If we determine that you have allowed access to the Services other than as permitted under this Terms and Conditions or any Order Form and as a result additional Fees are owed to us, we will invoice you for the additional fees which will be payable pursuant to this Terms and Conditions. The results of any audit shall not limit any other rights or remedies we may have.</p>

          <br />
          <h5>8. PROPRIETARY RIGHTS</h5>
          <br />
          <p>8.1. <span className="fwblod">Company Ownership.</span> Subject to any rights expressly granted to you in the Terms and Conditions, we and our licensors, as applicable, reserve all right, title and interest in and to the Services, Software and Platform, including information presented in any form and intellectual property rights (“Company Intellectual Property”).</p>
          <p>8.2. <span className="fwblod">Customer Ownership</span> and Licenses. As between us and you, you own all rights, title and interest in and to</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;all Customer Data and</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;any information supplied to us by you (“Customer Materials”). You grant to us a non-exclusive, non-transferable, royalty free, non-sub-licensable (except as needed for the provision of Services or as set forth herein) worldwide right to access and use Customer Materials solely to provide the Services to you. No other rights or implied licenses in Customer Materials are granted to the Company other than as expressly set forth herein.</p>
          <p>8.3. <span className="fwblod">Feedback and Derivative Works.</span> you are not required to provide:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;any suggestions, enhancement requests, recommendations or other feedback (“Feedback”) or</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;any ideas, technology, developments, derivative works or other intellectual property (“Derivative Works”) related to the Service, Platform or Software or any test features, services or products to which you are given access. If you do so, you grant us a royalty-free, worldwide, transferable, sublicensable, irrevocable, perpetual license to use, or incorporate into any of its services, any Feedback or Derivative Works. You may only create Derivative Works relating to the Service, Platform or Software or any test features, services or products to which it is given access, with our prior written consent.</p>


          <br />
          <h5>9. CONFIDENTIALITY</h5>
          <br />

          <p>9.1. <span className="fwblod">Definition of Confidential Information.</span> Confidential Information means all confidential information disclosed by a Party (“Discloser”) to the other Party (“Recipient”), whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure. Customer Confidential Information will include, but is not limited to, Customer Data; Company Confidential Information includes, but is not limited to, the Platform, information or technology used in connection with the Services or Software, this Terms and Conditions and all Order Forms; and Confidential Information of each discloser includes Discloser’s non-public business and marketing plans, technology and technical information, product plans and designs, and business processes. Confidential Information does not include any information that</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;is or becomes generally known to the public without breach of any obligation owed to Discloser,</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;was known to Recipient prior to its disclosure by Disclosure without breach of any obligation owed to Discloser,</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;is received from a third party without any obligation of confidentiality, or</p>
          <p>(d)&nbsp;&nbsp;&nbsp;&nbsp;was independently developed by Recipient without reference to or use of Discloser’s Confidential Information.</p>
          <p>9.2. <span className="fwblod">Protection of Confidential Information.</span> Except as otherwise permitted in writing by Discloser, Recipient will</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;use the same degree of care that it uses to protect the confidentiality of its own Confidential Information of like kind (but in no event less than reasonable care) and use Discloser’s Confidential Information only for purposes of this Terms and Conditions, and</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;Recipient will limit access to Confidential Information of Discloser to those of its employees, contractors and agents who need such access for purposes consistent with this Terms and Conditions and who have agreed to confidentiality obligations with Recipient that are no less stringent than those herein. In addition to the foregoing, Recipient may disclose Confidential Information in any due diligence of Recipient in connection with any corporate transaction, provided that such disclosure is made under a binding obligation of confidentiality with terms similar to those herein.</p>
          <p>9.3. <span className="fwblod">Protection of Customer Data.</span> Without limiting the above, we will maintain commercially reasonable administrative, physical, and technical safeguards designed to protect the security and confidentiality of Customer Data. Except:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;in order to provide the Services,</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;to prevent or address service or technical problems in connection with support matters, or</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;as expressly permitted in writing by you,we will not modify Customer Data or disclose Customer Data (unless compelled by law in accordance with Clause 9.4.)</p>
          <p>9.4. <span className="fwblod">Compelled Disclosure.</span> Recipient may disclose Confidential Information of Discloser to the extent required or compelled by law to do so, provided Recipient gives Discloser prior notice of such compelled disclosure (unless notice is prohibited by law) and reasonable assistance, at Discloser’s cost, if Discloser wishes to contest the disclosure. If Recipient is compelled by law to disclose Discloser’s Confidential Information as part of a civil proceeding, and Discloser is not contesting the disclosure, Discloser will reimburse Recipient for its reasonable cost of compiling and providing secure access to such Confidential Information.</p>

          <br />
          <h5>10.  WARRANTIES AND DISCLAIMERS</h5>
          <br />
          <p>10.1.  <span className="fwblod">DC Global Solutions User Warranties.</span>  In addition to the warranties provided in Clause 10.2, you warrant that you are at least 18 years old when entering this Terms and Conditions.</p>
          <p>10.2. <span className="fwblod"> Mutual Warranties.</span> Each Party represents and warrants that</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;it has the legal power to enter into this Terms and Conditions,</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;it will use commercially reasonable efforts through the use of anti-virus protection not to transmit to the other Party any Disabling Code, and</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;it will comply with all applicable laws with respect to its rights and obligations pursuant to this Terms and Conditions</p>
          <p>10.3.  <span className="fwblod">Disclaimers.</span> Except as expressly provided herein we make no warranties of any kind, whether express, implied, statutory or otherwise, and specifically disclaim all implied warranties, including but not limited to any warranties of merchantability, non-infringement or fitness for a particular purpose, to the maximum extent permitted by applicable law.</p>

          <br />
          <h5>11.  INDEMNIFICATION</h5>
          <br />
          <p>11.1.   <span className="fwblod">Indemnification by the Company.</span> We will defend and indemnify you against any claim, demand, suit, or proceeding (“Claim”) made or brought against you by a third party alleging that the provision of the Services infringes the intellectual property rights of a third party; provided that you</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;promptly give us written notice of the Claim;</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;give us sole control of the defence and settlement of the Claim (provided that we may not settle any Claim without your written approval, which will not be unreasonably withheld or delayed, unless the settlement unconditionally releases you of all liability); and</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;provide to us all reasonable assistance, at our expense.</p>
          <p>11.2.  We have no obligation to indemnify a Claim if it arises from:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;Customer Data or Customer Materials; or</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;unauthorized modification or use of the Services; or otherwise relating to your acts or omissions not in accordance with, or in breach of, the terms of this Terms and Conditions.</p>
          <p>11.3.  <span className="fwblod">Indemnification by Customer.</span> You will defend and indemnify us against any Claim made or brought against us by a third party</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;relating to or arising from your use, or your authorised DC Global Solutions Users’ use of the Services, Platform or Software in breach of this Terms and Conditions,</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;relating to or arising from our permitted use of Customer Data or Customer Materials, including a third party alleging that the Customer Data or Customer Materials infringes or misappropriates the intellectual property rights of a third party;</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;relating to an injury, illness or death to an authorised DC Global Solutions User or third party;</p>
          <p>(d)&nbsp;&nbsp;&nbsp;&nbsp;relating to the damage to the property of an authorised DC Global Solutions User or third party; or</p>
          <p>(e)&nbsp;&nbsp;&nbsp;&nbsp;caused by your actual or alleged breach of laws, including penalty imposed by a competent authority,</p>
          <p>provided that we</p>
          <p>(f)&nbsp;&nbsp;&nbsp;&nbsp;promptly give you written notice of the Claim;</p>
          <p>(g)&nbsp;&nbsp;&nbsp;&nbsp;give you sole control of the defence and settlement of the Claim (provided that you may not settle any Claim without our written approval, which will not be unreasonably withheld or delayed, unless the settlement unconditionally releases us of all liability); and</p>
          <p>(h)&nbsp;&nbsp;&nbsp;&nbsp;provide to you all reasonable assistance, at your expense.</p>
          <p>11.4.  <span className="fwblod">Exclusive Remedy.</span> This Clause 11 is the indemnifying Party’s sole liability to, and the indemnified Party’s exclusive remedy against, the other Party for any type of Claim described in this clause.</p>

          <br />
          <h5>12.  LIMITATION OF LIABILITY</h5>
          <br />
          <p>12.1. <span className="fwblod"> Limitation of Liability.</span> Except for</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;damages arising from a breach of a party’s confidentiality obligations or</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;a party’s indemnification obligations set forth in this Terms and Conditions, in no event will either party’s aggregate liability arising out of or related to this Terms and Conditions, whether in contract, tort or under any other theory of liability, exceed the total amount paid in the six (6) months period immediately preceding the event giving rise to the liability. The foregoing will not limit DC Global Solutions User’s payment obligations under this Terms and Conditions.</p>
          <p>12.2.  <span className="fwblod">Exclusion of Consequential and Related Damages.</span> In no event will either party have any liability to the other party for any lost profits or revenues or for any indirect, special, incidental, consequential, cover or punitive damages however caused, whether in contract, tort or under any other theory of liability, and whether or not the party has been advised of the possibility of such damages. The foregoing will not apply</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;to a breach of confidentiality obligations or</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;to the extent prohibited by applicable law.</p>

          <br />
          <h5>13.  LIABILITY FOR DOCUMENTS IN TRANSIT</h5>
          <br />

          <p>13.1.  In the event the documents are damaged, lost or stolen during transit directly arising from an act of the Driver Partner, you must immediately notify the Company of the incident by sending a notice to info@dccgs.com.au or by any other reasonable method to immediately reach the Company together with the following details:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;Delivery ID</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;Proof of Damages</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;Accurate explanation of the situation</p>
          <p>(d)&nbsp;&nbsp;&nbsp;&nbsp;Copy of the invoice</p>
          <p>13.2.  Upon receipt of the notice provided in Clause 13.1, the Company will conduct an investigation to determine whether the Driver Partner is at fault. If the Driver Partner is determined to be at fault, the Company will compensate you a reasonable amount, which in no case would exceed $300, that will be credited to your DC Global Solutions User’s Account within seven (7) Business Days.</p>
          <p>13.3. For avoidance of doubt, the Company will not be obligated make credit:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;If the delivery address is incorrect;</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;If the delivery information is incorrect;</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;If the damage was due to an unavoidable weather and environment conditions;</p>
          <p>(d)&nbsp;&nbsp;&nbsp;&nbsp;The documents already had a pre-existing damage;</p>
          <p>(e)&nbsp;&nbsp;&nbsp;&nbsp;You did not properly pack or wrap the documents;</p>
          <p>(f)&nbsp;&nbsp;&nbsp;&nbsp;If the product delivered is considered as an Unacceptable Items; and</p>
          <p>(g)&nbsp;&nbsp;&nbsp;&nbsp;Other analogous circumstances</p>

          <br />
          <h5>14.  DISPUTE RESOLUTION, GOVERNING LAW & NOTICES</h5>
          <br />

          <p>14.1.  <span className="fwblod">Dispute Resolution, Governing Law.</span> The Parties will use reasonable efforts to resolve any dispute between them in good faith prior to initiating legal action. This Terms and Conditions is governed and construed by the laws of Queensland. The parties irrevocably submit to the exclusive jurisdiction of the courts of Queensland, and courts of appeal from them.</p>
          <p>14.2.  <span className="fwblod">Notices.</span> Any notices to be given under this Terms and Conditions must be in writing and signed for and on behalf of the party giving the notice. A notice under this Terms and Conditions is only effective if it is given:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;by hand; or</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;by prepaid mail; or</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;by email.</p>
          <p>to the address of the Party specified in this Terms and Conditions or otherwise specified in writing in accordance with this clause.</p>
          <p>14.3.  <span className="fwblod">Receipt of Notices.</span> A notice sent for the purposes of this clause will be considered received:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;if delivered by hand, before 5.00 pm, on that Business Day;</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;if sent by pre-paid mail, on the third Business Day after posting; or</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;if emailed, the time when the email becomes capable of being retrieved by the addressee at an email address designated by the addressee;except that a delivery by hand, mail or email received after 5:00pm (local time of the receiving Party) will be deemed to be given on the next Business Day.</p>

          <br />
          <h5>15.  CONSUMERS RIGHTS AND REMEDIES</h5>
          <br />
          <p>15.1.  None of the provisions under this Terms and Conditions is to be construed to exclude, restrict or limit any rights a customer has under ACL.</p>
          <p>15.2.  Our services come with guarantees that cannot be excluded under the Australian Consumer Law. For major failures with the service, you are entitled:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;to cancel your service contract with us; and</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;to a refund for the unused portion, or to compensation for its reduced value.</p>
          <p>You are also entitled to be compensated for any other reasonably foreseeable loss or damage. If the failure does not amount to a major failure you are entitled to have problems with the service rectified in a reasonable time and, if this is not done, to cancel your contract and obtain a refund for the unused portion of the contract</p>
          <p>15.3.  To make a consumer claim for warranties against defects, please contact us at info@dccgs.com.au</p>
          <p>We may request further supporting information from you to assist with your claim.</p>
          <p>15.4.  To the fullest extent permitted by law, our liability for failure to comply with any statutory obligations is limited to, at our sole discretion:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;the supplying of the Service again; or</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;the payment of the cost of having the Service supplied again.</p>

          <br />
          <h5>16.  RETURNS AND REDELIVERY</h5>
          <br />

          <p>16.1.  A Driver Partner will log a return or redelivery if any of the following circumstances occur:</p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;If the End Recipient is unavailable at the delivery address and you have marked “authority to leave” (hereafter referred to as ATL), the Driver Partner will reasonably assess if the documents can be left at a safe place within the premises. If so DC Global Solutions is no longer liable for the documents. If the Driver Partner believes in good faith that there is no safe place to leave the documents, the Driver Partner will attempt to contact the End Recipient to verify from the End Recipient where the Driver Partner can leave the documents. After exhausting these options and the End Recipient does not respond or cannot be contacted, a return delivery will be logged via the Company’s Platform and additional return delivery fees will be charged.</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;If the End Recipient is unavailable at the delivery address and you have not marked ATL, the Driver Partner will book a return or redelivery and additional delivery fees will be charged;</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;If the delivery address or any delivery information provided is incorrect;</p>
          <p>(d)&nbsp;&nbsp;&nbsp;&nbsp;If the items for delivery are handed over to a Driver Partner who is not assigned for that specific delivery.</p>
          <p>16.2.  For all the circumstances mentioned in Clause 16.1, the Driver Partner will be instructed to book a return delivery to your pickup location. You will be charged for the cost of the return or redelivery.</p>
          <p>16.3.  In the event that a wrong item is turned over to a Driver Partner at the pick-up point, you will be charged for a full return fee.</p>

          <br />
          <h5>17.  SPECIFIC TERMS RELATED TO DELIVERY</h5>
          <br />
          <p> 17.1.  Nothing in these terms implies that the Company does not provide logistic or courier services, and the Company is not a logistic carrier. It is up to the third-party Driver Partner courier or logistics provider, courier or vehicle operator to offer courier services which may be scheduled through use of the Software or Service.</p>
          <p> 17.2.  The Company may offer and provide the necessary information and method to obtain such third-party courier service but the Company does not nor do we intend to provide courier services or act in any way as a courier and has no liability or responsibility for any courier service provided by a third party.</p>
          <p> 17.3.  For a delivery guarantee of 1,2, 4 hours, same day or less to the location (“Delivery by Time”), it is the DC Global Solutions User’s and End Recipient’s responsibility to be on the location at the time of expected delivery and contactable. Delays at both the pickup and drop off location are always factored into the delivery performance to reflect the accurate measurement.</p>


          <br />
          <h5>18.  API</h5>
          <br />
          <p>18.1.  You may directly integrate your business with us in order to avoid manually logging your deliveries. For more details, you can visit https://www.dccgs.com.au.</p>

          <br />
          <h5>19.  GENERAL PROVISIONS</h5>
          <br />

          <p>19.1.  <span className="fwblod">No Dependence on Future Functionality.</span> You agree that you are not entering into this Terms and Conditions or any Order Form contingent on the provision of any future functionality relating in any way to the Services unless expressly provided in an Order Form and no statement or other information made or provided orally or otherwise shall be binding unless specified in an Order Form.</p>
          <p>19.2.  <span className="fwblod">Force Majeure.</span> Neither Party will be in default for failing to perform any obligation, if the failure is caused solely by events beyond the failing Party’s reasonable control, including without limitation acts of God, civil commotion, strikes, terrorism, pandemics, failure of third-party networks or services or the public Internet, power outages, labour disputes or governmental demands or restrictions.</p>
          <p>19.3.  <span className="fwblod">Relationship of the Parties.</span> The Parties are independent contractors. This Terms and Conditions does not create a partnership, franchise, joint venture, agency, fiduciary or employment relationship between the Parties.</p>
          <p>19.4.  <span className="fwblod">No Third-Party Beneficiaries.</span> There are no third-party beneficiaries to this Terms and Conditions, unless expressly stated otherwise.</p>
          <p>19.5.  <span className="fwblod">Waiver and Cumulative Remedies.</span> No failure or delay by either Party in exercising any right under this Terms and Conditions will constitute a waiver of that right. Other than as expressly stated herein, the remedies provided herein are in addition to, and not exclusive of, any other remedies of a Party at law or in equity.</p>
          <p>19.6.  <span className="fwblod">Severability.</span> If any provision of this Terms and Conditions is held by a court of competent jurisdiction to be contrary to law, the provision will be modified by the court and interpreted so as best to accomplish the objectives of the original provision to the fullest extent permitted by law, and the remaining provisions of this Terms and Conditions will remain in effect.</p>
          <p>19.7.  <span className="fwblod">Assignment.</span> Neither Party may assign any of its rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of the other Party (not to be unreasonably withheld or delayed). Notwithstanding the foregoing, the Company may assign this Terms and Conditions in its entirety (including all Order Forms), without consent of the other Party, to an Affiliate or in connection with a merger, acquisition, corporate reorganization, or sale of all or substantially all of its assets. This Terms and Conditions will bind and insure to the benefit of the Parties.</p>
          <p>19.8.  <span className="fwblod">General.</span></p>
          <p>(a)&nbsp;&nbsp;&nbsp;&nbsp;This Terms and Conditions, including all exhibits and attachments and all Order Forms, constitutes the entire Terms and Conditions between the Parties and supersedes all prior and contemporaneous Terms and Conditions, proposals or representations, written or oral, concerning its subject matter.</p>
          <p>(b)&nbsp;&nbsp;&nbsp;&nbsp;No modification, amendment, or waiver of any provision of this Terms and Conditions or any Order Form will be effective unless in writing and signed by each Party. However, to the extent of any conflict or inconsistency between the provisions in the body of this Terms and Conditions and any exhibit or addendum hereto or any Order Form, the terms of such exhibit, addendum or Order Form will prevail.</p>
          <p>(c)&nbsp;&nbsp;&nbsp;&nbsp;Notwithstanding any language to the contrary therein, no terms or conditions stated in a DC Global Solutions User’s documentation (excluding Order Forms) will be incorporated into or form any part of this Terms and Conditions, and all such terms or conditions will be null and void.</p>
          <p>(d)&nbsp;&nbsp;&nbsp;&nbsp;This Terms and Conditions may be executed in counterparts, each of which, when so executed and delivered (including by electronic execution and transmission), shall be deemed an original, and both of which shall constitute one and the same Terms and Conditions the Parties agree to the terms and conditions of this Terms and Conditions by their signature on the Order Form.</p>

          <br />
          <h5>20.  DEFINITIONS</h5>
          <br />

          <p>Capitalised terms shall have the meanings provided in this or as specified in the body of the Terms and Conditions.</p>
          <p><span className="fwblod">ACL</span> or <span className="fwblod">Australian Consumer Law</span> means the Australian Consumer and Competition and Consumer Act 2010 (Cth).</p>
          <p><span className="fwblod">Terms and Conditions</span> means these Terms of Service, and unless the context requires otherwise, includes all applicable Order Forms, and any addendums, exhibits or attachments to any of the foregoing.</p>
          <p><span className="fwblod">Affiliate</span> means any entity that directly or indirectly controls, is controlled by, or is under common control with the subject entity. Control, for purposes of this definition, means direct or indirect ownership or control of more than 50% of the voting interests of the subject entity. Affiliates of Sherpa include any of its corporate Affiliates which may be specified or otherwise assigned rights or obligations under this Terms and Conditions or any Order Form, addendum, exhibit, attachment or any amendment.</p>
          <p><span className="fwblod">API</span> means application programming interface.</p>
          <p><span className="fwblod">Business Day</span>  means any weekday that is not a public holiday in Queensland.</p>
          <p><span className="fwblod">Customer Data</span> means all electronic data or information submitted either by a DC Global Solution User or End Recipient to the Platform.</p>
          <p><span className="fwblod">Disabling Code</span> means viruses, worms, time bombs, Trojan horses and other harmful or malicious code, files, scripts, agents or programs.</p>
          <p><span className="fwblod">Driver Partner</span> means any licensed driver registered as a common carrier or otherwise engaged in the business as such, who have been accredited by the Company to be part of a pool of drivers who will be delivering the documents from the DC Global Solutions User to an End Recipient.</p>
          <p><span className="fwblod">End Recipient</span> means any customer or client of the DC Global Solutions User</p>
          <p><span className="fwblod">Order</span> means each request or booking made by the DC Global Solutions User to deliver the shipment to the End Recipient, either bulk run, 2-hour delivery, 4-hour delivery or same day delivery, using the Platform or Software.</p>
          <p><span className="fwblod">Order Form</span> means each DC Global Solutions ordering document signed physically or electronically by your duly authorized representative identifies the Services ordered by a Customer from DC Global Solutions, sets forth the prices for the Services, and contains other applicable information terms and conditions.</p>
          <p><span className="fwblod">Platform</span> means, collectively, the online, web- based applications and platform provided by DC Global Solutions as a way for the DC Global Solutions User to access the Services.</p>
          <p><span className="fwblod">Refund Policy</span> is set out in Clause 7.7.</p>
          <p><span className="fwblod">Services</span> means the definition stated in Clause 1.</p>
          <p><span className="fwblod">DC Global Solutions</span> User means a client of the Company, either an individual or a company, that uses the Platform or Software to access the Services for the delivery of shipment to the End Recipient.</p>
          <p><span className="fwblod">SLA</span> means any Service Level Terms and Conditions attached to this Terms and Conditions or an Order Form.</p>
          <p><span className="fwblod">Software</span> means any software on any platform we provided to you in delivering our services.</p>
          <p><span className="fwblod">Unacceptable Items</span> means deliveries containing items that are classified as hazardous materials, dangerous goods, stolen or unlawfully acquired goods, counterfeit goods, animals, bullion, currency, gemstones, weapons, explosives and ammunition, human remains, illegal items, such as ivory, narcotics, or any other item that cannot be sold under the State or Territory jurisdiction of where the delivery takes place.</p>
          <p><span className="fwblod">SCHEDULE 1 – LATE DELIVERY</span></p>
          <p><span className="fwblod"></span>If your delivery takes longer than the requested delivery time beyond reasonable timeframe, we may decide to credit the delivery costs to your account depending on the following criteria:</p>
          <p><span className="fwblod">Please note that we have a different policy for the below types of deliveries:</span></p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;·   CBD deliveries (POSTCODES 2000, 3000, 4000, 6000)</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;·   1 Hour deliveries with a delivery distance of more than 5km</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;·   All deliveries with a delivery distance between 20km-50km</p>
          <p><span className="fwblod">WE DO NOT PROCESS CREDITS FOR:</span></p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;·   Deliveries with a delivery distance over 50km</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;·   Special events and public holidays. (Valentine’s Day, Mother’s Day, Easter, Christmas etc.)</p>


        </ul>
      </div>
    </div>
  )
}

export default WebsiteTerms
