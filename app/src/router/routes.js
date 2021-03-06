import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './root';
import Main from './main';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';

import Users from '../users/users';
import UserAdd from '../users/userAdd';
import UserDetails from '../users/userDetails';
import UserDelete from '../users/userDelete';

import Projects from '../projects/projects';
import ProjectAdd from '../projects/projectAdd';
import ProjectDetails from '../projects/projectDetails';
import ProjectDelete from '../projects/projectDelete';

import Test from '../test/test';

import Departments from '../departments/departments';
import DepartmentAdd from '../departments/departmentAdd';
import DepartmentDetails from '../departments/departmentDetails';
import DepartmentDelete from '../departments/departmentDelete';

import Employees from '../employees/employees';
import EmployeeAdd from '../employees/employeeAdd';
import EmployeeDetails from '../employees/employeeDetails';
import EmployeeDelete from '../employees/employeeDelete';

import Inputs from '../inputs/inputs';
import InputAdd from '../inputs/inputAdd';
import InputDetails from '../inputs/inputDetails';
import InputDelete from '../inputs/inputDelete';

import Outputs from '../outputs/outputs';
import OutputAdd from '../outputs/outputAdd';
import OutputDetails from '../outputs/outputDetails';
import OutputDelete from '../outputs/outputDelete';

import Assets from '../assets/assets';

import Resources from '../resources/resources';
import ResourceAdd from '../resources/resourceAdd';
import ResourceDetails from '../resources/resourceDetails';
import ResourceDelete from '../resources/resourceDelete';

import Search from '../search/search';
import SearchResults from '../search/searchResults';
import SearchDetails from '../search/searchDetails';

export default (
    <Route path="/" component={Root}>
	
        <IndexRoute component={Main}/>
		<Route path="main" component={Main}/>
		
		<Route path="search" component={Search}/>
		<Route path="search-results">
            <Route path=":name/:type" component={SearchResults}/>
        </Route>
		<Route path="search-details" component={SearchDetails}/>
		
		<Route path="audit" component={Audit}/>
		<Route path="audit-details" component={AuditDetails}/>
		
		<Route path="users" component={Users}/>
		<Route path="user-add" component={UserAdd}/>
		<Route path="user-details" component={UserDetails}/>
		<Route path="user-delete">
            <Route path=":id/:name" component={UserDelete}/>
        </Route>
		
		<Route path="projects" component={Projects}/>
		<Route path="project-add" component={ProjectAdd}/>
		<Route path="project-details" component={ProjectDetails}/>
		<Route path="project-delete">
            <Route path=":id/:name" component={ProjectDelete}/>
        </Route>
		
		<Route path="test" component={Test}/>
				
		<Route path="departments" component={Departments}/>
		<Route path="department-add" component={DepartmentAdd}/>
		<Route path="department-details" component={DepartmentDetails}/>
		<Route path="department-delete">
            <Route path=":id/:name" component={DepartmentDelete}/>
        </Route>
		
		<Route path="employees" component={Employees}/>
		<Route path="employee-add" component={EmployeeAdd}/>
		<Route path="employee-details" component={EmployeeDetails}/>
		<Route path="employee-delete">
            <Route path=":id/:name" component={EmployeeDelete}/>
        </Route>
		
		<Route path="inputs" component={Inputs}/>
		<Route path="input-add" component={InputAdd}/>
		<Route path="input-details" component={InputDetails}/>
		<Route path="input-delete">
            <Route path=":id/:name" component={InputDelete}/>
        </Route>		
		
		<Route path="outputs" component={Outputs}/>
		<Route path="output-add" component={OutputAdd}/>
		<Route path="output-details" component={OutputDetails}/>
		<Route path="output-delete">
            <Route path=":id/:name" component={OutputDelete}/>
        </Route>
		
		<Route path="assets" component={Assets}/>
		
		<Route path="resources" component={Resources}/>
		<Route path="resource-add" component={ResourceAdd}/>
		<Route path="resource-details" component={ResourceDetails}/>
		<Route path="resource-delete">
            <Route path=":id/:name" component={ResourceDelete}/>
        </Route>
    </Route>
);