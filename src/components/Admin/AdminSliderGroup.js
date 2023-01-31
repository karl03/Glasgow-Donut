import AdminSlider from "./AdminSlider";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

const AdminSliderWrapper = styled.div`
  width: calc(100% - 20px);
  align-items: center;
  padding: 10px;
  margin: 0 10px 10px 10px;
  box-sizing: border-box;
  background-color: #8fc53a;
`;
const Title = styled.h2`
  text-align: center;
  margin: 10px;
`;

export default function AdminSliderGroup({sliders, eventHandler, groupID, deleteFunction}){

  return (
    <AdminSliderWrapper>
      <Title>Group {groupID}</Title>
      {
        sliders.map((slider) => (
          <AdminSlider
            eventHandler={eventHandler}
            id = {slider.id = uuidv4()}
            initialValue={slider.Value}
            initialName={slider.Name}
            initialFactor={slider.Factor}
            deleteFunction={deleteFunction}
            groupID={groupID}
            key={`AdminSlider${slider.Name},${groupID}`}
          />
        ))
      }
    </AdminSliderWrapper>
  );
};