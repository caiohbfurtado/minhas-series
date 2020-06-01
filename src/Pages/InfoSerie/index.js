import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Badge } from 'reactstrap';

function InfoSerie({ match }) {
  const history = useHistory();
  const [form, setForm] = useState({});
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
      })
  }, [])

  console.log(genres);

  useEffect(() => {
    axios.get(`/api/series/${match.params.id}`).then(res => {
      setData(res.data);
    })
  }, [match.params.id])

  useEffect(() => {
    axios.get(`/api/series/${match.params.id}`).then(res => {
      setForm(res.data)
    })
  }, [match.params.id])

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  }

  const save = () => {
    axios.put(`/api/series/${match.params.id}`, form).then(res => {
      history.push('/series/');
    })
  }

  const customHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  return (
    <div>
      <header style={customHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img className='img-fluid img-thumbnail' src={data.poster} alt={data.name} />
              </div>
              <div className="col-9">
                <h1 className='font-weight-light text-light'>{data.name}</h1>
                <div className='lead text-white'>
                  {data.status === 'Finalizado' && <Badge color='success'>Finalizado</Badge>} 
                  {data.status === 'Assistindo' && <Badge color='warning'>Assistindo</Badge>}
                </div>
                <div className='lead text-white'>
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {
        edit === false &&
        <div className="container mt-3">
          <button className='btn btn-primary' onClick={() => setEdit(!edit)}>Editar</button>
          <button className='btn btn-danger ml-2' onClick={() => history.push('/series')}>Voltar Para Séries</button>
        </div>
      }
      {
        edit === true &&
        <div className='container mt-3'>
          <h1>Informações da Série:</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comentários:</label>
              <input type="text" value={form.comments} onChange={onChange('comments')} className="form-control" id="comments" />
            </div>
            <div className="form-group">
              <label htmlFor="genres">Gêneros:</label>
              <select selected={form.genre} onChange={onChange('genre_id')} className="custom-select custom-select-lg mb-3" value={data.genre_id}>
                <option>Selecione um gênero</option>
                {
                  genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)
                }
              </select>
            </div>
            <div className="form-group">
              <div className="custom-control custom-radio">
                <input type="radio" id="assistindo" checked={form.status === 'Assistindo'} value='assistindo' name="status" className="custom-control-input" onChange={seleciona('Assistindo')}/>
                <label className="custom-control-label" htmlFor="assistindo">Assistindo</label>
              </div>
              <div className="custom-control custom-radio">
                <input type="radio" id="finalizado" checked={form.status === 'Finalizado'} value='finalizado' name="status" className="custom-control-input" onChange={seleciona('Finalizado')}/>
                <label className="custom-control-label mb-3" htmlFor="finalizado">Finalizado</label>
              </div>
              <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
              <button type="button" onClick={() => setEdit(!edit)} className="btn btn-danger ml-2">Cancelar</button>
            </div>
          </form>
        </div>
      }
    </div>

  );
}

export default InfoSerie;