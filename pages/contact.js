import React, { Fragment } from 'react'
import ContactForm from '../components/contact/contact-form'
import Head from 'next/head'

export default function ContactPage() {
  return (
  
     <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Contact me page" />
      </Head>
       <ContactForm />
     </Fragment>

  )
}
