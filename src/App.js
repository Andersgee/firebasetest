import React, { useState, useEffect } from "react";
import { Counter } from "./features/counter";
import googleauth from "./googleauth";

export default function App() {
  //const [provider, setProvider] = useState(null)
  useEffect(() => {
    const provider = googleauth();
    console.log("provider: ", provider);
  }, []);

  return (
    <>
      {"hmm?"}
      <Counter />
    </>
  );
}
