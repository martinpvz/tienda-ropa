// const createUserAndGetId = async () => {
//     try {
//       const response = await fetch('http://localhost:3004/user', {method: 'GET',credentials: 'include'});
//       const data = await response.json();
//       return data.userId;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   console.log(createUserAndGetId());
  
  /*const addToCart = async (userId, productId) => {
    try {
      const response = await fetch('http://localhost:3004/addCart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };*/