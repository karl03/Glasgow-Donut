export default function AdminDonutGraph({state}){
  return (
    <div>
      {
        state.map((slider, index) =>{
          return (
            <div key={Math.random()}>{`Name: ${slider.Name}, Value: ${slider.Value}`}</div>
          );
        })
      }
    </div>
  );
};