import type { NextPage } from 'next'
import Head from 'next/head'

const HomePage: NextPage = () => {
  return (
    <div style={{ padding: '0 2rem' }}>
      <Head>
        <title>Letsy</title>
        <meta name="description" content="Analyze your investment options." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{
        minHeight: '100vh',
        padding: '4rem 0',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1 style={{
          margin: 0,
          lineHeight: 1.15,
          fontSize: '4rem',
          textAlign: 'center',
        }}>
          Welcome to Letsy!
        </h1>
      </main>
      <footer style={{
        display: 'flex',
        flex: '1',
        padding: '2rem 0',
        borderTop: '1px solid #eaeaea',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <a
          href="https://github.com/mrverdant13/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by @mrverdant13
        </a>
      </footer>
    </div>
  )
}

export default HomePage;
