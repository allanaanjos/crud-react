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
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};

        if (!nome) {
            formErrors.nome = 'O nome é obrigatório';
        } else if (nome.length < 3) {
            formErrors.nome = 'O nome deve ter pelo menos 3 caracteres';
        }


        if (!email) {
            formErrors.email = 'O e-mail é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formErrors.email = 'Formato de e-mail inválido';
        }

        return formErrors;
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        setIsLoading(true);


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
        } finally {
            setIsLoading(false);
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
                    <Button color={snackColor} onClick={handleClose}>
                        Fechar
                    </Button>
                }
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </div>
    );
}

export default Usuario;
