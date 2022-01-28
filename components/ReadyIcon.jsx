import React from 'react';
import {Text ,Button, Box, Flex, Input, Select, Spacer} from '@chakra-ui/react'
import {CheckCircleIcon, SmallCloseIcon, CheckIcon} from '@chakra-ui/icons'
import useStore from '../store.js'
const size = 5;
const boxShadow ="md";
const backgroundColor = "white";
const rounded = 100;

function ReadyIcon({ready}) {
  const {theme} = useStore(store => store)
  if(ready){
    return <CheckCircleIcon 
      boxShadow={boxShadow} 
      h={size} 
      w={size} 
      color={theme.status.ready} 
      backgroundColor={backgroundColor} 
      rounded={rounded}
    />
  }else{
    return <SmallCloseIcon 
      backgroundColor={backgroundColor}
      boxShadow={boxShadow} 
      h={size} 
      w={size} 
      color={theme.status.notReady} 
      rounded={rounded}
    />
  }
}

export default ReadyIcon;
