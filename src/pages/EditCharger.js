import { useGlobalState } from "../context/stateContext";
import { ChargerForm } from "../components/ChargerForm";

// import { reducer } from "../utils/reducer"

export const EditCharger = () => {
  const { store } = useGlobalState();
  const { editFormData } = store;

  //TODO: when refresh page at location /charger/:chargerId/edit, the editFormData {}
  //TODO: handle price

  return <ChargerForm key={editFormData.id} editFormData={editFormData} />;
};
