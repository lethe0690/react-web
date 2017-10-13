import React from 'react';
import ReactModal from 'react-modal'

import 'react-activity-indicator/src/activityindicator.css'
import ActivityIndicator from 'react-activity-indicator'

const generateList = function (list, onRemove, ready) {

    if (!ready) {
        return <ActivityIndicator
            number={5}
            diameter={40}
            borderWidth={1}
            duration={300}
            activeColor="#66D9EF"
            borderColor="white"
            borderRadius="50%"
        />
    }
    
    
    return list.map((item)=> {

        return (
            <div key={item.id} className="cell">

                <img className="avatar" alt={'avatar'} src={require("../asset/add.jpg")}/>

                <span className="cell-name">  {item.name} </span>
                <p className="cell-email">  {item.email} </p>

                <img className="cell-remove" alt={'remove'} src={require("../asset/minus.png")}
                     onClick={(e)=>{onRemove(item.id)}}/>

            </div>);

    })
};

const generateErrorText = function (text) {
    if (text === "") return;

    return <p style={{color:'red'}}>{text}</p>
};


const EmployeeList = ({
    ready, list, onRemove, onOpenModal, isModalOpen, onCloseModal,
    employeeName, employeeEmail, onNameChanged, onEmailChanged, onSubmitNewEmployee, errorText
}) => (
    <div className="container">

        <div className="header">
        <h1>Employee List</h1>
        </div>

        <div className="bar">
            <img className="button-add" width="32" height="32" alt={'add-employee'} src={require("../asset/add.jpg")}
                 onClick={onOpenModal}/>
        </div>

        <div className="list">
        {generateList(list, onRemove, ready)}
        </div>
            
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

            {generateErrorText(errorText)}

        </ReactModal>

    </div>

);

export default EmployeeList;


