import React from 'react'
import '../DefaultStyles.css'
import { Head } from './HeaderElements'

const Header = ({title, color, size}) => {
  return (
    <Head style={{background:color}}>
        <h1 style={{fontSize: size}}>{title}</h1>
    </Head>
  )
}

export default Header