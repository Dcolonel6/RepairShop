import React, {useEffect} from "react";
import Form from "./Reusable/Forms";
import Modal from "./Reusable/Modal";
import Table from "./Reusable/Table";
import { FactoryServerCommunication } from "./Reusable/helpers/index";
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
  const [phones, setPhones] = React.useState([]);
  const tableHeaders = ["Brand Name", "Imei", "Comment",'Delete']
   
  
  useEffect(() => {
    FactoryServerCommunication("/phones")(setPhones);
    console.log('fired')
  }, [showModal]);

  function onSubmit(formData) {
    FactoryServerCommunication("/phones", "POST", formData)();
    setShowModal(false);
    
  }
  function deletePhone(id){
    FactoryServerCommunication(`/phones/${id}`,'DELETE')()
    FactoryServerCommunication('/phones')((data) => setPhones(data))
  }

  return (
    <div className="container mx-auto">
      <div>Phones</div>

      <div className="grid grid-cols-9 gap-4 mb-4">
        <div className="col-start-4 col-span-2 text-center py-3">
          <h1 className="text-base font-medium"> All Phone Details Table</h1>
        </div>
        <button
          className="col-end-10 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Phone
        </button>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={"Add new Phone Form"}
      >
        <Form template={template} onSubmit={onSubmit} />
      </Modal>
      <Table headers={tableHeaders} data={phones} deleteHandler={deletePhone} />
    </div>
  );
};

export default Phones;
