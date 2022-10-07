import React from "react";
import Form from "./Reusable/Forms";
import Modal from "./Reusable/Modal";
import Table from "./Reusable/Table";
import { FactoryServerCommunication } from "./Reusable/helpers/index"


const template = {
  fields: [
    {
      tag: "select",
      type: "select",
      name: "userId",
      labelName: "Assigned To",
      choices: [
        
      ],
      dimensions: [],
    },
    {
      tag: "select",
      type: "select",
      name: "phoneId",
      labelName: "Working on",
      choices: [        
      ],
      dimensions: [],
    },
    {
      tag: "input",
      type: "date",
      name: "openedOn",
      labelName: "Opened On",
      choices: [],
      dimensions: [],
    },
    {
      tag: "input",
      type: "date",
      name: "closedOn",
      labelName: "Closed On",
      choices: [],
      dimensions: [],
    },
    {
      tag: "select",
      type: "select",
      name: "status",
      labelName: "Ticket Status",
      choices: [
        "Opened", 
        "Closed",         
      ],
      dimensions: [],
    },
  ],
};
const Tickets = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [allTickets, setallTickets ] = React.useState([]) 
  const [users, setUsers ] = React.useState([])
  const [phones, setPhones ] = React.useState([])

  const ticketsHeaders = ['Assigned To','Opened On', 'Closed On', 'Status','Phone being Worked On', 'Delete','Edit']

  React.useEffect(() => {
    FactoryServerCommunication('/users')(processUsers)
    FactoryServerCommunication('/phones')(processPhones)
    FactoryServerCommunication(`/tickets?_expand=user&_expand=phone`)(processTickets)    
  },[showModal])  

  function processTickets(data){
    const info = data.map((ticket) => {
      const {brand, imei } = ticket.phone
      const {status} = ticket
      const { fullName } = ticket.user
      const valueOfStatus = status === '1' ? 'Open' : 'Closed' 
      return {
        user: fullName,
        openedOn: ticket.openedOn,
        closedOn: ticket.closedOn,
        status: valueOfStatus,
        phone: `${ brand } imei: ${imei}`,
        id: ticket.id       
        
      }

    })
    setallTickets(info)

  }
  function processUsers(data){
    const info = data.map(({id, fullName}) => {
      return {
        id: id,
        fullName: fullName
      }
    })
    setUsers(info)
    template.fields[0].choices = info
  }
  function processPhones(data){
    const info = data.map(({id, brand,imei}) => {
      return {
        id: id,
        brand: brand,
        imei: imei
      }
    })
    setPhones(info)
    template.fields[1].choices = info
  }

  

  function onSubmit(formData) {
    FactoryServerCommunication("/tickets", "POST", formData)();
    setShowModal(false);
  }

  function deleteTicket(id){
    FactoryServerCommunication(`/phones/${id}`,'DELETE')()
    FactoryServerCommunication('/phones')((data) => setPhones(data))
  }
 
  return (
    <div className="container mx-auto">
      <div>Tickets</div>

      <div className="grid grid-cols-9 gap-4 mb-4">
        <div className="col-start-4 col-span-2 text-center py-3">
          <h1 className="text-base font-medium"> All Tickets OverView Table</h1>
        </div>
        <button
          className="col-end-10 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Ticket
        </button>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={"Add new Ticket Form"}
      >
        <Form template={template} onSubmit={onSubmit} />
      </Modal>
      <Table headers={ticketsHeaders} data={allTickets} deleteHandler={deleteTicket} />
    </div>
  );
};

export default Tickets;
