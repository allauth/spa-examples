import { useEffect, useState } from "react";
import AllAuthContext from "./allauth-context";
import { AllAuthClient } from "allauth-spa-js";

export default function AllAuthProvider(params) {
  const [client] = useState(
    () =>
      new AllAuthClient({
        allauth_domain: "https://localhost:8000",
        app_domain: "http://localhost:3000",
      })
  );

  const [context, setContext] = useState({
    code: null,
    idToken: null,
    login() {
      client.login();
    },
  });
  useEffect(() => {
    const url = new URL(window.location);
    if (url.pathname === "/redirect_uri") {
      const code = url.searchParams.get("code");
      console.log(`got code: ${code}`);

      setContext({ ...context, code });
      (async () => {
        await client.handleAuthroizeRedirectCallback(window.location);
        const idToken = client.getIdToken();
        setContext({ ...context, idToken });
      })();
    }
  }, []);

  return (
    <AllAuthContext.Provider value={context}>
      {params.children}
    </AllAuthContext.Provider>
  );
}
