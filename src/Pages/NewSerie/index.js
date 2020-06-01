import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function NewSerie() {
  const [form, setForm] = useState({
    name: ''
  });
  const [genres, setGenres] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get('/api/genres').then(res=>{setGenres(res.data.data)})
  },[])

  const onChange = field => evt => {
    setForm(
      {...form,
      [field]: evt.target.value}
    )
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  const save = () => {
    axios.post('/api/series', form).then((res) => {
      history.push('/series');
    });
  }

  return (
    <div className='container'>
      <h1>Nova Série:</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="genres">Gêneros:</label>
          <select selected={form.genre} onChange={onChange('genre_id')} className="custom-select custom-select-lg mb-3">
            <option>Selecione um gênero</option>
            {
              genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)
            }
          </select>
        </div>
        <div className="form-group">
          <div className="custom-control custom-radio">
            <input type="radio" id="assistindo" checked={form.status === 'Assistindo'} value='assistindo' name="status" className="custom-control-input" onChange={seleciona('Assistindo')} />
            <label className="custom-control-label" htmlFor="assistindo">Assistindo</label>
          </div>
          <div className="custom-control custom-radio">
            <input type="radio" id="finalizado" checked={form.status === 'Finalizado'} value='finalizado' name="status" className="custom-control-input" onChange={seleciona('Finalizado')} />
            <label className="custom-control-label mb-3" htmlFor="finalizado">Finalizado</label>
          </div>
          <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
          <button type="button" onClick={() => history.push('/series')} className="btn btn-danger ml-2">Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default NewSerie;