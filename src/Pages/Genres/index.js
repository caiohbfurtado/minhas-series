import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Genres() {
  const [data, setData] = useState([]);
  const history = useHistory();

  const goToNewGenre = () => {
    history.push('/generos/novo');
  }

  const deleteGenre = id => {
    axios
    .delete(`api/genres/${id}`)
    .then(res => console.log('Deletado com sucesso.'))
  }

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setData(res.data.data)
      })
  }, [data])

  const renderRow = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td><button onClick={() => deleteGenre(record.id)}>Excluir</button></td>
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
        <button type="button" className="btn btn-primary" onClick={goToNewGenre}>Cadastrar primeiro gênero</button>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Gêneros</h1>
      <button type="button" className="btn btn-primary mb-2" onClick={goToNewGenre} >Novo Gênero</button>
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