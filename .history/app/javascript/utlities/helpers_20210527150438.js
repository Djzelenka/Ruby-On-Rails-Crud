  const numberCheck = (string) =>{
    if (string.match(/^\d{1,}(\.\d{0,4})?$/) ){
      return true;
    }
    else {
      return false;
    }
  } 

  export default numberCheck;