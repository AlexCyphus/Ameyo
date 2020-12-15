import React from 'react'; // we need this to make JSX compile

type CardProps = {
  color: string,
  display: string
}

const Label = ({ color, display }: CardProps) => 
display ? 
<>
  <span className="dot" style={{backgroundColor: color}}></span>
</>
: 
null

export default Label