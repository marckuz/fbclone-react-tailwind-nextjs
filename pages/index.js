import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Feed from '../components/Feeds/Feed'
import Header from '../components/Header/Header'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar/Sidebar'
import Widgets from '../components/Widget/Widgets'

export default function Home({session}) {
  if(!session) return (<Login />);

  return (
    <div className='h-screen bg-gray-100 overflow-hidden'>
      <Head>
        <title>Facebook Clone</title>
      </Head>

      <Header/>

      <main className='flex'>
        {/*Side*/}
        <Sidebar />

        {/*Feeds*/}
        <Feed/>

        {/*right*/}
        <Widgets />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}