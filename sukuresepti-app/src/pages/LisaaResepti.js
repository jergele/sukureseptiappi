import React from "react";
import { useState, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import reseptitContext from "../context/ReseptitContext";

const LisaaResepti = () => {
  let history = useNavigate();
  const [Reseptinimi, setReseptinimi] = useState("");
  const [Kuvailu, setKuvailu] = useState("");
  const [Valmistusaika, setValmistusaika] = useState("");
  const [HenkiloID, setHenkiloID] = useState("");
  const [KategoriaID, setKategoriaID] = useState("");

  const ReseptitiedotContext = useContext(reseptitContext);

  // kun syötetään uudet tiedot niin tehdään submit ja lähetetään contextiin uusiUrheilijatieto.
  //Historylla siirrytään kotivalikkoon,

  const handleSubmit = async (e) => {
    const uusiReseptitieto = {
      Reseptinimi: Reseptinimi,
      Kuvailu: Kuvailu,
      Valmistusaika: Valmistusaika,
      HenkiloID: HenkiloID,
      KategoriaID: KategoriaID,
    };
    console.log(uusiReseptitieto);
    ReseptitiedotContext.setReseptitiedot(uusiReseptitieto);
    history("/");
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Lisää Resepti</div>
      <div className="card-body">
        <form onSubmit={handleSubmit.bind(this)}>
          <div className="form-group my-2">
            <label htmlFor="nimi">Reseptin nimi</label>
            <input
              id="reseptitieto"
              type="text"
              name="Reseptinnimi"
              className="form-control form-control-lg my-1"
              placeholder="Nimeä resepti"
              value={Reseptinimi}
              onChange={(event) => setReseptinimi(event.target.value)}
            />
            <label htmlFor="nimi">Kuvailu</label>
            <input
              id="reseptitieto"
              type="text"
              name="Kuvailu"
              className="form-control form-control-lg my-1"
              placeholder="Kuvaile reseptiä..."
              value={Kuvailu}
              onChange={(event) => setKuvailu(event.target.value)}
            />
            <label htmlFor="nimi">Valmistusaika</label>
            <input
              id="reseptitieto"
              type="text"
              name="Valmistusaika"
              className="form-control form-control-lg my-1"
              placeholder="Arvio valmistusajasta minuutteina.."
              value={Valmistusaika}
              onChange={(event) => setValmistusaika(event.target.value)}
            />
            <label htmlFor="nimi">KategoriaID</label>
            <input
              id="reseptitieto"
              type="text"
              name="KategoriaID"
              className="form-control form-control-lg my-1"
              placeholder="Leivonnainen=1, Pääruoka=2, Kastike=3"
              value={KategoriaID}
              onChange={(event) => setKategoriaID(event.target.value)}
            />
            <label htmlFor="nimi">HenkiloID</label>
            <input
              id="reseptitieto"
              type="text"
              name="HenkiloID"
              className="form-control form-control-lg my-1"
              placeholder="Jere=1, Emmi=2, Haijele=3"
              value={HenkiloID}
              onChange={(event) => setHenkiloID(event.target.value)}
            />

            <div className="invalid-feedback">Anna tiedot</div>
          </div>

          <input
            type="submit"
            value="Lisää resepti"
            className="btn btn-dark btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default LisaaResepti;
