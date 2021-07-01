import React, { useState, useEffect} from 'react'
import { useHistory, useParams, Link } from 'react-router-dom';
import {Form, Button, Container } from 'react-bootstrap'
import httpFetchHelper from '../../utilities/httpHelper';
import constants from '../../utilities/constants';
import numberCheck from '../../utilities/helpers';


/**
 * @name EditItem
 * @description renders a form populated with item data used
 * to update the current item in the database.  
 */
const EditItem = () => {
  const [item, setItem] = useState({
    name: '',
    description: '',
    cost: '0'
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
    msg: 'Item cost must be non-negative with a max of two decimal places',
    error: false 
  });
  const params = useParams();
  const history = useHistory();

  // makes backend api call to populate the form with the current item data.  
  useEffect(() => {
    const url = `/items/${params.id}`

    const getItem = async () => {
      const response = await httpFetchHelper(
      url, constants.GET_METHOD,
      );
      if (response.ok) {
        const itemData = response.data.data      
        setItem({
          name: itemData.attributes.name, 
          description: response.data.data.attributes.description, 
          cost: `${response.data.data.attributes.cost}`, 
        })
        setId(parseInt(params.id));
      } else {
        setError(true)
      } 
    };  
    getItem();
  }, [params.id])

  /**
   * @name inputHandler
   * @description updates state of each input
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
   * @description helper function to reset validation errors in state
   */
  const resetValidationErrors = () => {
    setNameError({ ...nameError, error: false });
    setDescriptionError({ ...descriptionError, error: false });
    setCostError({ ...costError, error: false })
  }


  /**
   * @name submitHandler
   * @description takes care of form validation, and sends api request to backend.
   * @param {event} e 
   */
  const handleSubmit = async (e) => {
      e.preventDefault();
      resetValidationErrors();
      
      const url = `/items/${params.id}`;
      const cost = item.cost;
      let formError = false;

      if (item.name.length > 20 || item.name.length < 1 ) {
        formError = true;
        setNameError({ ...nameError, error: true });
      }
      if (item.description.length > 80 || item.description.length < 1 ){
        formError = true;
        setDescriptionError({ ...descriptionError, error: true });
      }
      if (item.cost < 0 || !numberCheck(cost)) {
        formError = true;
        setCostError({ ...costError, error: true });
      }
      if (!formError) {
        setItem({ ...item, cost: parseFloat(cost) });
        const response = await httpFetchHelper(url, constants.PUT_METHOD, item);
        if (response.ok) {
          history.push(`/item/${id}`);
        }
        else {
          setApiError(true);
        }
      }
  }

  /**
   * @name handleDelete
   * @description handles delete api call to backend.  
   */
  const handleDelete = () => {
    const url = `/items/${params.id}`;
      httpFetchHelper(url, constants.DELET_METHOD);
      history.push(`/`);
  }


  // renders error if backend call fails.  
  if (apiError) {
    return <h1>Oops something went wrong</h1>
  } 
  else { 

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
              type='input' 
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
          <br/>
          <Link to={`/item/${id}`}>Back to Item</Link>
        </Container>
      </>
    )
  }
}

export default EditItem;