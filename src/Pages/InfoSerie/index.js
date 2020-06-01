import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function InfoSerie({ match }) {
  const [serieName, setSerieName] = useState('');
  const [data, setData] = useState({});
  const history = useHistory();

  useEffect(() => {
    axios.get(`/api/series/${match.params.id}`).then(res => {
      setData(res.data);
    })
  }, [match.params.id])

  useEffect(() => {
    axios.get(`/api/series/${match.params.id}`).then(res => {
      setSerieName(res.data.name)
    })
  }, [match.params.id])

  const onChange = evt => {
    setSerieName(evt.target.value);
  }

  const save = () => {
    axios.put(`/api/series/${match.params.id}`, { name: serieName }).then(res => {
      history.push('/series');
    })
  }

  return (
    <div className='container'>
      <h1>Informações da Série:</h1>
      <pre>{JSON.stringify(data)}</pre>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" value={serieName} onChange={onChange} className="form-control" id="name" />
        </div>
        <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
        <button type="button" onClick={() => history.push('/series')} className="btn btn-danger ml-2">Voltar</button>
      </form>
    </div>
  );
}

export default InfoSerie;