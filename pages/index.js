import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button } from '@chakra-ui/react'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Haikus For Savages</title>
        <meta name="description" content="Created by ColdMillenium Productions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Haikus for Savages!
        </h1>
        <Button width={150} mb={5} mt={50}>Create Game</Button>
        <Button width={150}>Join Game</Button>
      </main>
    </div>
  )
}
