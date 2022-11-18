import React from 'react'
import { AdminAddData, AdminContainer, AdminDataListing, AdminDonutGraph } from './AdminElements'

const Admin = () => {
  return (
    <AdminContainer>
        <AdminDataListing> 
            <h1>List Data here</h1>
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