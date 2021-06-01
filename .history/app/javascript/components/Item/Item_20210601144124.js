import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom';
import constants from '../../utlities/constants';
import httpFetchHelper from '../../utlities/httpHelper';
import { Card, Container, Row, Col } from 'react-bootstrap';

/**
 * @name Item
 * @description renders an item details page
 */
const Item = () => {
  const params = useParams();
  const [error, setError] = useState(false);

  const [item, setItem] = useState({
    id: null,
    name: '',
    description: '',
    cost: 0
  });

  // Makes backend call to retrieve item information. and sets state error
  // if backend call fails   
  useEffect(() => {
    const url = `/items/${params.id}`

    const getItem = async (item) => {
      const response = await httpFetchHelper(
      url, constants.GET_METHOD,
      );
      if (response.ok) {
        const itemData = response.data.data      
        setItem({
          name: itemData.attributes.name, 
          description: response.data.data.attributes.description, 
          cost: response.data.data.attributes.cost, 
          id: itemData.id 
        })
      } else {
        setError(true)
      } 
    };  
    getItem(item);
  }, [params.id])


  return (
    <>
      {error && <h2> oops something went wrong! </h2>}
      <div> This is the indivdual item view of the app </div>
      <Container>
        <Card bg="dark" className="text-center" border="primary" text="white" key={item.id}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Card.Text>{'$'}{item.cost}</Card.Text>
            <Link to={`/item/edit/${item.id}`}>Update Item</Link>
          </Card.Body>
        </Card>
        <Row>
          <Col md={{ span: 3, offset: 3}}><Link to='/'>Back To Items</Link></Col>
        </Row>
      </Container>
    </>
  )
}

export default Item