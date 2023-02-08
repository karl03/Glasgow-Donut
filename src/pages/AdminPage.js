import React from 'react'
import Admin from '../components/Admin'
import DropdownMenu from '../components/InterfaceComponents/DropdownMenu'
import Header from '../components/Header'

const AdminPage = () => {
  return (
    <div>
      <Header title="Admin Page" color="#8fc53a"/>
      <Admin/>
      <DropdownMenu dataArray={[1,2,3]}/>
    </div>
  )
};

export default AdminPage;