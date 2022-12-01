import AdminSlider from "./AdminSlider";
export default function AdminSliderGroup({sliders, eventHandler, groupID}){
  return (
    <div>
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
    </div>
  );
};