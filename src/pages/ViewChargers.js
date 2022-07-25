import { Charger } from "../components/Charger";
import { useGlobalState } from "../context/stateContext";
import { Container } from "@mui/material";

export const ViewChargers = () => {
  const { store } = useGlobalState();
  const { chargerList } = store;

  return (
    <>
      {chargerList.length ? (
        <>
          <div className="chargers">
            {chargerList.map((charger) => (
              <Charger key={charger.id} charger={charger} />
            ))}
          </div>
        </>
      ) : (
        <p>List of chargers is empty</p>
      )}
    </>
  );
};
