import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Genres() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const renderRow = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td><button>+</button></td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Gêneros</h1>
        <div className="alert alert-warning" role="alert">
          Não há nenhum gênero cadastrado!
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Gêneros</h1>
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

export default Genres;