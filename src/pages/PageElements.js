import styled from 'styled-components'

export const ImageBg = styled.img`
  display:'';
  width:100%;
  height:61%;
  -o-object-fit: cover;
  object-fit: cover;
  background:#232a34;
  object-position:0% 0%;
  opacity:0.5;
  z-index: -2;
`

export const MainBg = styled.div`
  position:absolute;
  top: 0;
  right:0;
  bottom:0;
  left:0;
  width:100%;
  height:100%;
  overflow: hidden;
  z-index: -1;
`