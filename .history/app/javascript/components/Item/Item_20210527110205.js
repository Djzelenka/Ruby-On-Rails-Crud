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

    const getItem = async () => {
      const response = await httpFetchHelper(
      url, constants.GET_METHOD,
      );
      if (response.ok) {
        const itemData = response.data.data       
        setItem({ item, name: itemData.attributes.name, description: response.data.data.attributes.description, cost: response.data.data.attributes.cost, id: itemData.id })
        // setItem({ ...item, name: itemData.attributes.name });
        // setItem({ ...item, description: response.data.data.attributes.description });
        // setItem({ ...item, cost: response.data.data.attributes.cost });
        // setItem({ ...item, id: itemData.id });
        console.log(response.data);
        console.log(itemData);
        console.log(item);
      } else {
        setError(true)
      } 
    };  
    getItem();
  }, [params.id])


  return (
    <>
      {error && <h2> oops something went wrong! </h2>}
      <div> This is the indivdual item view of the app </div>
      <Container>
        <Card bg="dark" className="text-center" border="primary" text="white" key={item}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Card.Text>{'$'}{item.cost}</Card.Text>
            <Link to={`/item/edit/${item.id}`}>Update Item</Link>
          </Card.Body>
        </Card>
        <Link to='/items'>Back To Items</Link>
      </Container>
    </>
  )
}

export default Item