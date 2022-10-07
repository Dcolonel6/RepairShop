export function FactoryServerCommunication(url, method, body) {
    const BASE_URL = "https://backend-repair-shop.herokuapp.com";
    let config;
  
    switch (method) {
      case "POST":
        config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        };
        break;
      case "DELETE":
        config = {
          method: "DELETE",
        };
        break;
      case "PATCH":
        config = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        };
        break;
      default:
        config = {
          method: "GET",
        };
    }
    return async function (cb) {
      try{
          const response = await fetch(`${BASE_URL}${url}`,config);
          const data = await response.json()
         // console.log(data)
          if(cb){            
              cb(data)
          }
      }catch(error){
          console.log(`Something went wrong while sending ${method}`)
          console.log(error)
      }
      
    };
  }
  