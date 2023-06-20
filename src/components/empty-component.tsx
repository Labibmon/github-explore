import styled from "styled-components";
import Folder from "./icons/folder";

const EmptyComponentStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`

const EmptyComponent = () => {
  return (
    <EmptyComponentStyled>
      <Folder />
      <h3>No data is displayed</h3>
    </EmptyComponentStyled>
  )
}

export default EmptyComponent;