import { lazy, Suspense, useState } from "react";

import { RainbowUiProvider } from "@packages/rb-ui/provider";

import reactLogo from "./assets/react.svg";
import ErrorBoundary from "./ErrorBoundary";

import viteLogo from "/vite.svg";

import "./App.css";

const Video = lazy(() => import("rb_video/App"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RainbowUiProvider>
        <div>
          awdaw ㅁㅈㅇㅁㅈㅇ
          <ErrorBoundary>
            <Suspense>
              <Video />
            </Suspense>
          </ErrorBoundary>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </RainbowUiProvider>
    </>
  );
}

export default App;
