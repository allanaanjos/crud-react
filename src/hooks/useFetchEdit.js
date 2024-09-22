import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Services/Api';

export const useFetchEdit = () => {
  const { id } = useParams(); 
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get(`/usuario/${id}`);
        setNome(response.data.nome);
        setEmail(response.data.email);
      } catch (e) {
        setError('Erro ao buscar usuário.');
      }
    };

    fetchUsuario();
  }, [id]);

  const handlerSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await api.put(`/usuario/atualizar/${id}`, { nome, email });
      navigate('/'); 
    } catch (e) {
      setError('Erro ao atualizar usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    id,
    nome,
    email,
    setNome,
    setEmail,
    handlerSubmit,
    isLoading,
    error,
    navigate
  };
};
