import React from "react";
import Table from "../Reusable/Table";

const LastFiveBookings = ({data,headers}) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {
              /* add a table here */
              <Table headers={headers} data={data} editable={false} />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastFiveBookings;
