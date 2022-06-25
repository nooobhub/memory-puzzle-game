import React from 'react'
import {css} from '@emotion/css'
import Button from './Button'
import Game from './Game'

const Pages = {
    HOME: "HOME",
    GAME: "GAME",
    HOWTOPLAY: "HOWTOPLAY",
    CONTRIBUTORS: "CONTRIBUTORS"
}

const AppRouter = () => {
    const [page, setPage] = React.useState<string>(Pages.HOME)
    const goTo = (page: string) => () => setPage(page);

    switch (page) {
        case Pages.HOME:
            return (
                <div className={container}>
                    <h2 className={welcomeTitle}>Welcome</h2>
                    <p className={subTitle}>A clone of Lumosity's Memory Matrix Game.</p>

                    <div className={space} />

                    <Button text='how-to-play' onClick={goTo(Pages.HOWTOPLAY)} />
                    <Button text='start' onClick={goTo(Pages.GAME)} />
                    <Button text='contributors' onClick={goTo(Pages.CONTRIBUTORS)} />
                </div>
            )
        case Pages.GAME:
            return (
                <div className={container}>
                    <Game stages={5} />
                    <div className={space} />

                    <Button text='home' onClick={goTo(Pages.HOME)} />
                </div>
            )
        case Pages.CONTRIBUTORS:
            return (
                <div className={container}>
                    <h2 className={welcomeTitle}>Contributors</h2>
                    <p className={subTitle}>These are all the contributors of this project.</p>

                    <div className={space} />

                    <Button text='how-to-play' onClick={goTo(Pages.HOWTOPLAY)} />
                    <Button text='home' onClick={goTo(Pages.HOME)} />
                </div>
            )
        case Pages.HOWTOPLAY:
            return (
                <div className={container}>
                    <h2 className={welcomeTitle}>How To Play</h2>
                    <p className={subTitle}>You will be given 3s to remember all marked up blocks. After they are hidden, you are supposed to recall every one of them. Do it until you've finished all stages.</p>

                    <div className={space} />

                    <Button text='home' onClick={goTo(Pages.HOME)} />
                    <Button text='start' onClick={goTo(Pages.GAME)} />
                </div>

            )
        default:
            return (
                <div className={container}>
                    <h2 className={welcomeTitle}>404 - Not Found</h2>
                    <p className={subTitle}>Page not found.</p>

                    <div className={space} />

                    <Button text='how-to-play' onClick={goTo(Pages.HOWTOPLAY)} />
                    <Button text='home' onClick={goTo(Pages.HOME)} />
                    <Button text='contributors' onClick={goTo(Pages.CONTRIBUTORS)} />
                </div>
            )
    }
}

export default AppRouter

const container = css`
    height: calc(100vh - 100px);
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const welcomeTitle = css`
    font-size: 48px;
`;

const subTitle = css`
    font-size: 24px;
    width: 400px;
    text-align: center;
`;

const space = css`
    height: 40px;
`