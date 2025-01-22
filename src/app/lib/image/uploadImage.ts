import axios from '@/app/lib/instance';

const uploadImage = (img: FormData) => {
  const res = axios.post('images/upload', img, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return res;
};

export default uploadImage;
