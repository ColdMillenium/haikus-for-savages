import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Center, Button, Image, Box} from '@chakra-ui/react'
import { useRouter } from 'next/router'


//https://tenor.com/view/smiling-geicos-caveman-3doors-down-let-me-be-myself-song-smirk-gif-20065301
export default function Home() {
  const router = useRouter();
  return (
    <Box className={styles.container}>
      <Head>
        <title>Haikus For Savages</title>
        <meta name="description" content="Created by ColdMillenium Productions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Haikus for Savages!
        </h1>
        <Center  boxSize='sm'>
          <Image 
            alt="the caveman you always needed"
            background="white" 
            height={300} 
            width={300} 
            rounded={300}
            src='https://c.tenor.com/16NyC3oOWT4AAAAi/smiling-geicos-caveman.gif' 
          />
        </Center>
        <Button 
          onClick={()=>router.push("/CreateGame")} 
          width={150} 
          mb={5} 
          mt={50}
        >
          Create Game
        </Button>
        <Button 
          onClick={()=>router.push("/JoinGame")} 
          width={150}
        >
          Join Game
        </Button>
      </main>
    </Box>
  )
}
