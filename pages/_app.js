import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import {useRouter} from 'next/router'
import useStore from '../store'
import {useEffect, useRef} from 'react';
import io from "socket.io-client";

function MyApp({ Component, pageProps }) {
  const socket = useRef();
  const username = useStore(state => state.username)
  const setSocket = useStore (state => state.setSocket)
  const router = useRouter();
  useEffect(() => {
    if(username == ""){
      router.push("/")
    }else{
      setSocket(socket);
    }
  },[username])
  return <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
