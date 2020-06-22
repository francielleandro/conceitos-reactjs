import React, {useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories,setRepositories] = useState([]);

  async function handleAddRepository() {
    api.post('/repositories',{
      title:`Novo Projeto ${Date.now()}`,
      owner:'Franciel Leandro',
      techs:'ReactJs',
      likes:0
    }).then((response) =>{
        const repository = response.data;
        setRepositories([...repositories,repository]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then((response) =>{
      const rep = repositories.filter( repository => repository.id != id);
      setRepositories(rep);
    })
  }

  useEffect(()=>{
    api.get('/repositories').then((response) =>{
        const repository = response.data;
        setRepositories(repository);
    })
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 

          <li key={repository.id}>
            {repository.title}
  
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
    
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
