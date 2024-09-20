import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Services/Api';
import styles from './EditUsuario.module.css'

function EditUsuario() {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`usuario/${id}`);
                setNome(response.data.nome || ''); 
                setEmail(response.data.email || ''); 
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handlerSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`usuario/atualizar/${id}`, { nome, email });
            setNome('');
            setEmail('');
            navigate('/');

        } catch (error) {
            console.error('Erro ao atualizar o usuário', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Atualizar Usuário</h1>
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
                <button className={styles.button_edit} type='submit'>Atualizar</button>
            </form>
        </div>
    );
}

export default EditUsuario;
