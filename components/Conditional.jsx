import React from 'react';

export function Conditional(props) {
  const {condition, children} = props
  if(condition){
    return <>{children}</>
  }
  return null;
}

export function Show(props) {
  const {when, children, testId} = props
  if(testId){
    console.log(`For Show ID:${testId}, "when" condition is ${when}`);
  }
  if(when){
    return <>{children}</>
  }
  return null;
}
export function Hide(props) {
  const {when, children, testId} = props
  if(testId){
    console.log(`For Hide ID:${testId}, "when" condition is ${when}`);
  }
  if(!when){
    return <>{children}</>
  }
  return null;
}

export default Conditional;
