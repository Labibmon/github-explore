import { InputHTMLAttributes, forwardRef } from "react";
import styled, { css } from "styled-components"
import media from "styled-media-query";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

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

const Input = (props: InputProps) => {
  return <InputStyle {...props} />
}

export default Input