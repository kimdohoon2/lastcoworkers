import axios from '@/app/lib/instance';

export interface PostGroupData {
  image?: string;
  name: string;
}

type PostGroupResponse = {
  id: string;
};

const postGroup = async (data: PostGroupData): Promise<PostGroupResponse> => {
  const res = await axios.post<PostGroupResponse>('groups', data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return res.data;
};

export default postGroup;
