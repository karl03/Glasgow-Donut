import React from "react";
//import axios from "axios";
import BarChart from "../components/BarChart";
import Header from "../components/Header";
import YoutubeEmbed from "../components/YoutubeAddon";
import {ImageBg, MainBg, ImageBgLower} from "./PageElements";
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
        <div style={{position:"absolute", top:"8vh", right:"8px", textAlign:"right", fontSize:"16px"}}>GLOBAL <br/> RESPONSIBILITIES </div>
        <ImageBg src={BackgroundImage}/>
        <div style={{position:"absolute", bottom:"3vh", right:"8px", textAlign:"right", fontSize:"16px"}}>LOCAL <br/> ASPIRATIONS </div>
        <ImageBgLower src={BackgroundImage}/>
      </MainBg>
      
      
      
      <Header title="Glasgow City Portrait" size="2rem"/>
      <div style={{height:"100vh", width:"100wh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", zIndex:999}}>
        <BarChart data={sliderGroups} size={700}/>
      </div>
    
      <h1>Understanding the Graph</h1>
      <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", padding:"40px" }}>
        <div>
          <YoutubeEmbed embedId="I77B871YOTQ" />
        </div>
        <br/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Commodo nulla  facilisi nullam vehicula ipsum a arcu. Quis lectus nulla at volutpat  diam ut venenatis tellus. Urna nunc id cursus metus aliquam eleifend mi.  Lacus vestibulum sed arcu non odio. Ridiculus mus mauris vitae  ultricies. Viverra vitae congue eu consequat ac felis donec et odio.  Varius quam quisque id diam.
</p>
<p>
Nunc pulvinar sapien et ligula ullamcorper  malesuada proin libero. Integer malesuada nunc vel risus commodo viverra  maecenas. Leo duis ut diam quam nulla porttitor massa. Ultrices  tincidunt arcu non sodales neque sodales ut. Quis commodo odio aenean  sed adipiscing diam donec adipiscing tristique. Vitae auctor eu augue ut  lectus arcu bibendum at varius.
Auctor augue mauris augue neque gravida in fermentum et sollicitudin.  Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing  elit. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo  nulla. Eu tincidunt tortor aliquam nulla facilisi cras fermentum. Ligula  ullamcorper malesuada proin libero nunc consequat interdum varius.  Faucibus in ornare quam viverra. Donec pretium vulputate sapien nec.  Egestas egestas fringilla phasellus faucibus scelerisque eleifend.  Elementum curabitur vitae nunc sed velit dignissim sodales. Volutpat sed  cras ornare arcu dui vivamus arcu felis bibendum.
</p>
<p>
Bibendum ut tristique  et egestas quis. At urna condimentum mattis pellentesque id nibh  tortor. Id diam maecenas ultricies mi eget. Turpis in eu mi bibendum. Et  malesuada fames ac turpis egestas. Proin libero nunc consequat interdum  varius sit amet ma.
        </p>
      </div>
    </div>
  );
}

export default HomePage