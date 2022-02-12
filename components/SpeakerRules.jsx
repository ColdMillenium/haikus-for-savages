import React from 'react';
import {
  Text,
  Box
} from '@chakra-ui/react'
function SpeakerRules() {
  const youCan = <strong>You can</strong>;
  const youCant = <strong>You can{`'`}t</strong>;
  return <Box backgroundColor="white">
    <Box backgroundColor="yellow.300" p={2}>
      <Text fontSize="2xl">{youCan}</Text>
      <Box pl={5}>
        <ul>
          <li><Text>{youCan} only speak using words with one syllable.</Text></li>
          <li>
            <Text>
              {youCan} say any word on your card <strong>AFTER</strong> an
              Audience Player has said that word.
            </Text>
          </li>
        </ul>
      </Box>
      
    </Box>
    
    <Box backgroundColor="black" color="white" p={2}>
      <Text fontSize="2xl">{youCant}</Text>
      <Box pl={5}>
        <ul>
          <li><Text>{youCant} say any word, part of any word, or any form of a word that is on the card (unless someone on your team has already said it out loud).</Text></li>
          <li><Text>{youCant} use getstures/charades</Text></li>
          <li><Text>{youCant} use {`"sounds like"`} or{`"rhymes with"`}.</Text></li>
          <li><Text>{youCant} use initials or abbreviations.</Text></li>
          <li><Text>{youCant} use initials or abbreviations.</Text></li>
        </ul>
      </Box>
    </Box>
    <Text p={2} fontWeight="bold">If it feels like cheating...it{`'`}s probably cheating...</Text>
  </Box>;
}

export default SpeakerRules;
