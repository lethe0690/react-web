const emInit = function () {
    return (dispatch)=> {
        fetch('https://peiwen-client-manager.193b.starter-ca-central-1.openshiftapps.com/v1/clients')
            .then((response) => response.json())
            .then((res) => {
                let list = res.map((item)=> {
                    return {id: item._id, name: item.name, email: item.email}
                });
                dispatch({type: 'EM_INIT', data: list});
                dispatch({type: 'EM_READY'});
            })
            .catch((error) => {
                dispatch({type: 'EM_INIT_ERROR', data: error})
            });
    }
};

const emAdd = function (name, email) {
    return (dispatch)=> {

        fetch('https://peiwen-client-manager.193b.starter-ca-central-1.openshiftapps.com/v1/clients', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    name: name,
                    email: email
                }
            )
        })
            .then((response)=>response.json())
            .then((res)=> {
                dispatch({type: 'EMPLOYEE_ADD', data: {id: res.id, name: name, email: email}});
                dispatch({type: 'EM_CLEANUP'});
                dispatch({type: 'MODAL_CLOSE'});
            })
            .catch((err)=> {
                dispatch({type: 'EM_ADD_ERROR', data: 'API error'});
            })
    }
};


const employeeListReducer = (state = {
    ready: false,
    list: [],
    isModalOpen: false,
    employeeName: "",
    employeeEmail: "",
    errorText: ""
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

        case 'EM_INIT':
            return Object.assign({}, state, {list: action.data});

        case 'EM_READY':
            return Object.assign({}, state, {ready: true});

        case 'EM_ADD_ERROR':
            return Object.assign({}, state, {errorText: action.data});

        case 'EM_ADD_ERROR_RESET':
            return Object.assign({}, state, {errorText: ""});

        default :
            return state;
    }
};


const mapStateToProps = state => {
    return {
        ready: state.employeeList.ready,
        list: state.employeeList.list,
        isModalOpen: state.employeeList.isModalOpen,
        employeeName: state.employeeList.employeeName,
        employeeEmail: state.employeeList.employeeEmail,
        errorText: state.employeeList.errorText
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        onOpenModal(){
            dispatch({type: 'MODAL_OPEN'});
        },
        onSubmitNewEmployee(name, email){
            dispatch(emAdd(name, email));
        },
        onCloseModal(){
            dispatch({type: 'MODAL_CLOSE'});
            dispatch({type: 'EM_ADD_ERROR_RESET'});
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


module.exports = {employeeListReducer, mapDispatchToProps, mapStateToProps, emInit};