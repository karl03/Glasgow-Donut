import React from "react";

export default class ServerResponse extends React.Component{
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      "File": "Loading file..."
    };
    this.LoadedFile = fetch(this.props.url);

    //Wait for file to be loaded
    void async function(){
      this.setState({ //Changes the state (i.e. sets the file's text), which then calls the render function
        "File": await (await this.LoadedFile).text()
      });
    }.bind(this)();
  }
  render(){
    return(
      <div><code>{this.state.File}</code></div>
    );
  }
  componentDidMount(){

  }
  componentWillUnmount(){

  }
};