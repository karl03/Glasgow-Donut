import React, {useState} from "react";
import axios from "axios";
import BarChart from "../components/BarChart";
import YoutubeEmbed from "../components/YoutubeAddon";

function HomePage() {
  const [users, setUsers] = useState([]);
  function componentDidMount() {
    axios.get("/graph_test_data.json").then((response) => {
      setUsers(response.data);
      console.log(users);
      
        });
      }
  
  return (

    <div>
    <div style={{ height: "100vh", width: "100wh", display: "flex", alignItems: "center", justifyContent: "center" }}>

      <BarChart />

      {componentDidMount()}
      <br/>
      
    </div>

    <div style={{ height: "100vh", width: "100wh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <YoutubeEmbed embedId="I77B871YOTQ" />
        </div>
        
    </div>
    </div>
    
    
    
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