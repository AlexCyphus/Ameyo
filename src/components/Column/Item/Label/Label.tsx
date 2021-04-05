import React from 'react'; 

interface LabelProps  {
  color: string, 
  display: string | null;
}

class Label extends React.Component<LabelProps> { 
  render(){
    return (
      this.props.display && <span className="dot" style={{backgroundColor: this.props.color}}></span>
    )
  }
} 

export default Label