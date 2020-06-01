import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function EditGenre({match}) {
  const [genre, setGenre] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get(`/api/genres/${match.params.id}`).then(res => {
      setGenre(res.data.name)
    })
  },[match.params.id])

  const onChange = evt => {
    setGenre(evt.target.value);
  }

  const save = () => {
    axios.put(`/api/genres/${match.params.id}`, {name: genre}).then(res => {
      history.push('/generos');
    })
  }

  return (
    <div className='container'>
      <h1>Editar Gênero:</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Gênero:</label>
          <input type="text" value={genre} onChange={onChange} className="form-control" id="name" />
        </div>
        <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
        <button type="button" onClick={() => history.push('/generos')} className="btn btn-danger ml-2">Voltar</button>
      </form>
    </div>
  );
}

export default EditGenre;