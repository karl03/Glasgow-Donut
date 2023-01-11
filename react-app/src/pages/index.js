import React, {useState} from "react";
import axios from "axios";
import BarChart from "../components/BarChart";
import Header from "../components/Header";
import YoutubeEmbed from "../components/YoutubeAddon";
import {ImageBg, MainBg} from "./PageElements";
import BackgroundImage from "../images/glasgow_background.jpg"


function HomePage() {
  const [users, setUsers] = useState([]);
  function componentDidMount() {
    axios.get("/graph_test_data.json").then((response) => {
      setUsers(response.data);
      console.log(users);
      
        });
      }
  
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      <MainBg>
        <ImageBg src={BackgroundImage}/>
      </MainBg>
      <Header title="Gallant Donut Graph"/>
      <div style={{height:"100vh", width:"100wh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
        <BarChart />
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

//     <div style={{background: "aquamarine"}}>
//       <div>
//         <h2 style={{ height: "10vh", width: "100wh", display: "flex", alignItems: "center", justifyContent: "center", 'font-size': "80px"}}>
//           Gallant donut graph
//         </h2>
//       </div>
//     <div style={{ height: "100vh", width: "100wh", display: "flex", alignItems: "center", justifyContent: "center" }}>

//       <BarChart />

//       {componentDidMount()}
//       <br/>
      
//     </div>

    // <div style={{ height: "50vh", width: "100wh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    //   <div>
    //     <YoutubeEmbed embedId="I77B871YOTQ" />
    //     </div>
        
    // </div>
//     <div style={{ height: "50vh", width: "100wh", display: "flex", alignItems: "center", justifyContent: "center", margin: "10vh" }}>
//       <p>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet hendrerit neque, ac tempus quam. Phasellus leo urna, porttitor nec scelerisque ac, viverra nec lorem. Quisque vitae iaculis orci, ac rutrum elit. In quam tortor, tempus sed eros sit amet, bibendum pellentesque erat. Vivamus dolor ante, pulvinar sit amet orci sit amet, lobortis efficitur velit. Donec id laoreet lacus. Nam nec lacus ac ligula pellentesque varius eget a tortor. Aliquam vestibulum eleifend tincidunt. Phasellus volutpat congue semper.

// Praesent posuere lectus sem, sit amet eleifend eros laoreet ut. Duis vitae metus in neque convallis egestas et ut velit. Nunc ut sapien porta, luctus neque eget, sodales arcu. Integer eleifend sem a odio maximus, id mollis mauris dapibus. Nulla tellus sapien, egestas vel suscipit nec, varius ut arcu. Cras erat augue, convallis quis nibh id, scelerisque tempor dolor. Praesent sagittis quam justo, a cursus ante pellentesque in. Aliquam hendrerit tempor neque et feugiat. Sed nec purus et elit sagittis sodales. Nam id dictum dui.
//       </p>
//     </div>
//     </div>
    
  
  );
}

export default HomePage

// export default class App extends React.Component {
//   state = {
//     users: [],
//   };
//   componentDidMount() {
//     axios.get("/users.json").then((response) => {
//       this.setState({ users: response.data });
//     });
//   }

//   render() {
//     const { users } = this.state;
//     return (
      // <div>
      //   <ul className="users">
      //     {users.map((user) => (
      //       <li className="user">
      //         <p>
      //           <strong>Name:</strong> {user.name}
      //         </p>
      //         <p>
      //           <strong>Email:</strong> {user.email}
      //         </p>
      //         <p>
      //           <strong>City:</strong> {user.address.city}
      //         </p>
      //       </li>
      //     ))}
      //   </ul>
      // </div>
//     );
//   }
// }