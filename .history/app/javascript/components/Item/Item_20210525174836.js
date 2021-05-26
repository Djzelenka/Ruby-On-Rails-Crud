import React from 'react'

const Item = () => {


  useEffect(() => {
  const url = "/item:id"

  const getItem = async () => {
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
  getItem();
}, [])

  return <div> This is the indivdual item view of the app </div>
}

export default Item