import { InputHTMLAttributes, forwardRef } from "react"
import styled, { css } from "styled-components"
import media from "styled-media-query"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <InputStyle ref={ref} {...props} />
});

const InputStyle = styled.input<InputProps>`
  width: 20%;
  padding: 0 24px;
  border: 0;
  border-radius: 0;
  border: 1px solid ${({ theme }) => theme.colors.black};

  &:focus {
    outline: 0;
  }

  ${({ hasError, theme }) => hasError
    && css`
      border: 2px solid ${theme.colors.error};
    `};

  ${media.lessThan("medium")`
    flex: unset;
    height: 40px;
    width: calc(100% - (25px * 2));
  `}
`

export default Input