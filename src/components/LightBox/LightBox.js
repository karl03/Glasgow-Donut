import React from 'react'

export default function LightBox() {
  const [LightBoxStyle,SetActive] = React.useState(hidden)
  return (

      // lightbox.classList.add('active')
      // const heading = document.createElement('h1')
      // const img = document.createElement('img');
      // img.src = Event.target.href.baseVal;
      // heading.innerText = ElementProperties.Name;
      // lightbox.appendChild(heading)
      // lightbox.appendChild(img)
  //     });

  <div id={LightboxStyle}>
    <h1>{ElementProperties.Name}</h1>
    <img src={Event.target.href.baseVal}/>
  </div>

    )
  }