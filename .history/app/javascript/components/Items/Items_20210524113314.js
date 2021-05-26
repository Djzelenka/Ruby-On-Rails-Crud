import React,  {useState, useEffect} from 'react';
import constants from '../../utilities/constants';
import httpFetchHelper from '../../utlities/httpHelper';


const Items = () => {
  const [items, setItems] = useState([])

  useEffect( ()=> {
    const url = "/items"

  })

  const getItems = async () => {
    const response = await httpFetchHelper(
      "/items", constants.GET_METHOD,
      )
  }

  return(
  <div> This is the index items view of the app </div>
  )
}

export default Items