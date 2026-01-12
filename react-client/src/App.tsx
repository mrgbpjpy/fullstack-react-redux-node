import { useAppSelector } from "./hooks";

function App() {
  const auth = useAppSelector((state) => state.auth);

  return(
    <>
      <h1>Auth Debug</h1>
      <pre>{JSON.stringify(auth,null,2)}</pre>
    </>
  );
}

export default App;

