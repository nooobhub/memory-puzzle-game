import React from 'react'
import {css} from '@emotion/css'

interface Props {
    text: string,
    onClick: () => void
}

const Button = (props: Props) => {
    return (
        <label className={container} onClick={props.onClick}>{props.text}</label>
    )
}

export default Button

const container = css`
    width: 160px;
    text-align: center;
    padding: 8px 16px;
    margin: 4px;
    background-color: #18978F;
    color: white;

    &:hover{
        background-color: black;
        cursor: pointer;
    }
`;