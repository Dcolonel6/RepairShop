import React from "react";
import LastFiveBookings from "./LastFiveBookings";
import { GrGroup } from "react-icons/gr";
import { MdPhonelinkSetup } from "react-icons/md";
import { BsCurrencyDollar } from 'react-icons/bs';

const Home = () => {
  return (
    <div className="content mt-5 ml-10">
      <div className="grid grid-cols-3 gap-4 mb-3">

        
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2">Total Customers</div>
            <span className="text-lg">
              <GrGroup />
            </span>
            <h1 className="text-gray-700 text-lg">60</h1>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #paid
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #still pending
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #Open
            </span>
          </div>
        </div>


        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2">Total Phones</div>
            <span className="text-lg">
              <MdPhonelinkSetup />
            </span>
            <h1 className="text-gray-700 text-lg">64</h1>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #UnderRepair
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #Repaired
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #NotCollected
            </span>
          </div>
        </div>


        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2">Revenue</div>
            <span className="text-lg">
              <BsCurrencyDollar />
            </span>
            <h1 className="text-gray-700 text-lg">20,000</h1>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #Today
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #Last Week
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #This Month
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 mb-3 ">
        <div className="col-start-1 col-end-6">
          <h1 className="py-1 text-center"> Last Five Bookings</h1>
          <LastFiveBookings />
        </div>
      </div>
    </div>
  );
};

export default Home;
