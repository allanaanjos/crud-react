import { useState } from 'react';
import api from '../Services/Api';

export const useFormUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (event, setMessage, setOpen, setSnackColor) => {
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

  return {
    nome,
    setNome,
    email,
    setEmail,
    errors,
    setErrors,
    isLoading,
    handleSubmit,
  };
};
