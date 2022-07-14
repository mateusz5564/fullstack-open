import { HospitalEntryFormValues } from "./AddHealthEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
  error?: string;
}

import FormModal from "../components/Forms/FormModal";
import AddHealthEntryForm from "./AddHealthEntryForm";

const AddHealthEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <FormModal title={"Add a new Entry"} modalOpen={modalOpen} onClose={onClose} error={error}>
      <AddHealthEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </FormModal>
  );
};

export default AddHealthEntryModal;
