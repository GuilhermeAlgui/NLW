import React from 'react';


import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing1';



import OphanagesMap from './pages/OphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

import Login from './pages/Login'
import OrphanageList from './pages/OrphanageList'
import OrphanageEdit from './pages/OrphanageEdit'
import OrphanageConfirm from './pages/OrphanageConfirm'
import ForgotPassword from './pages/ForgotPassword'
import RememberPassword from './pages/RememberPassword'


function Routes(){
    return(
    
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/app" component={OphanagesMap}/>
            <Route path="/login" component={Login}/>
            <Route path="/ForgotPassword" component={ForgotPassword}/>
            <Route path="/password/:id" component={RememberPassword}/>

            <Route path="/orphanages/list" component={OrphanageList}/>

            <Route path="/orphanages/create" component={CreateOrphanage}/>
            <Route path="/orphanages/edit/:id" component={OrphanageEdit}/>
            <Route path="/orphanages/confirm/:id" component={OrphanageConfirm}/>
            <Route path="/orphanages/:id" component={Orphanage}/>
        </Switch> 

    </BrowserRouter>
    
    
    )
}

export default Routes;