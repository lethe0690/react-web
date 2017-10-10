import  {connect} from 'react-redux';

import EmployeeList from '../components/EmployeeList'

const employeeListReducer = require('../reducer/employeeListReducer');

const InteractiveEmployeeList = connect(
    employeeListReducer.mapStateToProps,
    employeeListReducer.mapDispatchToProps
)(EmployeeList);

export default  InteractiveEmployeeList