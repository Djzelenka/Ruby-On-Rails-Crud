import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom';

const Item = () => {
  const history = useHistory();
  const params = useParams();

  const [item, setItem] = useState({
    id: null,
    name: '',
    description: '',
    cost: ''
  })

  useEffect(() => {

   
  const url = `/items/:${params.id}`

  const getItem = async () => {
    const response = await httpFetchHelper(
    url, constants.GET_METHOD,
    );
    if (response.ok) {
      setItem(response.data.data);
      console.log(item);
    } else {
      setError(true)
    } 
  };  
  getItem();
}, [])

  return <div> This is the indivdual item view of the app </div>
}

export default Item