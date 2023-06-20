import Head from "next/head"
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  background-color: ${props => props.theme.main};
`

const Layout = ({
  ...props
}) => {
  return (
    <>
      <Head>
        <title>Github Explorer</title>
        <meta name="description" content="Github Explorer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Main>
        {props.children}
      </Main>
    </>
  )
}

export default Layout;