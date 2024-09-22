import api from '../Services/Api';

export const getUsuarios = async () => {
  return await api.get('/usuario');
};

export const deleteUsuario = async (id) => {
  return await api.delete(`usuario/remover/${id}`);
};

