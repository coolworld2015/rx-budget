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
    </Route>
);