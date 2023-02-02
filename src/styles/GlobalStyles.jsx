import React from 'react'
import { Global, css } from '@emotion/react'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css`
  @font-face {
    font-family: 'Foo';
    src: url('/path/to/exampleFont.woff') format('woff');
    font-style: normal;
    font-weight: 400;
    /* https://styled-components.com/docs/faqs#how-do-i-fix-flickering-text-after-server-side-rendering */
    font-display: fallback;
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles