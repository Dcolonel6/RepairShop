import React, { useState } from "react";
import LastFiveBookings from "./LastFiveBookings";
import { FactoryServerCommunication } from "../Reusable/helpers/index";
import { GrGroup } from "react-icons/gr";
import { MdPhonelinkSetup } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import headers from "./tableHeadersData";

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const [phones, setPhones] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterBy, setFilterBy] = useState({
    context: "user",
    category: "isAdmin",
    query: 'Yes',
  });
  const { context,category,query } = filterBy;

  React.useEffect(() => {
    FactoryServerCommunication("/users")(setUsers);
    FactoryServerCommunication("/phones")(setPhones);
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
    setTickets(info);
  }

  //return appropriate data depending on our search context
  function selectData(context) {
    const data = {
      user: users,
      phone: phones,
      ticket: tickets,
    };
    return data[context];
  }
  const filteredSet = selectData(context).filter((obj) =>{
    
     return obj[category] === query
  })
  console.log(filteredSet)
  console.log(selectData(context))

  return (
    <div className="content mt-5 ml-10">
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2">Total Users</div>
            <span className="text-lg">
              <GrGroup />
            </span>
            <h1 className="text-gray-700 text-lg">{users.length}</h1>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span
              onClick={(e) =>(
                setFilterBy({
                  context: "user",
                  category: "isAdmin",
                  query: 'Yes',
                }))
              }
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #admin
            </span>
            <span
              onClick={(e) =>
                setFilterBy({
                  context: "user",
                  category: "isAdmin",
                  query: 'No',
                })
              }
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #NotAdmin
            </span>
            <span
              onClick={(e) =>
                setFilterBy({
                  context: "user",
                  category: "gender",
                  query: "Female",
                })
              }
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #Female
            </span>
            <span
              onClick={(e) =>
                setFilterBy({
                  context: "user",
                  category: "gender",
                  query: "Male",
                })
              }
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #Male
            </span>
          </div>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2">Total Phones</div>
            <span className="text-lg">
              <MdPhonelinkSetup />
            </span>
            <h1 className="text-gray-700 text-lg">{phones.length}</h1>
          </div>
          {/* <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #UnderRepair
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #Repaired
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #NotCollected
            </span>
          </div> */}
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2">Total Tickets</div>
            <span className="text-lg">
              <GiAutoRepair />
            </span>
            <h1 className="text-gray-700 text-lg">{tickets.length}</h1>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span onClick={(e) =>(
                setFilterBy({
                  context: "ticket",
                  category: "status",
                  query: 'Opened',
                }))} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #Opened
            </span>
            <span onClick={(e) =>(
                setFilterBy({
                  context: "ticket",
                  category: "status",
                  query: 'Closed',
                }))} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #Closed
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 mb-3 ">
        <div className="col-start-1 col-end-6">
          <h1 className="py-1 text-center">Showing '{category}' where value is '{query}'</h1>
          <LastFiveBookings
            headers={Object.values(headers[context])}
            data={filteredSet}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
