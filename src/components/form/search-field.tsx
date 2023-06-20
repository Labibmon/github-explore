import { FormEvent } from "react"
import styled from "styled-components"
import media from "styled-media-query"
import { useFormContext } from "react-hook-form"
import Button from "./button"
import Input from "./input"

type SearchField = {
  title: string
  name: string
  placeholder?: string
  isLoading?: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const SearchField = ({
  title,
  name,
  onSubmit,
  placeholder,
  isLoading,
}: SearchField) => {
  const { register } = useFormContext()

  return (
    <SearchStyled onSubmit={onSubmit}>
      <Input 
        className="input"
        placeholder={placeholder}
        {...register(name, { required: true })}
      />
      <Button
        className="button"
        type="submit"
        isLoading={isLoading}
      > {title} </Button>
    </SearchStyled>
  )
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

export default SearchField