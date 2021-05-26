import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import {Form, Button } from 'react-bootstrap'

const ItemForm = () => {
  const [item, setItem] = useState({
    name: '',
    description: '',
    cost: 0
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
    msg: 'Item must be non-negative decimal',
    error: false 
  });

  const history = useHistory();

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

  const handleSubmit = () => {
    if ( nameError.error || descrpitionError.error || costError.error ) {

    }
  }

  return(
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
        type='input' 
        onChange={inputHandler}
        isInvalid={costError.error}
        />
        <Form.Control.Feedback type='invalid'>
          {costError.msg}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default ItemForm;