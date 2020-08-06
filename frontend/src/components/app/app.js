import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Main from '../pages/main';
import Post from '../pages/posts/post';
import Header from '../base/header';
import AddForm from '../pages/add-form/add-form';

function App() {
    return (
        <>
            <Header/>
            <Switch>
                <Route path="/post/:id"
                       render={({match}) => {
                           const {id} = match.params;
                           return <Post itemId={id}/>;
                       }}/>
                <Route path="/add" component={AddForm}/>
                <Route path="/" component={Main}/>
            </Switch>
        </>
    );
}

export default App;
