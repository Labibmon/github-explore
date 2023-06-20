import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import SearchField from "@/components/form/search-field";
import Layout from "@/components/layout";
import { getRepository, getUser } from "@/services/api";
import { Repository, User, UserItem } from "@/shared/githubAPI";
import ChevronUp from "@/components/icons/chevron-up";
import ChevronDown from "@/components/icons/chevron-down";
import Star from "@/components/icons/star";
import EmptyComponent from "@/components/empty-component";

type InputType = {
  userName?: string
  dataList: any[]
}

export default function Home() {
  const [data, setData] = useState<UserItem[]>([])
  const [dataSelected, setDataSelected] = useState<UserItem>()
  const [repository, setRepository] = useState<Repository[]>([])
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

  const handleClickCard = async (item: UserItem) => {
    if (item.id === dataSelected?.id) {
      setDataSelected(undefined)
    } else {
      setDataSelected(item);

      try {
        const data: Repository[] = await getRepository(item.login);
        setRepository(data)
      } catch (error) {
        console.log(error);

        // setError("userName", {
        //   type: "manual",
        //   message: error.toJSON().message,
        // });
      }
    }
  }

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
                placeholder="Enter Username"
              />
            </FormProvider>
          </div>
          <CardListContainer>
            {data.length > 0 ? data.map((data, index) => (
              <CardList key={index}>
                <div className="header" onClick={() => handleClickCard(data)}>
                  <Image
                    width="60"
                    height="60"
                    src={data.avatar_url}
                    alt={data.login}
                    title={data.login}
                    aria-label={data.login}
                  />
                  <h3>{data.login}</h3>
                  {dataSelected?.id !== data.id ?
                    <ChevronDown />
                    :
                    <ChevronUp />
                  }
                </div>
                {dataSelected?.id === data.id ?
                  <div className="details">
                    {repository.map((data: Repository, index: number) => (
                      <div key={index} className="list-detail">
                        <h4>{data.name} <span>{data.stargazers_count} <Star /></span></h4>
                        <p>{data.description}</p>
                      </div>
                    ))}
                  </div>
                  : <></>}
              </CardList>
            )) : <EmptyComponent />}
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

  > div > .header {
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
  background-color: ${({ theme }) => theme.colors.gray};
  padding: calc(4px + 0.4vh) calc(4px + 0.4vw);

`

const CardList = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 2px 5px 10px rgb(0,0,0, 0.1);
  
  h3{
    margin: 0;
    white-space: nowrap; 
    width: calc(100% - (((4px + 0.4vw) * 2) + 2px + 60px + 60px)); 
    overflow: hidden;
    text-overflow: ellipsis; 
  }

  > div.header {
    padding: calc(4px + 0.4vh) calc(4px + 0.4vw);
    display: flex;
    align-items: center;
    gap: 30px;
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.white};
  }

  > div.details{
    padding: calc(4px + 0.4vh) calc(4px + 0.4vw);
    background-color: ${({ theme }) => theme.colors.gray};
    display: flex;
    flex-direction: column;
    gap: 10px;

    .list-detail{
      padding: calc(8px + 0.8vh) calc(8px + 0.8vw);
      background-color: ${({ theme }) => theme.colors.white};

      h4 {
        margin: 0;
        display: flex;
        justify-content: space-between;
        gap: 10px;
        font-size: 18px;
        margin-bottom: 8px;
      }

      p {
        margin: 0;
      }
    }
  }

  &:hover {
    > div.header {
      border: 2px solid ${({ theme }) => theme.colors.gray};
    }
  }
`
