import React from 'react';
import useStore from '../store'
import {Box, Flex, Text} from '@chakra-ui/react'
import {Show, Hide} from './Conditional'


function TurnOrder() {
  const {theme, room} = useStore(store => store);
  const {teamA, teamB, turnOrder, turnNum} = useStore(store => store.room);
 
  //TODO: Make util??
  const getTheme = (playerId) =>{
    const hasPlayer = (team, id) => team.players.map(p => p.id).includes(id);
    if(hasPlayer(teamA, playerId)){
      return theme.teamA;
    }if(hasPlayer(teamB, playerId)){
      return theme.teamB;
    }else{
      return theme.default;
    }
  }
  console.log(turnOrder)
  const players = [...turnOrder];
  players.splice(0,1);
  players.splice(0, turnNum - 1);
  console.log("players after splice", players)
  if(players.length > 4){
    players.length = 4;
  }
  console.log("players", players);
  return <Box p={5}>
    <Text m={5} fontSize="2xl" fontWeight="bold">Round's Next Speakers:</Text>
    <Flex>
      {players.map((p,index)=>{
        console.log("turn", p);
        const lastPlayer = index == players.length-1;
        console.log("lastPlayer", lastPlayer);
        return<Flex align="center" key={p.id}>
          <Box 
            p={5}
            pl={10}
            pr={10}
            ml={5}
            mr={5}
            key={p.id} 
            boxShadow="md"
            rounded={5}
            backgroundColor={getTheme(p.id).primary}
          > 
            <Text fontWeight="bold"color={getTheme(p.id).secondary}>
              {p.username}
            </Text>
            
          </Box>
          <Hide when={lastPlayer}>{'=>'}</Hide>
        </Flex>
      })}
    </Flex>
  </Box>
}
export default TurnOrder;
