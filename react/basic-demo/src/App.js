import { useContext } from "react";
import "./App.css";
import AllAuthContext from "./comps/allauth-context";

function App() {
  const ctx = useContext(AllAuthContext);

  if (ctx.idToken) {
    return <div className="App">欢迎您，{ctx.idToken.claims.sub}</div>;
  } else {
    return (
      <div className="App">
        您还未登录
        <button onClick={ctx.login}>去登录</button>
      </div>
    );
  }
}

export default App;
