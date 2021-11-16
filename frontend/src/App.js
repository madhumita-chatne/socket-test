import React, {useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';

const App = () => {
    const [response, setResponse] = useState([]);
    const [name, setName] = useState('');
    const socket = useRef()

    useEffect(() => {
        socket.current = io.connect("http://localhost:4000");
        socket.current.on("status", data => {
          setResponse(data);
          console.log("data", data)
        });

        socket.current.on('heartbeat from other clients', (message) => {
            console.log(message)
        })
      }, []);

      useEffect(() => {
          socket.current.removeAllListeners('send heartbeat')

          socket.current.on("send heartbeat", () => {
              socket.current.emit("send heartbeat to client", name)
          })
      }, [name])

  return(
      <div className = "App">
          Logs
          <ul>
            {response.map(resp =>{
                return <li>{resp}</li>
            })}
          </ul>
          <input 
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <button 
            onClick={() => {
                socket.current.emit("get heartbeat")
            }}
          > get heartbeat </button>
      </div>
  )
  };

export default App;
