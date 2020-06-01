import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Series() {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => {
        setData(res.data.data)
      })
  }, []);

  const goToNewSerie = () => {
    history.push('/series/novo');
  }

  const deleteSerie = id => {
    axios
    .delete(`api/series/${id}`)
    .then(res =>{
      setData(data.filter(item => item.id !== id));
    });
  }

  const renderRow = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteSerie(record.id)}>Excluir</button>
          <button className="btn btn-warning ml-3" onClick={() => history.push(`/series/info/${record.id}`)}>Info</button>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Séries</h1>
        <div className="alert alert-warning" role="alert">
          Não há nenhuma série cadastrada!
        </div>
        <button type="button" className="btn btn-primary" onClick={goToNewSerie}>Cadastrar primeira Série</button>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Séries</h1>
      <button type="button" className="btn btn-primary mb-2" onClick={goToNewSerie} >Nova Série</button>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NOME</th>
            <th scope="col">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
}

export default Series;