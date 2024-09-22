import React from 'react';
import styles from './EditUsuario.module.css';
import { useFetchEdit } from '../hooks/useFetchEdit';

function EditUsuario() {
  const { id, nome, email, setNome, setEmail, handlerSubmit, isLoading, error } = useFetchEdit();

  return (
    <div className={styles.container}>
      <h1>Atualizar Usuário</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handlerSubmit}>
        <label>
          ID:
          <input type='number' value={id} readOnly />
        </label>
        <label>
          Nome:
          <input
            type='text'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <label>
          E-mail:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button
          className={styles.button_edit}
          type='submit'
          disabled={isLoading || !nome || !email} 
        >
          {isLoading ? 'Atualizando...' : 'Atualizar'}
        </button>
      </form>
    </div>
  );
}

export default EditUsuario;
