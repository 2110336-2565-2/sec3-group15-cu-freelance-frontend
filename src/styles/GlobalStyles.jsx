import React from 'react'
import { Global } from '@emotion/react'
import tw, { css, theme, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
})
const mobileStyles =  css({
  '.mobile-body': {
    ...tw`font-ibm text-mobile-body text-freelance-black-secondary`
  },
  '.mobile-h2' : {
    ...tw`font-ibm text-mobile-h2 text-freelance-black-primary font-semibold`
  }
})

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
    <Global styles={mobileStyles} />
  </>
)

export default GlobalStyles