import instance from '../instance';

export default async function deleteUser() {
  const { data } = await instance.delete('user');
  return data;
}
