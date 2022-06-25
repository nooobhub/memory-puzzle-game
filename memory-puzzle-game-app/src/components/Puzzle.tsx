import React, {useState, useEffect} from 'react';
import { css, cx } from '@emotion/css';
import { Dictionary } from '../dataStructures/dictionary';

interface Block {
    highlight: boolean,
    id: string
}

interface Counter {
    count: number,
    total: number,
    wrongAnswers: number
}

interface Props {
    size: number,
    incrementStage: () => void,
    incrementLevel: () => void,
    incrementScore: (score: number) => void
}

const Puzzle = (props: Props) => {
    const size = props.size;
    const [counter, setCounter] = useState<Counter>({ count: 0, total: 0, wrongAnswers: 0 })
    const [blocks, setBlocks] = useState<Dictionary<Block>>({}) 
    const [answers, setAnswers] = useState<Dictionary<boolean>>({})
    const [hide, setHide] = useState<boolean>(false);
    const [restart, setRestart] = useState<number>(0);

    const doRestart = () => {
        setRestart(i => i + 1);
    };

    const constructBlockId = (col: number, row: number): string => `${col}-${row}`;

    const initBlocks = () => {
        let result : Dictionary<Block> = {};
        let sum : number = 0;
        [...Array(size)].forEach((_, col) => {
            [...Array(size)].forEach((_, row) => {
                const highlightThis : boolean = (Math.random() <= 0.3);
                const blk : Block = {
                    id: constructBlockId(col, row),
                    highlight: highlightThis
                }
                result[blk.id] = blk;
                if (highlightThis) {
                    sum++;
                }
            })
        })
        setBlocks(result);
        setCounter(prev => { return { ...prev, total: sum } });
    }

    const incrementCount = () => setCounter(prev => {return {...prev, count: prev.count + 1}});

    const answer = (id: string): React.MouseEventHandler<HTMLLabelElement> => () => {
        if (!hide) { return; }
        if (answers[id] !== undefined) { return; }

        const isHighlighted = blocks[id].highlight;

        if (!isHighlighted) {
            setCounter(prev => { return { ...prev, wrongAnswers: prev.wrongAnswers + 1 } });
        }

        setAnswers(prev => {
            let result : Dictionary<boolean> = { ...prev };
            result[id] = isHighlighted;
            return result;
        })

        if (isHighlighted) {
            incrementCount();
            if (counter.count + 1 === counter.total) {
                props.incrementStage();
                
                if (counter.wrongAnswers === 0) {
                    props.incrementLevel();
                }
                props.incrementScore(Math.floor(100 * (counter.total - counter.wrongAnswers)/counter.total))
                doRestart();
            }
        }
    }

    useEffect(() => {
        setCounter({ count: 0, total: 0, wrongAnswers: 0 }); 
        setBlocks({}); 
        setAnswers({}); 
        setHide(false); 
        initBlocks();
        setTimeout(() => {
            setHide(true)
        }, 3500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restart])

    if (!blocks) {
        return (
            <></>
        )
    }

    return (
        <>
            <div className={progressContainer}>
                <p className={cx(progress, floatingProgress)} style={{width: (counter.count/counter.total)*335}}>1</p>
                <p className={progress}>1</p>
            </div>
            <div className={container}>
                <div className={innerContainer}>
                    {[...Array(size)].map((_, col) => {
                        return <div key={col} className={gridCol}>
                            {[...Array(size)].map((_, row) => {
                                const blockId = constructBlockId(col, row);
                                const withHighlight = blocks[blockId]?.highlight && !hide;
                                return (
                                    <label 
                                        key={row}
                                        className={cx(
                                            gridBlock, 
                                            withHighlight && highlighted,
                                            answers[blockId]!==undefined && answers[blockId] === false && incorrect,
                                            answers[blockId]!==undefined && answers[blockId] === true && correct,
                                        )} 
                                        onClick={answer(blockId)}
                                    />
                                )
                            })}
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Puzzle

const progress = css`
    padding: 8px 16px;
    background-color: #F7ECDE;
    border-radius: 8px;
    color: transparent;
    margin-bottom: 8px;
    flex: 1;
`;

const floatingProgress = css`
    position: absolute;
    z-index: 1;
    background-color: #54BAB9;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;

const progressContainer = css`
    position: relative;
    display: flex;
`;

const container = css`
    height: 350px;
    width: 350px;
    display: flex;
    flex-direction: column;
    background-color: #18978F;
    padding: 12px;
`;

const innerContainer = css`
    flex: 1;
    padding: 8px;
    background-color: white;
    display: flex;
    color: black;
`;

const gridCol = css`
    flex: 1;
    margin: 1px;
    display: flex;
    flex-direction: column;
`;

const gridBlock = css`
    flex: 1;
    margin: 2px 1px;
    background-color: #F7ECDE;
    
    &:hover {
        background-color: #54BAB9;
        cursor: pointer;
    }
    `;

const highlighted = css`
    @keyframes changeColor {
        from { background-color: #F7ECDE }
        to { background-color: #54BAB9 }
    }

    animation: changeColor 0.2s ease-in;
    background-color: #54BAB9;
`;

const incorrect = css`
    background-color: #F87474;
`;

const correct = css`
    background-color: #54BAB9;
`;