import React, { useContext, useEffect } from "react";
import Reseptitieto from "./Reseptitieto";
import reseptitContext from "../context/ReseptitContext";

const Reseptitiedot = () => {
  const ReseptitiedotContext = useContext(reseptitContext);
  useEffect(() => {
    ReseptitiedotContext.getReseptitiedot();
    console.log(ReseptitiedotContext);
  }, []);

  return (
    <>
      <h2 className="display-4 mb-3">
        <span className="text-dark">Reseptit</span>
      </h2>
      <React.Fragment>
        {ReseptitiedotContext.reseptitiedot.length
          ? ReseptitiedotContext.reseptitiedot.map((reseptitieto) => (
              <Reseptitieto
                key={reseptitieto.ReseptiID}
                reseptitieto={reseptitieto}
              />
            ))
          : null}
      </React.Fragment>
    </>
  );
};

export default Reseptitiedot;
