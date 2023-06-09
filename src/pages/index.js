import React from "react";
import BarChart from "../components/BarChart/BarChart";
import YoutubeEmbed from "../components/YoutubeAddon/YoutubeEmbed";
import {ImageBg, MainBg} from "./PageElements";
import BackgroundImage from "../images/background_image.jpg"
import "./index.css";


function HomePage() {
  const [sliderGroups, setSliderGroups] = React.useState({
    ecological: {global: {}, local: {}},
    social: {global: {}, local: {}}
  });
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(function(){
    async function GetData(){
      const loadedData = (await (await fetch("/api/get-data")).json())[0];
      setSliderGroups(loadedData);
      setLoaded(true);
    }
    if(!loaded) GetData();
  }, [loaded]);

  function GetReportFileName() {
    return new Promise((resolve, reject) => {
      fetch(`/api/get-report-filename`)
        .then((response) => response.json())
        .then((data) => {
          const fileName = data;
          resolve(fileName);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }   

  function DownloadReport() {
    GetReportFileName()
      .then((fileName) => {
        fetch(`/api/download-report/${fileName}`)
          .then(response => {
            if (response.ok) {
              return response.blob();
            }
            alert("No Report file");
            throw new Error('Network response was not ok.');
          })
          .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          })
          .catch(error => {
            console.error('There was an error downloading the report:', error);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      
      
      <MainBg>
        <ImageBg src={BackgroundImage}/>
      </MainBg>
      
      <h1 style={{position: "absolute", zIndex: "1000", fontSize: "2rem", top: "0", width: "100%", textAlign: "center"}}>THE GLASGOW DOUGHNUT</h1>
      <div style={{
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        zIndex:999,
        overflow: "hidden",
        width: "100%",
        position: "relative"
      }}>
        <BarChart data={sliderGroups} size={700}/>
      </div>

      <div className="flex-container">

        <li>
          <div className="imageDiv">
            <img src="goal.png" className = "image" alt = "archery target"></img>
          </div>
          <div className="flex-item pStyle headStyle">
            <h1>target</h1>
            <p>taken from an officical existing policy or strategy document (local or national)</p>
          </div>  
        </li>

        <li>
          <div className="imageDiv">
            <img src="speedometer.png" className = "image" alt = "speedometer"></img>
          </div>
          <div className="flex-item pStyle headStyle">
            <h1>indicator</h1>
            <p>Quis lectus nulla at volutpat diam ut venenatis tellus. Urna nunc id</p>
          </div>
        </li>

        <li>
          <div className="imageDiv">
            <img src="happy.png" className = "image" alt = "smiley face"></img>
          </div>
          <div className="flex-item pStyle headStyle">
            <h1>thriving</h1>
            <p>Et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum.</p>
          </div>
        </li>

        <li>
          <div className="imageDiv">
            <img src="group.png" className = "image" alt = "molecule with connections"></img>
          </div>
          <div className="flex-item pStyle headStyle">
            <h1>connections</h1>
            <p>Egestas egestas fringilla phasellus faucibus scelerisque eleifend.</p>
          </div>
        </li>
      </div>

      <div style={{width: "100%", display: "flex", "flexDirection": "row", gap: "15px", justifyContent: "center", padding: "0px", paddingBottom: "1.5%", paddingTop: "1.5%"}}>
        <div style={{"maxWidth": "45%", marginLeft: "10%"}}>
        <h1 className="subtitle">About the Project </h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend, mi eget bibendum facilisis, 
        arcu est scelerisque nisi, non dignissim mauris erat a augue. Donec vulputate odio ut metus luctus congue. 
        Curabitur ligula nisi, varius quis rutrum id, tempor ac urna. Aenean sollicitudin, neque sed feugiat laoreet, 
        libero dui vehicula eros, finibus finibus ipsum urna id tellus. Nulla laoreet sed nisi tincidunt ullamcorper.
        </p>
        </div>
        <div className="SponsorsWrapper" style={{"width": "45%", position: "relative", display: "flex", flexDirection: "row"}}>
          <div style={{aspectRatio: "1093 / 393",
          minWidth: "100%",
          backgroundImage:"url(\"/snip.jpg\")",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat"
        }} />
        </div>
      </div>
      
      <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", backgroundColor: "#e3e3e3", paddingTop: "1.5%" }}>
        <div style={{marginInline:"10%"}}>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Nam bibendum viverra sem, in facilisis ligula fringilla eget. 
          Praesent maximus sed orci quis bibendum. Curabitur eget sodales lorem. 
          Phasellus porta tempor faucibus. Pellentesque interdum nisi ex, luctus imperdiet ante consectetur sit amet. 
          Sed consequat aliquet libero, id efficitur felis dapibus eu. Nunc sem nulla, porttitor vel sagittis lacinia, 
          scelerisque at massa. Nullam sit amet suscipit sapien. Ut lectus orci, iaculis egestas pellentesque non, 
          vulputate tempor leo. Ut vitae metus mollis, ultrices magna vel, tempor augue. Integer euismod arcu lorem, 
          at commodo felis porttitor eget.
          <br/>
          <br/>
          Etiam dictum pretium quam, in tempus libero ullamcorper quis. Praesent sit amet elementum ante. 
          Integer et est ac urna vulputate efficitur eget sit amet nibh. Duis varius augue consequat mauris imperdiet vehicula. 
          Etiam consectetur fringilla lorem, eu mollis libero sodales ut. Sed sapien elit, 
          blandit eu efficitur pretium, semper ut dolor. Vestibulum in est finibus, semper eros quis, aliquet dui. 
          Mauris hendrerit faucibus lacinia. Proin pharetra diam lacus, eu vulputate lectus sagittis a. Phasellus eu justo turpis.
          <br/>
          <br/>
          In sollicitudin orci vitae nisi viverra rhoncus. Integer cursus vel sapien in vulputate. Nulla facilisi. 
          In hac habitasse platea dictumst. In condimentum ultrices felis in congue. 
          Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
          Aliquam commodo interdum metus, a egestas dui aliquam eget. Quisque vel interdum urna. Etiam in blandit diam. 
          Etiam ultrices posuere nunc in rhoncus.
          <br/>
          <br/>
          </p>
          <YoutubeEmbed embedId="I77B871YOTQ" />
          <br/>
          <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. 
          Commodo nulla  facilisi nullam vehicula ipsum a arcu. Quis lectus nulla at volutpat  diam ut venenatis tellus. 
          Urna nunc id cursus metus aliquam eleifend mi.  Lacus vestibulum sed arcu non odio. Ridiculus mus mauris vitae  ultricies. 
          Viverra vitae congue eu consequat ac felis donec et odio.  Varius quam quisque id diam.
          <br/>
          <br/>
          Nunc pulvinar sapien et ligula ullamcorper  malesuada proin libero. Integer malesuada nunc vel risus commodo viverra  maecenas. 
          Leo duis ut diam quam nulla porttitor massa. Ultrices  tincidunt arcu non sodales neque sodales ut. 
          Quis commodo odio aenean  sed adipiscing diam donec adipiscing tristique. 
          Vitae auctor eu augue ut  lectus arcu bibendum at varius.
          <br/>
          <br/>
          Auctor augue mauris augue neque gravida in fermentum et sollicitudin.  
          Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing  elit. 
          Adipiscing elit duis tristique sollicitudin nibh sit amet commodo  nulla. 
          Eu tincidunt tortor aliquam nulla facilisi cras fermentum. 
          Ligula  ullamcorper malesuada proin libero nunc consequat interdum varius. 
          Faucibus in ornare quam viverra. Donec pretium vulputate sapien nec.  
          Egestas egestas fringilla phasellus faucibus scelerisque eleifend.  
          Elementum curabitur vitae nunc sed velit dignissim sodales. Volutpat sed  cras ornare arcu dui vivamus arcu felis bibendum.
          <br/>
          <br/>
          Bibendum ut tristique  et egestas quis. At urna condimentum mattis pellentesque id nibh  tortor. 
          Id diam maecenas ultricies mi eget. Turpis in eu mi bibendum. Et  malesuada fames ac turpis egestas. 
          Proin libero nunc consequat interdum  varius sit amet ma.
                  
        </div>
        <br/>
        <button className="button" onClick={DownloadReport}>Download Report</button>
        <br/>
      </div>
    </div>
  );
}

export default HomePage