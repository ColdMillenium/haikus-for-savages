import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import {useRouter} from 'next/router'
import useStore from '../store'
import {useEffect, useRef} from 'react';
import io from "socket.io-client";

function MyApp({ Component, pageProps }) {
  const socket = useRef();
  const username = useStore(state => state.username)
  const connected = useStore(state => state.connected);
  const setSocket = useStore (state => state.setSocket)
  const router = useRouter();
  useEffect(() => {
    if(!connected){
      setSocket(socket);
    }
  },[ connected, setSocket])
  return <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
