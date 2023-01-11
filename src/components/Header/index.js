import React from 'react'
import '../DefaultStyles.css'
import { Head } from './HeaderElements'

const Header = ({title, color}) => {
  return (
    <Head style={{background:color}}>
        <h1>{title}</h1>
    </Head>
  )
}

export default Header