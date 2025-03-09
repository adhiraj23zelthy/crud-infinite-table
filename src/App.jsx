import Page from "./infinite-table/main/page";
import { NuqsAdapter } from "nuqs/adapters/react";

function App() {
  return (
    // <div style={{paddingLeft: '47px', paddingTop:'100px'}}>
    <div>
    <NuqsAdapter>
      <Page />
      </NuqsAdapter>
    </div>
  );
}

export default App;
