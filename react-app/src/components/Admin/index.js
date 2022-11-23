import React from 'react'
import { AdminAddData, AdminContainer, AdminDataListing, AdminDonutGraph } from './AdminElements'

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet"></link>
</head>

const Admin = () => {
  return (
    <AdminContainer>
        <AdminDataListing> 
          <span className="font-link">
              <h1>List Data here</h1>
          </span>
        </AdminDataListing>
        <AdminDonutGraph>
            <h1>Display Donut graph preview here</h1>
        </AdminDonutGraph>
        <AdminAddData>
            <h1>Options for adding new data here</h1>
        </AdminAddData>
    </AdminContainer>
  )
}

export default Admin