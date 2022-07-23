import { Charger } from "./Charger";
import { useGlobalState } from "../context/stateContext";

export const Chargers = () => {
  const { store } = useGlobalState();
  const { chargerList } = store;

  return (
    <>
      {chargerList.length ? (
        <>
          {chargerList.map((charger) => (
            <Charger key={charger.id} charger={charger} />
          ))}
        </>
      ) : (
        <p>List of chargers is empty</p>
      )}
    </>
  );
};
