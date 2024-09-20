import React, { useState } from 'react';
import api from '../Services/Api';
import styles from './Usuario.module.css';
import { Snackbar, Button } from '@mui/material';

function Usuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [snackColor, setSnackColor] = useState('error');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!nome || !email) {
            setMessage('Nome e E-mail são Obrigatórios');
            setOpen(true);
            setSnackColor('error');
            return;
        }

        try {
            await api.post('usuario/criar', { nome, email });
            setMessage('Usuário criado com sucesso!');
            setOpen(true);
            setSnackColor('success');

            setNome('');
            setEmail('');
        } catch (e) {
            setMessage('Erro ao criar usuário');
            setOpen(true);
            setSnackColor('error');
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <h1>NOVO USUÁRIO</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.form_label}>
                    Nome:
                    <input
                        type='text'
                        value={nome}
                        className='form-control'
                        onChange={(e) => setNome(e.target.value)}
                    />
                </label>
                <label className={styles.form_label}>
                    E-mail:
                    <input
                        type='email'
                        value={email}
                        className='form-control'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <button  className={styles.btn_primary}  type='submit'>Enviar</button>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={
                    <Button color={snackColor} onClick={handleClose}>
                        Fechar
                    </Button>
                }
            />
        </div>
    );
}

export default Usuario;
