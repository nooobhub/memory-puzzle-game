import Header from "./components/Header";
import {css} from '@emotion/css'
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div className={container}>
      <Header/>
      <AppRouter/>
    </div>
  );
}

export default App;

const container = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;