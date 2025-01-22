import axios from '@/app/lib/instance';

export interface PostGroupData {
  image?: string;
  name: string;
}

const postGroup = async (data: PostGroupData) => {
  const res = await axios.post('groups', data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return res;
};

export default postGroup;
