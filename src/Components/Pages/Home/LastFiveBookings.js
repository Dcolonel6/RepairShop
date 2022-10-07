import React from "react";
import Table from "../Reusable/Table";

const lastFiveData = {
  headers: ["Name", "Brand Name", "Date"],
  data: [
    {
      id: 1,
      name: "Dennis Njogu",
      Brand: "SamSung",
      Date: "05/10/2022",
    },
    {
      id: 2,
      name: "Njogu Dennis",
      Brand: "Iphone-13",
      Date: "05/10/2022",
    },
    {
      id: 3,
      name: "Msee Yule",
      Brand: "Neon Ray",
      Date: "05/10/2022",
    },
    {
      id: 4,
      name: "Watu Wengine",
      Brand: "Infinix",
      Date: "05/10/2022",
    },
    {
      id: 5,
      name: "Mambo Mingi",
      Brand: "Tecno",
      Date: "05/10/2022",
    },
  ],
};

const LastFiveBookings = () => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {
              /* add a table here */
              <Table headers={lastFiveData.headers} data={lastFiveData.data} />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastFiveBookings;
