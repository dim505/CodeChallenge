import React from "react";
import "./App.css";
import { Employee } from "./models/Models";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeDetail } from "./components/EmployeeDetail";
import { DepartmentList } from "./components/DepartmentList";
import { DepartmentDetails } from "./components/DepartmentDetails";
import DepartmentMembers from "./components/DepartmentMembers"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

type AppProps = {};
type AppState = {
  selectedEmployee: Employee | null;
};

export class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    // optional second annotation for better type inference
    selectedEmployee: null,
  };

  render() {
    return (
      <Router>
        <header>
			  	<Typography variant="h4" gutterBottom component="div">
			      	Employee Directory 
          </Typography>
          <ul>
            <li>
              <Link to="/employees">Employees</Link>
              <Link to="/employees"><Button
							classes={{root: "NavButton"}}
							>Employees</Button></Link>
            </li>
            <li>
              <Link to="/departments"><Button classes={{root: "NavButton"}}>Departments</Button> </Link>
            </li>
						<li>
              <Link to="/DepartmentMembers"><Button  classes={{root: "NavButton"}}>Department Members</Button> </Link>
            </li>
          </ul>
        </header>
        <div className="mainContent">
          <Switch>
            <Route path="/employees">		
              <EmployeeList />			
            </Route>
            <Route path="/employee/:id">
              <EmployeeDetail />
            </Route>
            <Route path="/departments">
              <DepartmentList />
            </Route>
            <Route path="/department/:id">
              <DepartmentDetails />
            </Route>
            <Route path="/DepartmentMembers">
                 <DepartmentMembers />
             </Route>
            <Route path="/">
              <EmployeeList />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
