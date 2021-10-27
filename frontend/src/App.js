import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

const App = () => {
    const [response, setResponse] = useState([]);
    let socket;
    useEffect(() => {
         socket = io.connect("http://localhost:4000");
        socket.on("status", data => {
          setResponse(data);
          console.log("data", data)
        });
      }, []);

  return(
      <div className = "App">
          Logs
          <ul>
         {response.map(resp =>{
             return <li>{resp}</li>
         })}
          </ul>
      </div>
  )
  };

export default App;
