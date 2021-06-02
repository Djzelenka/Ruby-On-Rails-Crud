import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Items from "../components/Items/Items";
import Item from "../components/Item/Item";
import CreateItem from '../components/createItem/CreateItem';
import EditItem from '../components/editItem/EditItem';
import NotFound from '../components/notFound/NotFound';

const App = () => {
  return (
  <Switch>
    <Route exact path='/' component={Items}/>
    <Route exact path='/item/:id' component={Item}/>
    <Route exact path= '/item/edit/:id'component={EditItem}/>
    <Route exact path='/item/create/new' component={CreateItem}/>
    <Route path='*' component={NotFound}/>
  </Switch>
  )
}

export default App;