import React, {useEffect} from "react";
import Form from "./Reusable/Forms";
import Modal from "./Reusable/Modal";
import Table from "./Reusable/Table";
const template = {
  fields: [
    {
      tag: "select",
      type: "select",
      name: "brand",
      labelName: "Brand Name",
      choices: [
        "Iphone" ,
        "Redmi",
        "Samsung",
        "Tecno",
        "Infinix",
        "Nokia",
        "Huawei",
        "Neon Ray",
        "Google Pixel",
      ],
      dimensions: [],
    },
    {
      tag: "input",
      type: "text",
      name: "imei",
      labelName: "IMEI Number",
      choices: [],
      dimensions: [],
    },
    {
      tag: "text-area",
      type: "text-area",
      name: "comment",
      labelName: "Anything Else..",
      choices: [],
      dimensions: [4, 50],
    },
  ],
};
const Phones = () => {
  const [showModal, setShowModal] = React.useState(false);
  function onSubmit(formData) {
    FactoryServerCommunication("/phones", "POST", formData)();
    setShowModal(false);
    
  }
  return (
      <div>Phones</div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={"Add new Phone Form"}
      >
        <Form template={template} onSubmit={onSubmit} />
      </Modal>
  );
};

export default Phones;
