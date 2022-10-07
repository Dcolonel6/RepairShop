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

const Users = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [users, setUsers ] = React.useState([])
  const allUsers = {
    headers: ['Full Name','Email', 'gender', 'isAdmin','Delete']   
  }

  React.useEffect(() => {
    FactoryServerCommunication('/users')(setUsers)
  },[])

  function onSubmit(formData) {
    FactoryServerCommunication('/users','POST',formData)(update(formData,setUsers))
    setShowModal(false)    
    //FactoryServerCommunication('/users')(setUsers)
  }

  //will update the formData with id received from response and also update the state
  function update(formData,fn){
    
    return (response) => {
      formData.id = response.id;
      
      fn(currentUsers => {
        return [
          ...currentUsers,
          formData
        ]
      })
    }
  }

  function deleteUser(userid){
    FactoryServerCommunication(`/users/${userid}`,'DELETE')()
    setUsers(currentUsers => {
      return currentUsers.filter(({id}) => id !== userid)
    })
  }

  return (
    <div className="container mx-auto">
    <div>Users</div>
    
    <div className="grid grid-cols-9 gap-4 mb-4">
      
      <div className="col-start-4 col-span-2 text-center py-3">
        <h1 className="text-base font-medium"> All Users Details Table</h1>
      </div>
      <button
      className="col-end-10 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={() => setShowModal(true)}
    >
      Add User
    </button>
           
    </div>
   
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={"Add new User Form"}
    >
      <Form template={template} onSubmit={onSubmit}  />
    </Modal>
    <Table headers={allUsers.headers} data={users} deleteHandler={deleteUser} />
  </div>
  )
}

export default Users;