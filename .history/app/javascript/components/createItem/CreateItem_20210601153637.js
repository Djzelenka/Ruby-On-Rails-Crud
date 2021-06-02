import React, { useState} from 'react'
import { useHistory, Link } from 'react-router-dom';
import {Form, Button, Container } from 'react-bootstrap'
import httpFetchHelper from '../../utilities/httpHelper';
import constants from '../../utilities/constants';
import numberCheck from '../../utilities/helpers';


/**
 * @name CreateItem
 * @description renders a form to add an item to the database
 */
const CreateItem = () => {
  const [item, setItem] = useState({
    name: '',
    description: '',
    cost: '0'
  });

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
    msg: 'Item must be non-negative with a max of two decimal places',
    error: false 
  });

  const history = useHistory();

  /**
   * @name inputHandler
   * @description updates state of each form input.  
   * @param {event} e 
   */
  const inputHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name' :
        setItem({ ...item, name: value });
        setNameError({  ...nameError, error: false});
        break;
      case 'description' :
        setItem({ ...item, description: value });
        setDescriptionError({ ...descriptionError, error: false});
        break;
      case 'cost' :
        setItem({ ...item, cost: value });
        setCostError({ ...costError, error: false});
        break;
      default:
        break;
    }
  }

  /**
   * @name resetValidationErrors
   * @description helper function to reset all form validation errors in state.  
   */
  const resetValidationErrors = () => {
    setNameError({ ...nameError, error: false });
    setDescriptionError({ ...descriptionError, error: false });
    setCostError({ ...costError, error: false })
  }


  /**
   * @name handleSubmit
   * @description takes care of form validation, and sends backend post request.
   * @param {event} e 
   */
  const handleSubmit = async (e) => {
      e.preventDefault();

      resetValidationErrors();
      const url = '/items';
      const cost = item.cost;

      let formError = false

      if (item.name.length > 20 || item.name.length < 1 ) {
        formError = true;
        setNameError({ ...nameError, error: true });
      }
      if (item.description.length > 80 || item.description.length < 1 ){
        formError = true;
        setDescriptionError({ ...descriptionError, error: true });
      }
      if (item.cost < 0 || !numberCheck(item.cost) ) {
        formError = true;
        setCostError({ ...costError, error: true });
      }
      if (!formError) {
        setItem({ ...item, cost: parseFloat(cost) });
        const response =  await httpFetchHelper(url, constants.POST_METHOD, item);
        if (response.ok) {
          history.push('/');
        }
        else {
          setApiError(true);
        }
      }
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
          name='name'
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
          name='description'
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
          name='cost'
          type='input' 
          defaultValue='0'
          onChange={inputHandler}
          isInvalid={costError.error}
          />
          <Form.Control.Feedback type='invalid'>
            {costError.msg}
          </Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Button type="submit" variant='info' >Submit</Button>
      </Form>
      <br/>
      <Link to='/'>Back To Items</Link>
    </Container>
  </>
  )
}

export default CreateItem;