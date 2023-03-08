import AdminSlider from "./AdminSlider";
import styled from "styled-components";

const AdminSliderWrapper = styled.div`
  width: calc(100% - 20px);
  align-items: center;
  padding: 10px;
  padding-top: 0px;
  margin: 0 10px 10px 10px;
  box-sizing: border-box;
  background-color: #8fc53a;
  border-radius: 10px;
`;
const Title = styled.h3`
  text-align: center;
  margin: 10px;
`;

export default function AdminSliderGroup({
  sliders,
  sliderGroups,
  changeSliderHandler,
  ecoOrSoc,
  gloOrLoc,
  deleteFunction,
  editFunction,
  newFunction,
  adjFunction})
  {

  return (
    <AdminSliderWrapper>
      <Title>{ecoOrSoc === "ecological" ? "Ecological" : "Social"} - {gloOrLoc === "global" ? "Global" : "Local"}</Title>
      <button onClick={() => newFunction(ecoOrSoc, gloOrLoc)}>+</button>
      {
        (function(){
          const Elements = [];
          for(const [SliderName, SliderInfo] of Object.entries(sliders)){
            Elements.push(
              <AdminSlider
                changeSliderHandler={changeSliderHandler}
                initialValue={SliderInfo.value}
                initialName={SliderName}
                sliderGroups={sliderGroups}
                ecoOrSoc={ecoOrSoc}
                gloOrLoc={gloOrLoc}
                deleteFunction={deleteFunction}
                editFunction={editFunction}
                adjFunction={adjFunction}
                key={`AdminSlider${SliderName},${ecoOrSoc},${gloOrLoc}`}
              />
            );
          }
          return Elements;
        })()
      }
    </AdminSliderWrapper>
  );
};
