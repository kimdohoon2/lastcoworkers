import axios from '@/app/lib/instance';

type PostImageResponse = {
  url: string;
};
const postImage = async (img: FormData): Promise<PostImageResponse> => {
  const res = await axios.post<PostImageResponse>('images/upload', img, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export default postImage;
