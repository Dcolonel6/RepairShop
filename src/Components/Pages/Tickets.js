import React from "react";
import EditForm from "./Reusable/EditForm";
import CreateForm from "./Reusable/CreateForm";
import Modal from "./Reusable/Modal";
import Table from "./Reusable/Table";
import { FactoryServerCommunication } from "./Reusable/helpers/index";

const template = {
  fields: [
    {
      tag: "select",
      type: "select",
      name: "userId",
      labelName: "Assigned To",
      choices: [],
      dimensions: [],
    },
    {
      tag: "select",
      type: "select",
      name: "phoneId",
      labelName: "Working on",
      choices: [],
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
      choices: ["Opened", "Closed"],
      dimensions: [],
    },
  ],
};
const Tickets = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [allTickets, setallTickets] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [phones, setPhones] = React.useState([]);
  const [showEditModal, setEditShowModal] = React.useState(false);
  const [editTicket, setEditTicket] = React.useState({});

  const ticketsHeaders = [
    "Assigned To",
    "Opened On",
    "Closed On",
    "Status",
    "Phone being Worked On",
    "Delete",
    "Edit",
  ];

  React.useEffect(() => {
    FactoryServerCommunication("/users")(processUsers);
    FactoryServerCommunication("/phones")(processPhones);
    FactoryServerCommunication(`/tickets?_expand=user&_expand=phone`)(
      processTickets
    );
  }, []);

  function processTickets(data) {
    const info = data.map((ticket) => {
      const { brand, imei } = ticket.phone;
      const { status } = ticket;
      const { fullName } = ticket.user;
      const valueOfStatus = status === "1" ? "Open" : "Closed";
      return {
        user: fullName,
        openedOn: ticket.openedOn,
        closedOn: ticket.closedOn,
        status: valueOfStatus,
        phone: `${brand} imei: ${imei}`,
        id: ticket.id,
      };
    });
    setallTickets(info);
  }

  function processUsers(data) {
    const info = data.map(({ id, fullName }) => {
      return {
        id: id,
        fullName: fullName,
      };
    });
    setUsers(info);
    template.fields[0].choices = info;
  }

  function processPhones(data) {
    const info = data.map(({ id, brand, imei }) => {
      return {
        id: id,
        brand: brand,
        imei: imei,
      };
    });
    setPhones(info);
    template.fields[1].choices = info;
  }

  function createNewTicket(formData) {
    FactoryServerCommunication(
      "/tickets`",
      "POST",
      formData
    )(update(formData, setallTickets));
    setShowModal(false);
  }

  function deleteTicket(ticketId) {
    FactoryServerCommunication(`/tickets/${ticketId}`, "DELETE")();
    setallTickets((currentTickets) => {
      return currentTickets.filter(({ id }) => ticketId !== id);
    });
  }

  //given an id and an array of object it will return an object with that id
  function findObject(queryId, arrayOfObjects) {
    return arrayOfObjects.find(({ id }) => queryId == id);
  }

  //will update the formData with id received from response and also update the state
  function update(formData, fn) {
    const newTicket = mapFormData(formData);

    return (response) => {
      newTicket.id = response.id;      
      fn((currentTickets) => {
        return [
          newTicket,
          ...currentTickets
        ];
      });
    };
  }

  function clickHandlerEdit(ticket) {
    setEditShowModal(true);
    setEditTicket(ticket);
  }

  function onEditSubmit(formData) {
    const updatedTicket = mapFormData(formData);
    const payload = {
      userid:formData.userid,
      phoneId:formData.phoneId,
      openedOn: formData.openedOn,
      closedOn: formData.closedOn,
      status: formData.status === "Opened" ? 'Open':formData.status,
    }
    //console.log(formData)
    setEditShowModal(false);
    FactoryServerCommunication(`/tickets/${updatedTicket.id}`, "PATCH", payload)();

    setallTickets((currentTickets) => {

      return currentTickets.map((ticket) => {
        return ticket.id === updatedTicket.id ? updatedTicket : ticket;
      });
    });
  }

  function mapFormData(formData) {
    const { brand, imei } = findObject(formData.phoneId, phones);
    const { fullName } = findObject(formData.userId, users);
    const mappedTicket = {
      user: fullName,
      openedOn: formData.openedOn,
      closedOn: formData.closedOn,
      status: formData.status === "Opened" ? 'Open':formData.status,
      phone: `${brand}:${imei}`,
      id: formData.id,
    };
    return mappedTicket;
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
        <CreateForm template={template} onCreate={createNewTicket} />
      </Modal>
      <Table
        headers={ticketsHeaders}
        data={allTickets}
        deleteHandler={deleteTicket}
        clickHandlerEdit={clickHandlerEdit}
      />
      <Modal
        showModal={showEditModal}
        setShowModal={setEditShowModal}
        title={"Add Edit User Form"}
      >
        <EditForm
          template={template}
          onEditSubmit={onEditSubmit}
          data={editTicket}
        />
      </Modal>
    </div>
  );
};

export default Tickets;
