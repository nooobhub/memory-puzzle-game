import React from 'react'
import { css } from '@emotion/css'

const Header = () => {
  return (
    <div className={container}>memory-puzzle-game</div>
  )
}

export default Header

const container = css`
    background-color: #18978F;
    padding: 16px 24px;
    color: white;
`;