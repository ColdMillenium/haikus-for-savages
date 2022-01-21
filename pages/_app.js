import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import {useRouter} from 'next/router'
import useStore from '../store'
import {useEffect, useRef} from 'react';
import io from "socket.io-client";

function MyApp({ Component, pageProps }) {
  const socket = useRef();
  const username = useStore(state => state.username)
  const router = useRouter();
  useEffect(() => {
    if(username == ""){
      router.push("/")
    }else{
      socket.current = io("http://localhost:8000", {
      // socket.current = io("https://hfs-server.herokuapp.com", {
        reconnectionDelayMax: 10000,
        query: {
          auth: "123"
        }
      });
      socket.current.on("socketId", (id) => {
        console.log("my id is : " + id)
      })
    }
  },[username])
  return <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
