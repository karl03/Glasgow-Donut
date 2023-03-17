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
  ChangeSliderHandler,
  ecoOrSoc,
  gloOrLoc,
  DeleteFunction,
  EditFunction,
  NewFunction,
  AdjFunction})
  {

  return (
    <AdminSliderWrapper>
      <Title data-testid="title">{ecoOrSoc === "ecological" ? "Ecological" : "Social"} - {gloOrLoc === "global" ? "Global" : "Local"}</Title>
      <button data-testid="add button" onClick={() => NewFunction(ecoOrSoc, gloOrLoc)}>+</button>
      {
        (function(){
          const elements = [];
          for(const [SliderName, SliderInfo] of Object.entries(sliders)){
            elements.push(
              <AdminSlider
                ChangeSliderHandler={ChangeSliderHandler}
                initialValue={SliderInfo.value}
                initialName={SliderName}
                sliderGroups={sliderGroups}
                ecoOrSoc={ecoOrSoc}
                gloOrLoc={gloOrLoc}
                DeleteFunction={DeleteFunction}
                EditFunction={EditFunction}
                AdjFunction={AdjFunction}
                key={`AdminSlider${SliderName},${ecoOrSoc},${gloOrLoc}`}
              />
            );
          }
          return elements;
        })()
      }
    </AdminSliderWrapper>
  );
};
