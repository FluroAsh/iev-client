import { Charger } from "./Charger";
import { useGlobalState } from "../context/stateContext";
import Box from "@mui/material/Box";

export const Chargers = () => {
  const { store } = useGlobalState();
  const { chargerList } = store;

  return (
    <div>
      <Box sx={{ display: "inline-flex", justifyContent: "space-evenly" }}>
        {chargerList.length ? (
          <>
            {chargerList.map((charger) => (
              <Charger key={charger.id} charger={charger} />
            ))}
          </>
        ) : (
          <p>List of chargers is empty</p>
        )}
      </Box>
    </div>
  );
};
