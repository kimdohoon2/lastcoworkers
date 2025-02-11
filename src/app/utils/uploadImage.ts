import postImage from '@/app/lib/image/postImage';

const uploadImage = async (profile: FileList) => {
  if (!profile || !(profile[0] instanceof File)) return null;

  const formData = new FormData();
  formData.append('image', profile[0]);

  const { url } = await postImage(formData);
  return url;
};

export default uploadImage;
