import React from 'react';

function Conditional(props) {
  const {condition, children} = props
  if(condition){
    return <>{children}</>
  }
  return null;
}

export default Conditional;
