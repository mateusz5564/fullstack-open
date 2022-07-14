import { HospitalEntry } from "../types";
import { Field, Form, Formik } from "formik";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { DiagnosisSelection, TextField } from "../components/Forms/FormField";
import { useStateValue } from "../state";

export type HospitalEntryFormValues = Omit<HospitalEntry, "id" | "discharge"> & {
  dischargeDate: string;
  dischargeCriteria: string;
};

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddHealthEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        dischargeDate: "",
        dischargeCriteria: "",
      }}
      onSubmit={onSubmit}
      validate={values => {
        const RequiredError = "Field is required";
        const errors: { [field: string]: string } = {};

        if (!values.type) {
          errors.type = RequiredError;
        }
        if (!values.date) {
          errors.date = RequiredError;
        }
        if (!values.specialist) {
          errors.specialist = RequiredError;
        }
        if (!values.description) {
          errors.description = RequiredError;
        }
        if (!values.dischargeDate) {
          errors.dischargeDate = RequiredError;
        }
        if (!values.dischargeCriteria) {
          errors.dischargeCriteria = RequiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form>
            <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField}></Field>
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            ></Field>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            ></Field>
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            ></Field>
            <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="dischargeCriteria"
              component={TextField}
            ></Field>
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHealthEntryForm;
