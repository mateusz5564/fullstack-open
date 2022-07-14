import React from "react";
import AddPatientForm, { PatientFormValues } from "./AddPatientForm";
import FormModal from "../components/Forms/FormModal";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <FormModal title={"Add a new patient"} modalOpen={modalOpen} onClose={onClose} error={error}>
    <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
  </FormModal>
);

export default AddPatientModal;
