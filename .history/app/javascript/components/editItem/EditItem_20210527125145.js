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
  const [id, setId] = useState();

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
    const url = `/items/${params.id}`

    const getItem = async () => {
      const response = await httpFetchHelper(
      url, constants.GET_METHOD,
      );
      if (response.ok) {
        const itemData = response.data.data  
        console.log(itemData);     
        setItem({
          name: itemData.attributes.name, 
          description: response.data.data.attributes.description, 
          cost: response.data.data.attributes.cost, 
        })
        setId(params.id);
        console.log(response.data);
       
        console.log(item);
      } else {
        setError(true)
      } 
    };  
    getItem();
  }, [params.id])

  const inputHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name' :
        setItem({ ...item, name: value });
        setNameError(false);
        break;
      case 'description' :
        setItem({ ...item, description: value });
        setDescriptionError(false);
        break;
      case 'cost' :
        setItem({ ...item, cost: value});
        setCostError(false);
        break;
      default:
        break;
    }
  }

  const resetValidationErrors = () => {
    setNameError({ ...nameError, error: false });
    setDescriptionError({ ...descriptionError, error: false });
    setCostError({ ...costError, error: false })
  }

  const handleSubmit = async (e) => {
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
        debugger
        const response = await httpFetchHelper(url, constants.PUT_METHOD, item);
        console.log(response);
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


  if (apiError) {
    return <h1>Oops something went wrong</h1>
  } else { 

      return(
        <>
          <Container>
            <h2>Edit Item</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                name='name'
                type='input' 
                onChange={inputHandler}
                value={item.name}
                isInvalid={nameError.error}
                />
                <Form.Control.Feedback type='invalid'>
                  {nameError.msg}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="desciption">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                name='description'
                type='input'  
                onChange={inputHandler}
                value={item.description}
                isInvalid={descriptionError.error}
                />
                <Form.Control.Feedback type='invalid'>
                  {descriptionError.msg}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="cost">
                <Form.Label>Cost</Form.Label>
                <Form.Control 
                name='cost'
                type='number' 
                onChange={inputHandler}
                value={item.cost}
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
}

export default EditItem;