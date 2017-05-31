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

export default (
    <Route path="/" component={Root}>
	
        <IndexRoute component={Main}/>
		<Route path="main" component={Main}/>
		
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
    </Route>
);