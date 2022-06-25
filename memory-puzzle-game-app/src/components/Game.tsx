import { css } from '@emotion/css';
import React from 'react'
import Puzzle from './Puzzle';

interface Props {
    stages: number
}

const Game = (props: Props) => {
    const [stage, setStage] = React.useState<number>(0);
    const [size, setSize] = React.useState<number>(5);
    const [score, setScore] = React.useState<number>(0);

    const incrementLevel = () => {setSize(i => i + Math.floor(stage / 2))}
    const incrementStage = () => {setStage(i => i + 1)}
    const incrementScore = (score: number) => setScore(prev => prev + score);

    if (stage === props.stages) {
        return (
            <div className={container}>
                <h2 className={title}>Congrats!</h2>
                <p className={subTitle}>You scored {score} Pts!</p>
            </div>
        )
    }

    return (
        <div className={container}>
            <p className={stageHeader}>Score: {score} Points</p>
            <p className={stageHeader}>Stage: {stage+"/"+props.stages}</p>
            <Puzzle 
                size={size}
                incrementStage={incrementStage}
                incrementLevel={incrementLevel}
                incrementScore={incrementScore}
            />
        </div>
    )
}

export default Game

const container = css`
    padding: 24px;
`;

const stageHeader = css`
    padding: 8px 16px;
    background-color: #F7ECDE;
    border-radius: 8px;
    margin-bottom: 8px;
    text-align: center;
`;

const title = css`
    font-size: 48px;
    text-align: center;
`;

const subTitle = css`
    font-size: 24px;
    width: 400px;
    text-align: center;
`;
