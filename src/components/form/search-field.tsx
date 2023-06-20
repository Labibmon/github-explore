import { FormEvent } from "react"
import styled from "styled-components"
import media from "styled-media-query"
import { useFormContext } from "react-hook-form";
import Button from "./button"
import Input from "./input"

type SearchField = {
  title: string
  name: string
  placeholder?: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
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
  title,
  name,
  onSubmit,
  placeholder,
}: SearchField) => {
  const { register } = useFormContext()

  return (
    <SearchStyled onSubmit={onSubmit}>
      <Input className="input" placeholder={placeholder} {...register(name)} />
      <Button className="button" type="submit"> {title} </Button>
    </SearchStyled>
  )
}

export default SearchField