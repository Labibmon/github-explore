import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import SearchField from "@/components/form/search-field";
import Layout from "@/components/layout";
import { getUser } from "@/services/api";
import styled from "styled-components";
import { useState } from "react";
import { User, UserItem } from "@/shared/githubAPI";
import Image from "next/image";

type InputType = {
  userName?: string
  dataList: any[]
}

export default function Home() {
  const [data, setData] = useState<UserItem[]>([])
  const methods = useForm<InputType>()

  const onSubmit: SubmitHandler<InputType> = async (
    data,
  ) => {
    const { userName } = data;
    try {
      const data: User = await getUser(userName);
      setData(data.items)
      console.log(data.items);

    } catch (error) {
      console.log(error);

      // setError("userName", {
      //   type: "manual",
      //   message: error.toJSON().message,
      // });
    }
  };

  return (
    <Layout>
      <Container>
        <div>
          <div className="header">
            <FormProvider {...methods}>
              <h2 className="title">Explore Github Repositories</h2>
              <SearchField
                title="Search"
                onSubmit={methods.handleSubmit(onSubmit)}
                name="userName"
              />
            </FormProvider>
          </div>
          <CardListContainer>
            {data ? data.map((data, index) => (
              <CardList key={index}>
                <Image
                  width="60"
                  height="60"
                  src={data.avatar_url}
                  alt={data.login}
                  title={data.login}
                  aria-label={data.login}
                />
                <h3>{data.login}</h3>
              </CardList>
            )) : ''}
          </CardListContainer>
        </div>
      </Container>
    </Layout>
  )
}

const Container = styled.section`
  position: relative;
  box-shadow: 2px 10px 20px rgb(0,0,0, 0.1);
  border-radius: 4px;
  width: 100%;
  max-width: 1100px;
  margin-top: calc(27.5px + 2.75vh);
  min-height: calc(100vh - 95px);
  overflow: auto;
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

  @media only screen and (max-width: 768px) {
    margin: 0;
    height: 100vh!important;
  }
`;

const CardListContainer = styled.div`
  height: calc(100vh - 300px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-shadow: inset 0 10px 75px rgb(0,0,0, 0.1);
  padding: calc(4px + 0.4vh) calc(4px + 0.4vw);

`
  
const CardList = styled.div`
  width: calc(100% - ((4px + 0.4vw) * 2) - 2px);
  padding: calc(4px + 0.4vh) calc(4px + 0.4vw);
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 30px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.white};
  box-shadow: 2px 5px 10px rgb(0,0,0, 0.1);
  
  h3{
    margin: 0;
    white-space: nowrap; 
    width: 100%; 
    overflow: hidden;
    text-overflow: ellipsis; 
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.black};
  }
`
