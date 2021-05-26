import React,  {useState, useEffect} from 'react';
import constants from '../../utlities/constants';
import httpFetchHelper from '../../utlities/httpHelper';
import {Container, Row, Card, Button} from 'react-bootstrap';


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

  const onClick = () => {

  }

  const list = items.map( item => {
    return (
    <Card bg="Secondary" text="white" className="text-center" border="primary" key={item.id}>
      <Card.Body>
        <Card.Title>{item.attributes.name}</Card.Title>
        <Card.Text>{item.attributes.description}</Card.Text>
        <Card.Text>{'$'}{item.attributes.cost}</Card.Text>
        <Button variant="info" onClick={onClick}>Select Item</Button>
      </Card.Body>
    </Card>
    )
  })

  return (
    <>
       {error && <h2> oops something went wrong! </h2>}

      <div> This is the index items view of the app </div> 
      <ul>{list}</ul> 
    </>  
  );
}

export default Items