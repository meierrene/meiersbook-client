import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../services/apiPosts';

export const usePosts = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  // Ensure data is available before processing
  if (!data) return { isLoading, postsWithUsers: [], error };

  const { dataPosts, dataUsers } = data;

  // Merge the dataPosts and dataUsers based on the creator's ID
  const postsWithUsers = dataPosts.data.map(post => {
    const user = dataUsers.find(user => user.data._id === post.creator);
    return {
      ...post,
      creator: user
        ? {
            name: user.data.name,
            email: user.data.email,
            image: user.data.image,
            // thumbnail: user.data.thumbnail,
          }
        : null,
    };
  });
  return { isLoading, postsWithUsers, error };
};
