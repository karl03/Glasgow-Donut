import AdminSlider from "./AdminSlider";
import styled from "styled-components";
const AdminSliderWrapper = styled.div`
  width: calc(100% - 20px);
  align-items: center;
  padding: 10px;
  margin: 0 10px 10px 10px;
  box-sizing: border-box;
  background-color: #eeeeee;
`;
const Title = styled.h2`
  text-align: center;
  margin: 10px;
`;

export default function AdminSliderGroup({sliders, eventHandler, groupID}){
  return (
    <AdminSliderWrapper>
      <Title>Group {groupID}</Title>
      {
        sliders.map((slider) => (
          <AdminSlider
            eventHandler={eventHandler} //This index should probably be some unique id so it's easier to delete elements
            initialValue={slider.Value}
            initialName={slider.Name}
            initialFactor={slider.Factor}
            groupID={groupID}
            key={`AdminSlider${slider.Name},${groupID}`}
          />
        ))
      }
    </AdminSliderWrapper>
  );
};