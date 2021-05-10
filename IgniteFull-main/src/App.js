import React from "react";
//Components and pages
import Home from "./pages/Home";
import Nav from "./components/Nav";
import ButtonComponent from "./components/ButtonComponent";
import TableComponent from "./components/TableComponent";
//Styles
import GlobalStyles from "./components/GlobalStyles";
//Router
import { Route, withRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <ButtonComponent />
      <Route
        path={["/viewtable", "/viewtable/:pathId", "/viewtable/:pathId/:id"]}
        component={withRouter(TableComponent)}
        exact
      />

      <Route path={["/game/:id", "/"]} exact>
        <Home />
      </Route>
    </div>
  );
}

export default App;
