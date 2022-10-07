import React from 'react'
import Form from "./Reusable/Forms";
import Modal from "./Reusable/Modal";
import Table from "./Reusable/Table";
import { FactoryServerCommunication } from "./Reusable/helpers/index"


const template = {
  fields: [
    
    {
      tag: "input",
      type: "text",
      name: "fullName",
      labelName: "Full Names",
      choices: [],
      dimensions: [],
    },
    {
      tag: "input",
      type: "email",
      name: "emailAddress",
      labelName: "Email Address",
      choices: [],
      dimensions: [],
    },
    {
      tag: "select",
      type: "select",
      name: "gender",
      labelName: "Sex",
      choices: [
        'Male',
        'Female'
      ],
      dimensions: [],
    },
    {
      tag: "select",
      type: "select",
      name: "isAdmin",
      labelName: "Is the user an admin?",
      choices: [
        'Yes',
        'No' 
      ],
      dimensions: [],
    },
  ],
};
