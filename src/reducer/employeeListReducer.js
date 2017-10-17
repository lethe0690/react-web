// register this variable to temp store the full list of result. only for the filter
// any action will affect the range of full list should modify this variable as well
let fullList = [];

//work as a heck to simulate some data when API call fails
let fakeList = [
    {id: 1, name: 'Adam Jhones', email: 'a@gmail.com'},
    {id: 2, name: 'Blaer Sana', email: 'b@gmail.com'},
    {id: 3, name: 'Catty Domes', email: 'c@gmail.com'},
    {id: 4, name: 'Don Mills', email: 'd@gmail.com'},
    {id: 5, name: 'Estelle Fang', email: 'e@gmail.com'},
    {id: 6, name: 'Ferry Coolma', email: 'F@gmail.com'},
    {id: 7, name: 'KK De', email: 'g@gmail.com'},
];


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
                dispatch({type: 'EM_INIT_ERROR', data: error});

                //work as a hack to add data if API call fail
                setTimeout(()=> {
                    dispatch({type: 'EM_INIT', data: fakeList});
                    dispatch({type: 'EM_READY'});
                }, 2000)
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
    errorText: "",
    filterText: ""
}, action) => {
    switch (action.type) {
        case 'EMPLOYEE_ADD':
        {
            fullList = [...fullList, action.data];
            return Object.assign({}, state, {list: fullList});
        }
        case 'EMPLOYEE_REMOVE':
        {
            fullList = fullList.filter((item)=> {
                return item.id !== action.data
            });

            return Object.assign({}, state, {
                list: fullList
            });
        }

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
        {
            fullList = action.data;
            return Object.assign({}, state, {list: fullList});
        }
        case 'EM_READY':
            return Object.assign({}, state, {ready: true});

        case 'EM_ADD_ERROR':
            return Object.assign({}, state, {errorText: action.data});

        case 'EM_ADD_ERROR_RESET':
            return Object.assign({}, state, {errorText: ""});

        case 'FILTER_UPDATED':
            return Object.assign({}, state, {list: filteredList(action.data)}, {filterText: action.data});

        case 'RESET_FILTER':
            return Object.assign({}, state, {filterText: ""});

        default :
            return state;
    }
};

const filteredList = (filterText)=> {
    if (filterText === "") return fullList;
    return fullList.filter((item)=> {
        return (item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.email.toLowerCase().includes(filterText.toLowerCase()));
    })
};


const mapStateToProps = state => {
    return {
        ready: state.employeeList.ready,
        list: state.employeeList.list,
        isModalOpen: state.employeeList.isModalOpen,
        employeeName: state.employeeList.employeeName,
        employeeEmail: state.employeeList.employeeEmail,
        errorText: state.employeeList.errorText,
        filterText: state.employeeList.filterText
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        onOpenModal(){
            dispatch({type: 'MODAL_OPEN'});
        },
        onSubmitNewEmployee(name, email){
            dispatch(emAdd(name, email));
            dispatch({type: 'RESET_FILTER'});
        },
        onCloseModal(){
            dispatch({type: 'MODAL_CLOSE'});
            dispatch({type: 'EM_ADD_ERROR_RESET'});
        },
        onRemove(id){
            dispatch({type: 'EMPLOYEE_REMOVE', data: id});
            dispatch({type: 'RESET_FILTER'});
        },
        onNameChanged(name){
            dispatch({type: 'EMNAME_UPDATED', data: name});
        },
        onEmailChanged(email){
            dispatch({type: 'EMEMAIL_UPDATED', data: email});
        },
        onFilter(filterText){
            dispatch({type: 'FILTER_UPDATED', data: filterText});
        }
    }
};


module.exports = {employeeListReducer, mapDispatchToProps, mapStateToProps, emInit};