import React, {useState} from "react";
import axios from "axios";
import BarChart from "../components/BarChart";

const Home = () => {
  const [users, setUsers] = useState([])
  function componentDidMount() {
    axios.get("/users.json").then((response) => {
      setUsers(response.data);
    });
  }
  return (
    <div>
      <BarChart/>
      {componentDidMount()}
      <ul className="users">
        {users.map((user) => (
          <li className="user">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>City:</strong> {user.address.city}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home

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