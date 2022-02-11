import React, { useReducer } from "react";
import ReseptiReducer from "./ReseptiReducer";
import ReseptitContext from "./ReseptitContext";
import axios from "axios";

const GlobalState = (props) => {
  //initial state, alussa tyhjä
  let initialState = {
    reseptitiedot: [],
  };

  const [state, dispatch] = useReducer(ReseptiReducer, initialState);
  const getReseptitiedot = async () => {
    try {
      let res = await axios.get("http://localhost:3000/resepti");
      let { data } = res;
      dispatch({ type: "GET_RESEPTIT", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getSisalto = async (id) => {
    try {
      let res = await axios.get(
        "http://localhost:3000/resepti/" + id + "/sisalto"
      );
      let { data } = res;
      dispatch({ type: "GET_SISALTO", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getOhje = async (id) => {
    try {
      let res = await axios.get(
        "http://localhost:3000/resepti/" + id + "/ohje"
      );
      let { data } = res;
      dispatch({ type: "GET_OHJE", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const setReseptitiedot = async (uusiReseptitieto) => {
    try {
      const res = await axios
        .post(`http://localhost:3000/lisaaresepti`, uusiReseptitieto)
        .then((res) => {
          dispatch({ type: "ADD_RESEPTI", payload: res.data });
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const setReseptitieto = async (id, paivitettyReseptitieto) => {
    try {
      const res = await axios
        .put(`http://localhost:3000/resepti/${id}`, paivitettyReseptitieto)
        .then((res) => {
          dispatch({ type: "EDIT_RESEPTI", payload: res.data });
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const poistaReseptitieto = async (id) => {
    try {
      let sql = "http://localhost:3000/resepti/" + id["ReseptiID"];
      const res = await axios.delete(sql).then((res) => {
        dispatch({ type: "DELETE_RESEPTI", payload: id["ReseptiID"] });
        console.log(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // data laitetaan contextin provideriin

  return (
    <ReseptitContext.Provider
      value={{
        reseptitiedot: state.reseptitiedot,
        reseptitieto: state.reseptitieto,
        getReseptitiedot,
        getSisalto,
        getOhje,
        setReseptitiedot,
        setReseptitieto,
        poistaReseptitieto,
      }}
    >
      {props.children}
    </ReseptitContext.Provider>
  );
};

export default GlobalState;
