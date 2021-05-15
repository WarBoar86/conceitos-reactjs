import React from "react";

import "./styles.css";

import api from "./services/api";
import { useEffect, useState } from "react";

function App() {

  const [repositories, setRepositories] = useState([]);

 useEffect(()=>{

  api.get('repositories').then(response => {
    setRepositories(response.data);
  });

 },[]);


  async function handleAddRepository() {
    // TODO
    const response =  await api.post('repositories',{
      title: `project-${Date.now()}`,
      url: "https://github.com/...",
      techs:  ["Node.js", "..."],
    });
      setRepositories([...repositories,response.data]);
    
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`repositories/${id}`);


    const delId=repositories.findIndex(repository =>repository.id === id);
    
    if (delId >= 0) setRepositories(repositories.filter((repository)=> repository.id !== id));

    console.log(repositories);


  }

  return (
    <div>
      <ul data-testid="repository-list">
        

          { 
          
            repositories.map(repository => <li key={repository.id}> {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
                </li>)
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
