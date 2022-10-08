import React from 'react'
import Form from './Forms'
import { useForm } from 'react-hook-form';

const EditForm = ({template, onEditSubmit,data}) => {
    const { register, handleSubmit } = useForm({
        defaultValues: data
    });
  return (
    <>
      <Form
        register={register}
        handleSubmit={handleSubmit}
        template={template}
        submitHandler={onEditSubmit}
      />
    </>
  )
}

export default EditForm;