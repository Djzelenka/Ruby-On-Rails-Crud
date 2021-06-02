import React,  {useState, useEffect} from 'react';
import constants from '../../utilities/constants';
import httpFetchHelper from '../../utilities/httpHelper';
import {Container, Card} from 'react-bootstrap';
import {BrowserRouter, Link} from 'react-router-dom'

/**
 * @name Items
 * @description the index view of items
 */
const Items = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  // Makes backend call to retrieve items.
  useEffect(() => {
    const url = "/items"

    const getItems = async () => {
      const response = await httpFetchHelper(
      url, constants.GET_METHOD,
      );
      if (response.ok) {
        setItems(response.data.data);
      } else {
        setError(true)
      } 
    };  
    getItems();
  }, [items.length])

  //Styling for div container 
  const divStyle = {
    paddingTop: '0px',
    paddingBottom: '30px',
    textAlign: 'center',
  };

  //Adds scrollablity to list of items.
  const ulStyle = {
    overflowY: 'scroll',
    maxHeight: '600px'
  }

  const list = items.map( item => {
    return (
    <div key={item.id}>
    <Card bg="dark" className="text-center" border="primary" text="white" key={item.id}>
      <Card.Body>
        <Card.Title>{item.attributes.name}</Card.Title>
        <Card.Text>{item.attributes.description}</Card.Text>
        <Card.Text>{'$'}{item.attributes.cost}</Card.Text>
        <Link to={`item/${item.id}`}>Select Item</Link>
      </Card.Body>
    </Card>
    <br/>
    </div>
    )
  })

  //renders an error message on the page if backend api call fails, else returns
  // the list of items
  return (
    <>
      {error && <h2> oops something went wrong! </h2>}
      <div> This is the index items view of the app </div> 
      <br/>
      <Container>
        <ul style={ulStyle}>{list}</ul>
        <div style={divStyle}>
          <Link  to={`item/create/new`}>Create New Item</Link>
        </div>          
      </Container>

    </>  
  );
}

export default Items;