import Image from "next/image"
import styled from "styled-components"
import ChevronDown from "./icons/chevron-down"
import ChevronUp from "./icons/chevron-up"
import { PulseLoader } from "react-spinners"
import { Repository, UserItem } from "@/shared/githubAPI"
import Star from "./icons/star"
import EmptyComponent from "./empty-component"

interface RepositoryItems {
  data: UserItem[]
  dataSelected?: UserItem
  repository: Repository[]
  handleClickCard: (item: UserItem) => Promise<void>
  isLoading: boolean
}

const RepositoryItems = ({
  data,
  dataSelected,
  repository,
  handleClickCard,
  isLoading,
}: RepositoryItems) => {
  return (
    <CardListContainer>
      {data.length > 0 ? data.map((data: any, index: number) => (
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
              {isLoading ?
                <PulseLoader size={10} />
                : repository.length > 0 ? repository.map((data: Repository, index: number) => (
                  <div key={index} className="list-detail">
                    <h4>{data.name} <span>{data.stargazers_count} <Star /></span></h4>
                    <p>{data.description}</p>
                  </div> 
                )) : "Repository is empty"}
            </div>
            : <></>}
        </CardList>
      )) : <EmptyComponent />}
    </CardListContainer>
  )
}

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

export default RepositoryItems;