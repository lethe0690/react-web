const fakeList = [
    {id: 1, name: 'a', email: 'a@gmail.com'},
    {id: 2, name: 'b', email: 'b@gmail.com'},
    {id: 3, name: 'c', email: 'c@gmail.com'},
];


const employeeListReducer = (state = {
    list: fakeList,
    isModalOpen: false,
    employeeName: "",
    employeeEmail: ""
}, action) => {
    switch (action.type) {
        case 'EMPLOYEE_ADD':
            return Object.assign({}, state, {list: [...state.list, action.data]});
        case 'EMPLOYEE_REMOVE':
            return Object.assign({}, state, {
                list: state.list.filter((item)=> {
                    return item.id !== action.data
                })
            });

        case 'MODAL_OPEN':
            return Object.assign({}, state, {isModalOpen: true});
        case 'MODAL_CLOSE':
            return Object.assign({}, state, {isModalOpen: false});

        case 'EMNAME_UPDATED':
            return Object.assign({}, state, {employeeName: action.data});
        case 'EMEMAIL_UPDATED':
            return Object.assign({}, state, {employeeEmail: action.data});

        case 'EM_CLEANUP':
            return Object.assign({}, state, {employeeName: ""}, {employeeEmail: ""});

        default :
            return state;
    }
};


const mapStateToProps = state => {
    return {
        list: state.employeeList.list,
        isModalOpen: state.employeeList.isModalOpen,
        employeeName: state.employeeList.employeeName,
        employeeEmail: state.employeeList.employeeEmail,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        onOpenModal(){
            dispatch({type: 'MODAL_OPEN'});
        },
        onSubmitNewEmployee(name, email){
            dispatch({type: 'EMPLOYEE_ADD', data: {id: 4, name: name, email: email}});
            dispatch({type: 'EM_CLEANUP'});
            dispatch({type: 'MODAL_CLOSE'});
        },
        onCloseModal(){
            dispatch({type: 'MODAL_CLOSE'});
        },
        onRemove(id){
            dispatch({type: 'EMPLOYEE_REMOVE', data: id});
        },
        onNameChanged(name){
            dispatch({type: 'EMNAME_UPDATED', data: name});
        },
        onEmailChanged(email){
            dispatch({type: 'EMEMAIL_UPDATED', data: email});
        }
    }
};


module.exports = {employeeListReducer, mapDispatchToProps, mapStateToProps};