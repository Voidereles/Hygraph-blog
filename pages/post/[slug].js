import React from "react";
import { useRouter } from "next/router";
import { getPosts, getPostDetails } from "../../services";
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from "../../components";

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  //in nextjs if you have dynamic url like [slug] yo uneed getStaticPaths
  return (
    <div className="container mx-auto lg:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: { post: data }, //this post goes to 5th line to function
  };
}
export async function getStaticPaths() {
  const posts = await getPosts(); // getPosts is garphql query

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    // we need to specify what kind of articles are we gonna have
    // with this next js app knows everything
    fallback: true,
  };
}
