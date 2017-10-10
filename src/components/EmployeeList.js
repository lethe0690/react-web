import React from 'react';
import ReactModal from 'react-modal'

const generateList = function (list, onRemove) {
    return list.map((item)=> {

        return (
            <div key={item.id}>
                <li> name: {item.name} </li>
                <li> email: {item.email} </li>

                <button onClick={(e)=>{onRemove(item.id)}}> remove</button>

            </div>);

    })
};


const EmployeeList = ({list, onRemove, onOpenModal, isModalOpen, onCloseModal, employeeName, employeeEmail, onNameChanged, onEmailChanged, onSubmitNewEmployee}) => (
    <div>
        <h1>Employee List</h1>
        <input type="button" value="add an employee" onClick={onOpenModal}/>

        {generateList(list, onRemove)}

        <ReactModal
            isOpen={isModalOpen}
            contentLabel="Minimal Modal"
        >
            <input type="text" value={employeeName} placeholder="employee's name"
                   onChange={(e)=>{onNameChanged(e.target.value)}}/>
            <input type="text" value={employeeEmail} placeholder="employee's email"
                   onChange={(e)=>{onEmailChanged(e.target.value)}}/>

            <button onClick={()=>{onSubmitNewEmployee(employeeName,employeeEmail)}}>Submit</button>
            <button onClick={onCloseModal}>Close</button>

        </ReactModal>

    </div>

);

export default EmployeeList;


