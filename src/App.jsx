import reactLogo from "./assets/react.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Loader from "./components/layout/Loader";
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
