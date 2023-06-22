import { useState } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import SearchField from "@/components/form/search-field";
import Layout from "@/components/layout";
import { getRepository, getUser } from "@/services/api";
import { Repository, User, UserItem } from "@/shared/githubAPI";
import RepositoryItems from "@/components/repository-items";

type InputType = {
  userName?: string
  dataList: any[]
}

export default function Home() {
  const methods = useForm<InputType>()

  const [data, setData] = useState<UserItem[]>([])
  const [dataSelected, setDataSelected] = useState<UserItem>()
  const [repository, setRepository] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState({
    data: false,
    repository: false,
  })

  const onSubmit: SubmitHandler<InputType> = async (
    data,
  ) => {
    const { userName } = data;
    setIsLoading({ ...isLoading, data: true })
    try {
      const data: User = await getUser(userName);
      setData(data?.items)
      setIsLoading({ ...isLoading, data: false })
      
      if(data?.items?.length > 0) handleClickCard(data.items[0])
    } catch (error) {
      setIsLoading({ ...isLoading, data: false })
      methods.setError("userName", {
        type: "manual",
        message: 'Error',
      });
    }
  };

  const handleClickCard = async (item: UserItem) => {
    if (item.id === dataSelected?.id) {
      setDataSelected(undefined)
    } else {
      setIsLoading({ ...isLoading, repository: true })
      setDataSelected(item);

      try {
        const data: Repository[] = await getRepository(item.login);
        setRepository(data)
        setIsLoading({ ...isLoading, repository: false })
      } catch (error) {
        console.log(error);
        setIsLoading({ ...isLoading, repository: false })
        methods.setError("userName", {
          type: "manual",
          message: 'Error',
        });
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
                isLoading={isLoading.data}
                placeholder="Enter Username"
              />
            </FormProvider>
          </div>
          <RepositoryItems
            data={data} 
            dataSelected={dataSelected}
            repository={repository}
            handleClickCard={handleClickCard}
            isLoading={isLoading.repository}
          />
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
