import { useReducer, useMemo, createContext, useContext } from "react";
import { csv, autoType } from "d3";

const DataStateContext = createContext();
const DataDispatchContext = createContext();

export function DataProvider({ children }) {
  const reducer = (prevState, action) => {
    console.debug(action);
    switch (action.type) {
      case "kidMap":
        return action.result;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };
  const [state, dispatch] = useReducer(reducer, []);
  const chart = useMemo(
    () => ({
      kidMap: async (summated) => {
        try {
          await csv(summated, autoType)
            .then(async (d) => {
              return kidMap(d);
            })
            .then(async (result) => {
              dispatch({ type: "kidMap", result: result });
            });
        } catch (error) {
          console.log(error);
        }
      },
    }),
    []
  );

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={chart}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
}

export function DataState() {
  return useContext(DataStateContext);
}

export function DataDispatch() {
  return useContext(DataDispatchContext);
}
