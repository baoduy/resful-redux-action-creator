import RestClient from 'restful-action-creator';
const client = RestClient('https://jsonplaceholder.typicode.com/');
const postApi = client.create('posts');

export default {
  name: postApi.name,
  get: () => postApi.get(),
  getById: (id: number) => postApi.get({ pathParams: id }),
  getComments: (postId: number) =>
    postApi.get({ pathParams: [postId, 'comments'] }),
  getPostByUserId: (userId: number) => postApi.get({ params: { userId: 1 } }),
  create: (post: any) => postApi.post(post),
  update: (post: any) =>
    postApi.put({
      pathParams: post.id,
      data: post
    }),
  delete: (id: number) => postApi.delete({ pathParams: id })
};
