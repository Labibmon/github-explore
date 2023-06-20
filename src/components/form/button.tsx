import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import media from "styled-media-query"
import { shade } from "polished"
import styled, { css } from "styled-components"

export const ButtonStyled = styled.button`
  ${({ theme }) => css`
    height: 40px;
    background: ${theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${theme.colors.white};
    font-weight: bold;
    transition: background-color 0.2s;
    padding: 0 24px;
    cursor: pointer;

    ${media.lessThan("medium")`
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    `}

    &:hover {
      background: ${shade(0.2, theme.colors.gray)};
    }
  `}
`

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const Button = ({
  children,
  isLoading,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <ButtonStyled {...rest ?? {}}>
      {isLoading ? (
        'Loading'
      ) : children }
    </ButtonStyled>
  )
}

export default Button