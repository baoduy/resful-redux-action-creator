import { AxiosPromise } from 'axios';
import RestClient from 'restful-action-creator';

const client = RestClient('http://jsonplaceholder.typicode.com/');
const postApi = client.create('posts');

export interface Post {
  userId: number;
  id: number;
  title: string;
  body?: string;
}

export default {
  name: postApi.name,
  get: (): AxiosPromise<Array<Post>> => postApi.get(),
  getById: (id: number): AxiosPromise<Post> =>
    postApi.get<Post>({ pathParams: id }),
  getComments: (postId: number) =>
    postApi.get<Post>({ pathParams: [postId, 'comments'] }),
  getPostByUserId: (userId: number): AxiosPromise<Array<Post>> =>
    postApi.get({ params: { userId } }),
  create: (post: any): AxiosPromise<Post> => postApi.post(post),
  update: (post: any): AxiosPromise<Post> =>
    postApi.put({
      pathParams: post.id,
      data: post
    }),
  delete: (id: number): AxiosPromise<Post> => postApi.delete({ pathParams: id })
};
