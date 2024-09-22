import React, { useState, useEffect } from 'react';
import api from '../Services/Api';
import { Link } from 'react-router-dom';
import styles from "./UsuarioList.module.css";
import { Snackbar, Button } from '@mui/material';

function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [snackColor, setSnackColor] = useState('error');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/usuario');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setMessage('Erro ao carregar usuários.');
        setOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Você tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`usuario/remover/${id}`);
        setUsuarios(usuarios.filter(user => user.id !== id));
        setMessage('Usuário excluído com sucesso.');
        setSnackColor('success');
      } catch (error) {
        console.error('Erro ao excluir usuário: ', error);
        setMessage('Erro ao excluir usuário.');
      } finally {
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Usuários</h1>
      <button className={styles.btn_criar}>
        <Link className={styles.btn_link} to='/criar'>
          <i className='fas fa-plus'></i> CRIAR
        </Link>
      </button>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      ) : (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usuarios) && usuarios.length > 0 ? (
              usuarios.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={`/atualizar/${user.id}`} className={styles.btn_edit}>
                      <i className='fa fa-edit'></i> EDIT
                    </Link>
                    <button onClick={() => handleDelete(user.id)} className={styles.btn_delete}>
                      <i className='fa fa-trash'></i> EXCLUIR
                    </button>
                  </td>
                </tr>
              ))) : (
              <tr>
                <td colSpan="4">Nenhum usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={
          <Button color={snackColor} onClick={handleClose}>
            Fechar
          </Button>
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
}

export default UsuarioList;