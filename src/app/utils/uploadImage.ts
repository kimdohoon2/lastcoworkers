import postImage from '@/app/lib/image/postImage';

const uploadImage = async (profile: File) => {
  if (!profile || !(profile instanceof File)) return null;

  const formData = new FormData();
  formData.append('image', profile);

  const { url } = await postImage(formData);
  return url;
};

export default uploadImage;
