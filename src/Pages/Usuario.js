import React from 'react';
import { Snackbar, Button } from '@mui/material';
import { useFormUsuario } from '../hooks/useFormUsuario';
import { useSnackbar } from '../hooks/useSnackBar';
import styles from './Usuario.module.css';

function Usuario() {
  const { nome, setNome, email, setEmail, errors, setErrors, isLoading, handleSubmit } = useFormUsuario();
  const { open, setOpen, message, setMessage, snackColor, setSnackColor, handleClose } = useSnackbar();

  return (
    <div>
      <h1>NOVO USUÁRIO</h1>
      <form className={styles.form} onSubmit={(event) => handleSubmit(event, setMessage, setOpen, setSnackColor)}>
        <label className={styles.form_label}>
          Nome:
          <input
            type='text'
            value={nome}
            className={`form-control ${errors.nome ? styles.input_error : ''}`}
            onChange={(e) => setNome(e.target.value)}
            onFocus={() => setErrors((prev) => ({ ...prev, nome: undefined }))}
          />
          {errors.nome && <span className={styles.error_message}>{errors.nome}</span>}
        </label>
        <label className={styles.form_label}>
          E-mail:
          <input
            type='email'
            value={email}
            className={`form-control ${errors.email ? styles.input_error : ''}`}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
          />
          {errors.email && <span className={styles.error_message}>{errors.email}</span>}
        </label>
        <button
          className={styles.btn_primary}
          type='submit'
          disabled={isLoading || !nome || !email}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={
          <Button sx={{ color: snackColor === 'success' ? 'green' : 'red' }} onClick={handleClose}>
            Fechar
          </Button>
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
}

export default Usuario;
