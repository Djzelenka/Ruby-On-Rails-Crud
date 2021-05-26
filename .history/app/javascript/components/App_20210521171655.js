import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Items from "../components/Items/Items"
import Item from "../components/Item/Item"

const App = () => {
  return (
  <Switch>
    <Route exact path='/' component={Items}/>
    <Route exact path='/items/:id' component={Item}/>
  </Switch>
  )
}

export default App;