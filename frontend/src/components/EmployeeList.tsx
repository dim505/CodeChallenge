import React from "react";
import { Employee } from "../models/Models";
import api from "../utils/api";
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';

type EmployeeListProps = {};
type EmployeeListState = {
  allEmployees?: Employee[];
};

export class EmployeeList extends React.Component<
  EmployeeListProps,
  EmployeeListState
> {
  state: EmployeeListState = { };

  componentDidMount() {
	  const self = this
	  api.listEmployees()
	  .then(employees => self.setState({allEmployees: employees}))
  }

  render() {
    return (
			<Fade in={true}>
			<div className="employee_list_page">
			<h2>Employee List</h2>
			<ul>
				{ !this.state.allEmployees && (
					<LinearProgress />
				)}
				{this.state.allEmployees?.map((employee)=> <EmployeeDetail key={employee.id} employee={employee}/>)}
			</ul>
			</div>
			</Fade>
		);
  }
}

type EmployeeDetailProps = {
  employee: Employee;
}; 

const EmployeeDetail = ({ employee }: EmployeeDetailProps) => {
	return (
		<li className="employee_detail">
			      <p>{employee.name}</p>
		</li>
	)
}
