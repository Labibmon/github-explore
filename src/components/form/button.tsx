import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import { PulseLoader } from "react-spinners"
import media from "styled-media-query"
import { shade } from "polished"
import styled, { css } from "styled-components"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const Button = ({
  children,
  isLoading,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <ButtonStyled {...rest ?? {}} disabled={isLoading}>
      {isLoading ? (
        <PulseLoader size={10} />
      ) : children }
    </ButtonStyled>
  )
}

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

    &:disabled {
      pointer-events: 0;
      cursor: default;
      opacity: .3;
      background: ${theme.colors.black};
    }
  `}
`

export default Button