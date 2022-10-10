import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

const PieChart = ({ chartData, context, category }) => {
  // console.log(context)
  console.log(chartData)
  // console.log(category)
  const generatedLabels = Array.from(new Set(chartData.map(({user}) => user)))

  function countLabels(data){
    const dataLabel = []
    for (let i=0; i < generatedLabels.length; i++){
      const label = generatedLabels[i]
      let count = 0
      for (let j=0; j < data.length;j++){      
        const {user} = data[j]
        if(label === user){
          count = count + 1
          dataLabel[i] = count       
        }
      }
      
    }
    return dataLabel  
  }

  const objectData = {
    user: {
      isAdmin: {
        labels: ["Female", "Male"],
        data: chartData.reduce(
          (prevValue, { gender }) => {
            let [Female, Male] = prevValue;
            return gender === "Female" ? [++Female, Male] : [Female, ++Male];
          },
          [0, 0]
        ),
      },
      gender: {
        labels: ["No", "Yes"],
        data: chartData.reduce(
          (prevValue, { isAdmin }) => {
            let [no, yes] = prevValue;
            return isAdmin === "No" ? [++no, yes] : [no, ++yes];
          },
          [0, 0]
        ),
      },
    },
    ticket: {
      status: {
        labels: generatedLabels,
        data: countLabels(chartData),
      },
      gender: {
        labels: generatedLabels,
        data: countLabels(chartData),
      }
    },
  };

  const chartObj = {
    labels: objectData[context][category].labels,
    datasets: [
      {
        label: `${context}`,
        data: objectData[context][category].data,
        backgroundColor: [
          "#FB8500", 
          "#023047",
          '#b1740f',
          '#011a51',
          '#dde1e4',
          '#219ebc',
          '#0059ff',
          '#28acd1',
          '#ff881e',
          '#001524',
          '#b3300b',
          '#ff6b35',
          '#bef0fd',
          '#222823',
          '#0b0055',
          '#ff70a6'
        ],
      },
    ],
  };

  console.log(chartObj);

  return (
    <div className="flex flex-col items-center my-2 grow">
      <h1 className="mb-2">
        A Pie-Chart showing distribution of {context} along property {category}
      </h1>
      <div className="">
        <Pie data={chartObj} />
      </div>
    </div>
  );
};

export default PieChart;
