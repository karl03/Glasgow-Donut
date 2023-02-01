import React from "react";
export default function AdminAddData({addedElementHandler}){
  const [exampleState, setExampleState] = React.useState(0);

  const didMount = React.useRef(false);
  React.useEffect(function(){
    if(!didMount.current){
      didMount.current = true;
    }
    else{
      addedElementHandler("ecological", "global", ["Mountain", "River", "Lake", "Forest"][exampleState & 3] + exampleState); //"rude code"
    }
  }, [exampleState, addedElementHandler]);

  return (
    <div>
      <button onClick={()=>{setExampleState(exampleState + 1);}}>Click me</button>
    </div>
  );
};
