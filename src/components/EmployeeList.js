import React from 'react';
import ReactModal from 'react-modal'

import 'react-activity-indicator/src/activityindicator.css'
import ActivityIndicator from 'react-activity-indicator'
import Avatar from 'react-avatar';

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
                <Avatar className="avatar" name={item.name} size={40} round={true} textSizeRatio={1.75}/>

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
    employeeName, employeeEmail, onNameChanged, onEmailChanged, onSubmitNewEmployee, errorText,
    filterText,onFilter
    }) => (
    <div className="container">

        <div className="header">
            <h1>Employee List</h1>
        </div>

        <div className="bar">
            <input id='filter' type="text" placeholder="type name or email to filter" value={filterText}
                   onChange={(e)=>{onFilter(e.target.value)}}/>
            <img className="button-add" width="32" height="32" alt={'add-employee'} src={require("../asset/add.jpg")}
                 onClick={onOpenModal}/>
        </div>

        <div className="list">
            {generateList(list, onRemove, ready)}
        </div>

        <ReactModal
            isOpen={isModalOpen}
            contentLabel="Minimal Modal"
            style={{content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(169, 169, 169, 0.6)'
  }}}
            >

            <div>
                <div>
                    <input type="text" value={employeeName} placeholder="employee's name"
                           onChange={(e)=>{onNameChanged(e.target.value)}}/>
                </div>
                <div>
                    <input type="text" value={employeeEmail} placeholder="employee's email"
                           onChange={(e)=>{onEmailChanged(e.target.value)}}/>
                </div>
                <div className={'center-text'}>
                    <button onClick={()=>{onSubmitNewEmployee(employeeName,employeeEmail)}}>Submit</button>
                    <button onClick={onCloseModal}>Close</button>
                </div>
                {generateErrorText(errorText)}
            </div>

        </ReactModal>

    </div>

);

export default EmployeeList;


