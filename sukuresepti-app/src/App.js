import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GlobalState from "./context/GlobalState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ylatunniste from "./pages/Ylatunniste";
import Reseptitiedot from "./pages/Reseptitiedot";
import LisaaResepti from "./pages/LisaaResepti";
import Muokkaaresepti from "./pages/Muokkaaresepti";

function App() {
  return (
    <GlobalState>
      <Router>
        <div className="App">
          <Ylatunniste />

          <div className="container">
            <Routes>
              <Route exact path="/" element={<Reseptitiedot />} />
              <Route
                exact
                path="/reseptitieto/lisaa"
                element={<LisaaResepti />}
              />
              <Route
                exact
                path="/reseptitieto/muokkaa/:id"
                element={<Muokkaaresepti />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </GlobalState>
  );
}

export default App;

/*
<Route
                exact
                path="/urheilijatieto/lisaa"
                element={<LisaaUrheilija />}
              />
              <Route exact path="/tietoa" element={<Tietoa />} />
              <Route
                exact
                path="/urheilijatieto/muokkaa/:id"
                element={<MuokkaaUrheilutieto />}
              ></Route>
*/
