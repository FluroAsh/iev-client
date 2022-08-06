import { useGlobalState } from "../context/stateContext";
import { ChargerForm } from "../components/ChargerForm";

export const EditCharger = () => {
  const { store } = useGlobalState();
  const { editFormData } = store;

  return <ChargerForm key={editFormData.id} editFormData={editFormData} />;
};
