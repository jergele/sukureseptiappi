// Tätä kautta tulee pyynnät ja vastaukset eri REST-rajapinnan metodeille
// vastaukset laitetaan useREducerin avulla haluttuun muotoon ja useContextilla
// data käyttöön joka puolelle.

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_RESEPTIT":
      return {
        ...state,
        reseptitiedot: payload,
      };
    case "GET_RESEPTI":
      return {
        ...state,
        reseptitiedot: payload,
      };

    case "GET_SISALTO":
      return {
        ...state,
        reseptitiedot: payload,
      };

    case "GET_OHJE":
      return {
        ...state,
        reseptitiedot: payload,
      };

    case "DELETE_RESEPTI":
      return {
        ...state,
        reseptitiedot: state.reseptitiedot.filter(
          (reseptitieto) => reseptitieto.id !== action.payload
        ),
      };
    case "ADD_RESEPTI":
      return {
        ...state,
        reseptitiedot: [action.payload, ...state.reseptitiedot],
      };
    case "EDIT_RESEPTI":
      return {
        ...state,
        reseptitiedot: state.reseptitiedot.map((reseptitieto) =>
          reseptitieto.id === action.payload.id
            ? (reseptitieto = action.payload)
            : reseptitieto
        ),
      };
    default:
      return state;
  }
};
