import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Items from "../components/Items/Items"
import Item from "../components/Item/Item"
import CreateItem from '../components/createItem/CreateItem'

const App = () => {
  return (
  <Switch>
    <Route exact path='/items' component={Items}/>
    <Route exact path='/item/:id' component={Item}/>
    <Route exact path= '/item/edit/:id'component={Item}/>
    <Route exact path='/items/create' component={CreateItem}/>
    <Route path='*' component={notFound}/>
  </Switch>
  )
}

export default App;