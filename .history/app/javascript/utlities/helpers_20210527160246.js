  const numberCheck = (string) =>{
    if (string && string.match(/^\s*-?\d+(\.\d{1,2})?\s*$/) ){
      return true;
    }
    else {
      return false;
    }
  } 

  export default numberCheck;