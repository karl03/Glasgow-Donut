import React from "react";
//import axios from "axios";
import BarChart from "../components/BarChart";
import Header from "../components/Header";
import YoutubeEmbed from "../components/YoutubeAddon";
import {ImageBg, MainBg} from "./PageElements";
import BackgroundImage from "../images/glasgow_background.jpg"


function HomePage() {
  const [sliderGroups, setSliderGroups] = React.useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(function(){
    async function getData(){
      const LoadedData = (await (await fetch("/api/get-data")).json())[0];
      setSliderGroups(LoadedData);
      setLoaded(true);
    }
    if(!loaded) getData();
  }, [loaded]);

  return (
    
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      <MainBg>
        <ImageBg src={BackgroundImage}/>
      </MainBg>
      <Header title="Gallant Donut Graph" size="2rem"/>
      <div style={{ height:"120vh", width:"100wh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", zIndex:999}}>
        <BarChart data={sliderGroups} size={700}/>
      </div>
    
      <h1>Understanding the Graph</h1>
      <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", padding:"40px" }}>
        <div>
          <YoutubeEmbed embedId="I77B871YOTQ" />
        </div>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet hendrerit neque, ac tempus quam. Phasellus leo urna, porttitor nec scelerisque ac, viverra nec lorem. Quisque vitae iaculis orci, ac rutrum elit. In quam tortor, tempus sed eros sit amet, bibendum pellentesque erat. Vivamus dolor ante, pulvinar sit amet orci sit amet, lobortis efficitur velit. Donec id laoreet lacus. Nam nec lacus ac ligula pellentesque varius eget a tortor. Aliquam vestibulum eleifend tincidunt. Phasellus volutpat congue semper.
        Praesent posuere lectus sem, sit amet eleifend eros laoreet ut. Duis vitae metus in neque convallis egestas et ut velit. Nunc ut sapien porta, luctus neque eget, sodales arcu. Integer eleifend sem a odio maximus, id mollis mauris dapibus. Nulla tellus sapien, egestas vel suscipit nec, varius ut arcu. Cras erat augue, convallis quis nibh id, scelerisque tempor dolor. Praesent sagittis quam justo, a cursus ante pellentesque in. Aliquam hendrerit tempor neque et feugiat. Sed nec purus et elit sagittis sodales. Nam id dictum dui.
        </p>
      </div>
    </div>
  );
}

export default HomePage