import React from 'react';
import styled from 'styled-components';


const AdminSliderWrapper = styled.div`
  font-family: Arial;
  background-color: #d2e9af;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  column-gap: 10px;
`;

const TrashIcon = styled.div`
  background-image: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwMDAiIHdpZHRoPSI4NzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjgxLjI5NmwwIC02OC4zNTVxMS45NTMgLTM3LjEwNyAyOS4yOTUgLTYyLjQ5NnQ2NC40NDkgLTI1LjM4OWw5My43NDQgMGwwIC0zMS4yNDhxMCAtMzkuMDYgMjcuMzQyIC02Ni40MDJ0NjYuNDAyIC0yNy4zNDJsMzEyLjQ4IDBxMzkuMDYgMCA2Ni40MDIgMjcuMzQydDI3LjM0MiA2Ni40MDJsMCAzMS4yNDhsOTMuNzQ0IDBxMzcuMTA3IDAgNjQuNDQ5IDI1LjM4OXQyOS4yOTUgNjIuNDk2bDAgNjguMzU1cTAgMjUuMzg5IC0xOC41NTMgNDMuOTQzdC00My45NDMgMTguNTUzbDAgNTMxLjIxNnEwIDUyLjczMSAtMzYuMTMgODguODYydC04OC44NjIgMzYuMTNsLTQ5OS45NjggMHEtNTIuNzMxIDAgLTg4Ljg2MiAtMzYuMTN0LTM2LjEzIC04OC44NjJsMCAtNTMxLjIxNnEtMjUuMzg5IDAgLTQzLjk0MyAtMTguNTUzdC0xOC41NTMgLTQzLjk0M3ptNjIuNDk2IDBsNzQ5Ljk1MiAwbDAgLTYyLjQ5NnEwIC0xMy42NzEgLTguNzg5IC0yMi40NnQtMjIuNDYgLTguNzg5bC02ODcuNDU2IDBxLTEzLjY3MSAwIC0yMi40NiA4Ljc4OXQtOC43ODkgMjIuNDZsMCA2Mi40OTZ6bTYyLjQ5NiA1OTMuNzEycTAgMjUuMzg5IDE4LjU1MyA0My45NDN0NDMuOTQzIDE4LjU1M2w0OTkuOTY4IDBxMjUuMzg5IDAgNDMuOTQzIC0xOC41NTN0MTguNTUzIC00My45NDNsMCAtNTMxLjIxNmwtNjI0Ljk2IDBsMCA1MzEuMjE2em02Mi40OTYgLTMxLjI0OGwwIC00MDYuMjI0cTAgLTEzLjY3MSA4Ljc4OSAtMjIuNDZ0MjIuNDYgLTguNzg5bDYyLjQ5NiAwcTEzLjY3MSAwIDIyLjQ2IDguNzg5dDguNzg5IDIyLjQ2bDAgNDA2LjIyNHEwIDEzLjY3MSAtOC43ODkgMjIuNDZ0LTIyLjQ2IDguNzg5bC02Mi40OTYgMHEtMTMuNjcxIDAgLTIyLjQ2IC04Ljc4OXQtOC43ODkgLTIyLjQ2em0zMS4yNDggMGw2Mi40OTYgMGwwIC00MDYuMjI0bC02Mi40OTYgMGwwIDQwNi4yMjR6bTMxLjI0OCAtNzE4LjcwNGwzNzQuOTc2IDBsMCAtMzEuMjQ4cTAgLTEzLjY3MSAtOC43ODkgLTIyLjQ2dC0yMi40NiAtOC43ODlsLTMxMi40OCAwcS0xMy42NzEgMCAtMjIuNDYgOC43ODl0LTguNzg5IDIyLjQ2bDAgMzEuMjQ4em0xMjQuOTkyIDcxOC43MDRsMCAtNDA2LjIyNHEwIC0xMy42NzEgOC43ODkgLTIyLjQ2dDIyLjQ2IC04Ljc4OWw2Mi40OTYgMHExMy42NzEgMCAyMi40NiA4Ljc4OXQ4Ljc4OSAyMi40NmwwIDQwNi4yMjRxMCAxMy42NzEgLTguNzg5IDIyLjQ2dC0yMi40NiA4Ljc4OWwtNjIuNDk2IDBxLTEzLjY3MSAwIC0yMi40NiAtOC43ODl0LTguNzg5IC0yMi40NnptMzEuMjQ4IDBsNjIuNDk2IDBsMCAtNDA2LjIyNGwtNjIuNDk2IDBsMCA0MDYuMjI0em0xNTYuMjQgMGwwIC00MDYuMjI0cTAgLTEzLjY3MSA4Ljc4OSAtMjIuNDZ0MjIuNDYgLTguNzg5bDYyLjQ5NiAwcTEzLjY3MSAwIDIyLjQ2IDguNzg5dDguNzg5IDIyLjQ2bDAgNDA2LjIyNHEwIDEzLjY3MSAtOC43ODkgMjIuNDZ0LTIyLjQ2IDguNzg5bC02Mi40OTYgMHEtMTMuNjcxIDAgLTIyLjQ2IC04Ljc4OXQtOC43ODkgLTIyLjQ2em0zMS4yNDggMGw2Mi40OTYgMGwwIC00MDYuMjI0bC02Mi40OTYgMGwwIDQwNi4yMjR6Ii8+PC9zdmc+");
  min-width: 30px;
  min-height: 30px;
  width: 30px;
  height: 30px;
  padding: 5px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-origin: content-box;

  &:hover{
    cursor: pointer;
  }
`;

const Left = styled.div`
  flex-grow: 1;
  gap: 20px;
  flex-direction: column;
  display: flex;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
`;

const Bottom = styled.div`
  display: flex;
  flex-grow: column;
`;

const SliderInput = styled.input`
  flex-grow: 1;
`;

const Number = styled.input`
  min-width: 50px;
  width: 50px;
  font-size: 20px;
`;


export default function AdminSlider({changeSliderHandler, ecoOrSoc, gloOrLoc, deleteFunction, editFunction, adjFunction}){
  const [value, setValue] = React.useState(initialValue);
  const [name, /*setName*/] = React.useState(initialName);

  React.useEffect(() => {
    changeSliderHandler(ecoOrSoc, gloOrLoc, name, value);
  }, [value]);
  
  
  return (
    <AdminSliderWrapper>
      <Left>
        <Top>
          <div>{initialName}</div>
          <button onClick={() => editFunction(name, ecoOrSoc, gloOrLoc)}>EDIT</button>
        </Top>
        <Bottom>
          <SliderInput onInput={event => {setValue(event.target.value);}} type="range" step="1" min="0" max="100" value={value} />
          <Number onChange={event => {setValue(Math.max(Math.min(event.target.value, 100), 0));}} type="Number" min="0" max="100" step="1" value={value} />
          <button onClick={() => adjFunction(name, ecoOrSoc, gloOrLoc)}>Edit Adjacent</button>
        </Bottom>
      </Left>
      <TrashIcon onClick={ () => deleteFunction(name, ecoOrSoc, gloOrLoc) }/>
    </AdminSliderWrapper>
  );
};
