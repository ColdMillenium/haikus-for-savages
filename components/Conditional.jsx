import React from 'react';

export function Conditional(props) {
  const {condition, children} = props
  if(condition){
    return <>{children}</>
  }
  return null;
}

export function Show(props) {
  const {when, children} = props
  if(when){
    return <>{children}</>
  }
  return null;
}
export function Hide(props) {
  const {when, children} = props
  if(!when){
    return <>{children}</>
  }
  return null;
}
export default Conditional;
