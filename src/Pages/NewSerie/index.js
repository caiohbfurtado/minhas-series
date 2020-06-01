import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function NewSerie() {
  const [serie, setSerie] = useState('');
  const history = useHistory();

  const onChange = evt => {
    setSerie(evt.target.value);
  }

  const save = () => {
    axios.post('/api/series', {name: serie}).then((res) =>{
      history.push('/series');
      });
  }

  return (
    <div className='container'>
      <h1>Nova Série:</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" value={serie} onChange={onChange} className="form-control" id="name" />
        </div>
        <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
        <button type="button" onClick={() => history.push('/series')} className="btn btn-danger ml-2">Voltar</button>
      </form>
    </div>
  );
}

export default NewSerie;