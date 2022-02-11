import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import reseptitContext from "../context/ReseptitContext";
import Card from "react-bootstrap/Button";
import Button from "react-bootstrap/Button";

const Reseptitieto = (props) => {
  const ReseptitiedotContext = useContext(reseptitContext);
  let history = useNavigate();
  const [naytaReseptitieto, setnaytaReseptitieto] = useState(false);
  const onDeleteClick = (ReseptiID) => {
    ReseptitiedotContext.poistaReseptitieto(ReseptiID);
    window.location.reload();
    history("/");
  };

  const onShowClick = (id) => {
    let lippu = !naytaReseptitieto;
    setnaytaReseptitieto(lippu);
  };

  const {
    Kuvailu,
    Valmistusaika,
    ReseptiID,
    Reseptinimi,
    HenkiloID,
    KategoriaID,
    kuva,
  } = props.reseptitieto;

  return (
    <div className="card rounded border shadow mb-4" style={{ maxWidth: 900 }}>
      <div className="row g-0">
        <div className="col-md-3">
          <img src={kuva} className="card-img-top" alt="..."></img>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h2 className="card-title">{Reseptinimi}</h2>

            <button
              className="btn btn-secondary my-3 mx-1"
              onClick={onShowClick.bind(this, { ReseptiID })}
            >
              Info
            </button>
            <Link to={"/"}>
              <button className="btn btn-secondary my-3 mx-1">Sisältö</button>
            </Link>
            <Link to={`reseptitieto/muokkaa/${ReseptiID}`}>
              <button className="btn btn-secondary my-3 mx-1">Muokkaa</button>
            </Link>

            <button
              className="btn btn-danger my-3 mx-1"
              onClick={onDeleteClick.bind(this, { ReseptiID })}
            >
              Poista
            </button>
          </div>
        </div>
        <div className="col-md-3"></div>
        <div className="row g-0">
          <div className="col-md-12">
            {naytaReseptitieto ? (
              <ul className="list-group list-groub-flush">
                <li className="list-group-item">Kuvailu: {Kuvailu}</li>
                <li className="list-group-item">
                  Valmistusaika: {Valmistusaika}
                </li>
                <li className="list-group-item">ReseptiID: {ReseptiID}</li>
                <li className="list-group-item">HenkiloID: {HenkiloID}</li>
                <li className="list-group-item">KategoriaID: {KategoriaID}</li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reseptitieto;
