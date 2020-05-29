import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function NewGenre() {
  const [genre, setGenre] = useState('');
  const history = useHistory();

  const onChange = evt => {
    setGenre(evt.target.value);
  }

  const save = () => {
    axios.post('/api/genres', {name: genre}).then((res) =>{
      history.push('/generos');
      });
  }

  return (
    <div className='container'>
      <h1>Novo Gênero:</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Gênero:</label>
          <input type="text" value={genre} onChange={onChange} className="form-control" id="name" />
        </div>
        <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
}

export default NewGenre;