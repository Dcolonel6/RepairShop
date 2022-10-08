import React from "react";
import { useForm } from "react-hook-form";
import Form from "./Forms";

const CreateForm = ({ template, onCreate }) => {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <Form
        register={register}
        handleSubmit={handleSubmit}
        template={template}
        submitHandler={onCreate}
      />
    </>
  );
};

export default CreateForm;
