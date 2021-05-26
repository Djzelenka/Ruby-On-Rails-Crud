import React,  {useState, useEffect} from 'react';
import constants from '../../utlities/constants';
import httpFetchHelper from '../../utlities/httpHelper';


const Items = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = "/items"

    const getItems = async () => {
      const response = await httpFetchHelper(
      url, constants.GET_METHOD,
      );
      if (response.ok) {
        setItems(response.data.data);
        console.log(items);
      } else {
        setError(true)
      } 
    };  
    getItems();
  }, [items.length])

  const list = items.map( item => {
    return (<li key={item.id}>{item.attribute.name}</li>)
  })

  return (
    <>
       {error && <h2> oops something went wrong! </h2>}

      <div> This is the index items view of the app </div>  
    </>  
  );
}

export default Items