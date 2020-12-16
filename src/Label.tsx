import { render } from '@testing-library/react';
import React from 'react'; // we need this to make JSX compile

interface LabelProps  {
  color: string,
  display: string
}

//({ color, display="yes" }: CardProps)

class Label extends React.Component<LabelProps> { 
  render(){
    return (
      this.props.display ? 
      <>
        <span className="dot" style={{backgroundColor: this.props.color}}></span>
      </>
      : 
      null
    )
  }
} 

export default Label