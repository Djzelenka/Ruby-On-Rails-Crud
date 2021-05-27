import React, {useEffect, useState} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom';
import constants from '../../utlities/constants';
import httpFetchHelper from '../../utlities/httpHelper';
import { Card, Container } from 'react-bootstrap';

const Item = () => {
  const history = useHistory();
  const params = useParams();
  const [error, setError] = useState(false);

  const [item, setItem] = useState({
    id: null,
    name: '',
    description: '',
    cost: 0
  });
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const url = `/items/${params.id}`

    const getItem = async (item) => {
      const response = await httpFetchHelper(
      url, constants.GET_METHOD,
      );
      if (response.ok) {
        const itemData = response.data.data    
        debugger   
        setItem({
          name: itemData.attributes.name, 
          description: response.data.data.attributes.description, 
          cost: response.data.data.attributes.cost, 
          id: itemData.id 
        })
        console.log(response.data);
        console.log(itemData);
      } else {
        setError(true)
      } 
    };  
    getItem(item);
    setTimeout(() => console.log({item}), 1000);
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
          <Col md={{ span: 3, offset: 3}}><Link to='/items'>Back To Items</Link></Col>
        </Row>
      </Container>
    </>
  )
}

export default Item