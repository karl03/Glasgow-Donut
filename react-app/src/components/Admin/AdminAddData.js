import React from "react";
export default function AdminAddData({addedElementHandler}){
  const [exampleState, setExampleState] = React.useState(0);

  const didMount = React.useRef(false);
  React.useEffect(function(){
    if(!didMount.current){
      didMount.current = true;
    }
    else{
      addedElementHandler(["Mountain", "River", "Lake", "Forest"][exampleState & 3]); //"rude code"
    }
  }, [exampleState]);

  return (
    <div>
      <button onClick={(event) => {setExampleState(exampleState + 1);}}>Click me</button>
    </div>
  );
};