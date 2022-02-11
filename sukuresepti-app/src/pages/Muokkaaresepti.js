import React, { Component, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import reseptitContext from "../context/ReseptitContext";
import Reseptitieto from "./Reseptitieto";

const Muokkaaresepti = () => {
  let history = useNavigate();
  const [Raakaainenimi, setRaakaainenimi] = useState("");
  const [Maara, setMaara] = useState("");
  const [Mitta, setMitta] = useState("");
  const [Sisalto, setSisalto] = useState("");
  const [Reseptinimi, setReseptinimi] = useState("");
  const [Kuvailu, setKuvailu] = useState("");

  const ReseptitContext = useContext(reseptitContext);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const reseptitieto = ReseptitContext.getSisalto(id).then((res) => {
        setRaakaainenimi(res.Raakaainenimi);
        setMaara(res.Maara);
        setMitta(res.Mitta);
        setSisalto(res.Sisalto);
        setReseptinimi(res.Reseptinimi);
        setKuvailu(res.Kuvailu);
      });
    } else mounted = false;
  }, []);

  const handleSubmit = async (e) => {
    const paivitettyReseptitieto = {
      Raakaainenimi: Raakaainenimi,
      Maara: Maara,
      Mitta: Mitta,
      Sisalto: Sisalto,
      Reseptinimi: Reseptinimi,
      Kuvailu: Kuvailu,
    };

    ReseptitContext.setReseptitiedot(id, paivitettyReseptitieto);
    history("/");
  };
  const onChangeRaakaainenimi = (e) => {
    setRaakaainenimi(e.target.value);
  };
  const onChangeMaara = (e) => {
    setMaara(e.target.value);
  };
  const onChangeMitta = (e) => {
    setMitta(e.target.value);
  };
  const onChangeSisalto = (e) => {
    setSisalto(e.target.value);
  };
  const onChangeReseptinimi = (e) => {
    setReseptinimi(e.target.value);
  };
  const onChangeKuvailu = (e) => {
    setKuvailu(e.target.value);
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Muokkaa reseptiä</div>
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
              onChange={onChangeReseptinimi}
            />
            <label htmlFor="nimi">Kuvailu</label>
            <input
              id="reseptitieto"
              type="text"
              name="Kuvailu"
              className="form-control form-control-lg my-1"
              placeholder="Kuvaile reseptiä..."
              value={Kuvailu}
              onChange={onChangeKuvailu}
            />
            <label htmlFor="nimi">Raaka-aineet</label>
            <input
              id="reseptitieto"
              type="text"
              name="Valmistusaika"
              className="form-control form-control-lg my-1"
              placeholder=""
              value={Raakaainenimi}
              onChange={onChangeRaakaainenimi}
            />
            <label htmlFor="nimi">Määrät</label>
            <input
              id="reseptitieto"
              type="text"
              name="KategoriaID"
              className="form-control form-control-lg my-1"
              placeholder=""
              value={Maara}
              onChange={onChangeMaara}
            />
            <label htmlFor="nimi">Mitat</label>
            <input
              id="reseptitieto"
              type="text"
              name="HenkiloID"
              className="form-control form-control-lg my-1"
              placeholder=""
              value={Mitta}
              onChange={onChangeMitta}
            />
            <label htmlFor="nimi">Sisalto</label>
            <input
              id="reseptitieto"
              type="text"
              name="HenkiloID"
              className="form-control form-control-lg my-1"
              placeholder=""
              value={Sisalto}
              onChange={onChangeSisalto}
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

export default Muokkaaresepti;
