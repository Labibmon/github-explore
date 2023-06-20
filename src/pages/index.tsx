import Button from "@/components/form/button";
import Input from "@/components/form/input";
import SearchField from "@/components/form/search-field";
import Layout from "@/components/layout";
import styled from "styled-components";

const Container = styled.section`
  position: relative;
  box-shadow: 2px 10px 20px rgb(0,0,0, 0.1);
  border-radius: 4px;
  width: 100%;
  max-width: 1100px;
  margin-top: calc(27.5px + 2.75vh);
  height: calc(100vh - 95px);
  color: ${({ theme }) => theme.colors.black};

  > div{
    padding: calc(16px + 1.6vh) calc(12px + 1.2vw);
  }

  .header {
    margin-bottom: 24px;
  }

  .title {
    margin: 0 0 24px 0;
    font-size: 36px;
  }

  @media only screen and (max-width: 767px) {
    margin: 0;
    height: 100vh!important;
  }
`;

export default function Home() {
  return (
    <Layout>
      <Container>
        <div>
          <div className="header">
            <h2 className="title">Explore Github Repositories</h2>
            <SearchField title="Search" />
          </div>
          <div>
            bodyy
          </div>
        </div>
      </Container>
    </Layout>
  )
}
