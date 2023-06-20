import styled from "styled-components";
import Button from "./button";
import Input from "./input";
import media from "styled-media-query"

type SearchField = {
  title: string;
}

const SearchStyled = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
  min-width: 100%;
  max-width: 100%;

  ${media.lessThan("medium")`
    flex-direction: column;
    align-items: stretch;
  `}
`

const SearchField = ({
  title
}: SearchField) => {
  return (
    <SearchStyled>
      <Input className="input" />
      <Button className="button"> {title} </Button>
    </SearchStyled>
  )
}

export default SearchField