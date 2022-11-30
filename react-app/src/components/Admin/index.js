import React from 'react';
import { AdminAddData, AdminContainer, AdminDataListing, AdminDonutGraph } from './AdminElements';
import AdminSlider from "./AdminSlider";

export default function Admin(){
  return (
    <AdminContainer>
      <AdminDataListing> 
        <h1>List Data here</h1>
        {
          [1, 2, 3, 41, 5].map((e, i) => (
            <AdminSlider value={e} key={"AdminSliders" + i} />
          ))
        }
      </AdminDataListing>
      <AdminDonutGraph>
        <h1>Display Donut graph preview here</h1>
      </AdminDonutGraph>
      <AdminAddData>
        <h1>Options for adding new data here</h1>
      </AdminAddData>
    </AdminContainer>
  );
};