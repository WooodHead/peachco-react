import React from "react";
import Header from "./components/Header/Header";
import Search from "./pages/Search/Search";
import "./App.css";

const App = () => {
  return (
    <main>
      <Header />
      <h1>Gotta start somewhere</h1>
      <Search/>
    </main>
  )
}

export default App;
