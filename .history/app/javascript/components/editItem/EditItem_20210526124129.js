import React, { useState, useEffect} from 'react'
import { useHistory, useParams, Link } from 'react-router-dom';
import {Form, Button, Container } from 'react-bootstrap'
import httpFetchHelper from '../../utlities/httpHelper';
import constants from '../../utlities/constants';

const EditItem = () => {
  const [item, setItem] = useState({
    name: '',
    description: '',
    cost: 0
  });
  const [id, setId] = useState(null);

  const [apiError, setApiError] = useState(false);
  const [nameError, setNameError] = useState({
    msg: 'Item name must between 1 and 20 characters',
    error: false
  });
  const [descriptionError, setDescriptionError] = useState({
    msg:  'Item description must be between 1 and 80 characters',
    error: false
  });
  const [costError, setCostError] = useState({
    msg: 'Item must be non-negative decimal',
    error: false 
  });
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const url = `/items`

    const getItem = async () => {
      const response = await httpFetchHelper(
      url, constants.GET_METHOD,
      );
      if (response.ok) {
        const itemData = response.data.data       
        setItem({ ...item, name: itemData.attributes.name });
        setItem({ ...item, description: response.data.data.attributes.description });
        setItem({ ...item, cost: response.data.data.attributes.cost });
        setId(itemData.id);
        console.log(response.data);
        console.log(itemData);
        console.log(item);
      } else {
        setError(true)
      } 
    };  
    getItem();
  }, [params.id])

  const inputHandler = (e) => {
    switch (e.target.controlId) {
      case 'itemName' :
        setItem({ ...item, name: e.target.value });
      case 'description' :
        setItem({ ...item, description: e.target.value });
      case 'cost' :
        setItem({ ...item, cost: e.target.value})
    }
  }

  const resetValidationErrors = () => {
    setNameError({ ...nameError, error: false });
    setDescriptionError({ ...descriptionError, error: false });
    setCostError({ ...costError, error: false })
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      resetValidationErrors();
      
      const url = `/items/${id}`
      
      let formError = false

      if (item.name.length > 20 || item.name.length < 1 ) {
        formError = true;
        setNameError({ ...nameError, error: true });
      }
      if (item.description.length > 80 || item.description.length < 1 ){
        formError = true;
        setDescriptionError({ ...descriptionError, error: true });
      }
      if (item.cost < 0) {
        formError = true;
        setCostError({ ...costError, error: true });
      }
      if (!formError) {
        httpFetchHelper(url, constants.PUT_METHOD, item);
        if (response.ok) {
          history.push(`/item/${id}`);
        }
        else {
          setApiError(true);
        }
      }
  }

  const handleDelete = async (id) => {
    const url = `/items/${id}`
      httpFetchHelper(url, constants.DELET_METHOD)
      history.push(`/items`);
  }

  return(
  <>
    {apiError && <h1>Oops something went wrong</h1>}
    <Container>
      <h2>Create New Item</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type='input' 
          onChange={inputHandler}
          isInvalid={nameError.error}
          />
          <Form.Control.Feedback type='invalid'>
            {nameError.msg}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="desciption">
          <Form.Label>Description</Form.Label>
          <Form.Control 
          type='input'  
          onChange={inputHandler}
          isInvalid={descriptionError.error}
          />
          <Form.Control.Feedback type='invalid'>
            {descriptionError.msg}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="cost">
          <Form.Label>Cost</Form.Label>
          <Form.Control 
          type='number' 
          onChange={inputHandler}
          isInvalid={costError.error}
          />
          <Form.Control.Feedback type='invalid'>
            {costError.msg}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant='info' >Submit</Button>
      </Form>
      <br/>
      <Button variant="danger" onClick={handleDelete}>Delete Item</Button>
      <br/>
      <Link to={`/item/${id}`}>Back to Item</Link>
    </Container>
  </>
  )
}

export default EditItem;