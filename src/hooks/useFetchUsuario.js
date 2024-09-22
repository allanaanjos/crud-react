import { useState, useEffect } from 'react';
import { getUsuarios } from '../Services/userService';

export const useFetchUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUsuarios();
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setError('Erro ao carregar usuários.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); 

  return { usuarios, loading, error };
};
