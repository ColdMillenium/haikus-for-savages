import React, {useEffect, useState} from 'react';
import {Text ,Button, Box, Flex, Input, Select, Spacer, Center} from '@chakra-ui/react'
import useStore from '../store'



function TurnTransition() {
  const {
    punisher,
    speaker,
    audience,
    punisherReady,
    audienceReady,
    speakerReady,
    mode,
  } = useStore(store => store.room)
  const {username, clientId} = useStore(store => store);
  const [readyPromptHidden, setReadyPromptHidden] = useState(true);
  const [role, setRole ] = useState("Audience");

  useEffect(() =>{
    console.log(clientId, username);
    console.log(speaker.id);
    if(username == speaker.username){
      setRole("Speaker")
    }else if(punisher && punisher.username == username){
      setRole("Punisher")
    }else if(mode !="TEAMS"){
      setRole("Audience");
    }
    console.log(audience,speaker,punisher)
  },[clientId, audience, speaker, punisher, username])
  return <>
    <Center h="100vh" w="100vw">
      <Flex align="center" justify="center" direction="column">
        <Text>You are the {role}</Text>
        <Text>When you're ready to begin, click ready</Text>
        {mode == "COOP"?<>
          <Text>[{speakerReady? "Speaker Ready" : "Speaker Not Ready"}]</Text>
          <Text>[{audienceReady? "Audience Ready" : "Audience Not Ready"}]</Text>
        </>:
        mode == "ROTATE"?<>
          <Text>[{speakerReady? "Speaker Ready" : "Speaker Not Ready"}]</Text>
          <Text>[{audienceReady? "Audience Ready" : "Audience Not Ready"}]</Text>
          <Text>[{punisherReady? "Punisher Ready" : "Punisher Not Ready"}]</Text>
        </>:
        <>
          <Text>[{speakerReady? "Speaker Ready" : "Speaker Not Ready"}]</Text>
          <Text>[{punisherReady? "Punisher Ready" : "Punisher Not Ready"}]</Text>
        </>
        }
        <Text>{audience.ready}</Text>
        <Button>Ready!</Button>
      </Flex>
    </Center>;
  </>
}

export default TurnTransition;
