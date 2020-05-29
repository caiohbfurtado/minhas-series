import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function NewGenre() {
  const [genre, setGenre] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const onChange = evt => {
    setGenre(evt.target.value);
  }

  const save = () => {
    axios.post('/api/genres', {name: genre}).then((res) =>{
        setSuccess(true);
      });
  }

  if (success) {
    return history.push('/generos');
  }

  return (
    <div className='container'>
      <h1>Novo Gênero:</h1>
      <form onSubmit={save}>
        <div className="form-group">
          <label htmlFor="name">Gênero:</label>
          <input type="text" value={genre} onChange={onChange} className="form-control" id="name" />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
}

export default NewGenre;