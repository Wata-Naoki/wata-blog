import React, { useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/header/SearchHeader";
import { Form } from "../Articles/blogArticle";
import { blogChoiceState } from "../../components/Atom/BlogChoiceAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { GET_ARTICLE, GET_BLOG_ARTICLES } from "../../queries/queries";
import { Loading } from "../../components/Loading/Loading";

const BLOGIDARTICLES_QUERY = gql`
  query articlesByBlog($blogId: String!) {
    articlesByBlog {
      mockBlogsIdArticles(blogId: $blogId) {
        id
        articleId
        blog
        title
        users
        createAt
        text
      }
    }
  }
`;

const BlogIdArticle = () => {
  const { id } = useParams();
  /* const { loading, error, data } = useQuery(BLOGIDARTICLES_QUERY, {
    variables: { blogId: id },
  }); */
  const blogState = useRecoilValue(blogChoiceState);
  // console.log(blogState);
  // console.log(data);
  // console.log(id);

  // if (id) {
  //   const { data: blogArticlesData, loading: blogArticlesLoading } = useQuery(
  //     GET_BLOG_ARTICLES,
  //     { variables: { where: { id: { _eq: id } } } }
  //   );
  // }
  const [numblog, setNumBlog] = useState(1);

  const onClickFetchBlog = () => {
    setNumBlog(numblog + 1);
    //console.log(num);
  };

  const [
    execute,
    {
      data: blogArticlesData,
      error: blogArticlesError,
      loading: blogArticlesLoading,
    },
  ] = useLazyQuery(GET_BLOG_ARTICLES);

  useEffect(() => {
    if (id) {
      execute({ variables: { id: id, limit: numblog } });
      // console.log(id);
      // console.log(blogArticlesData);
    }
  }, [execute, id, numblog]);

  //console.log(blogArticlesData);

  if (blogArticlesLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="flex justify-center">
        <div className="w-2/5">
          <div className="">
            <div className="flex justify-center ">
              <h3 className="text-2xl text-gray-500">
                {blogArticlesData?.Blog[0].title}
              </h3>
              {/* <h3>{blogState}</h3> */}
            </div>
            {blogArticlesData?.Blog[0].Articles.map((x: any) => (
              <div key={x.id}>
                <Link to={`/blogs/articles/${x.id}`}>
                  <h2 className="mt-8 text-2xl">{x.title}</h2>
                </Link>

                <div className="flex justify-between my-2 text-gray-500">
                  <h3>{x.User.name}</h3>
                  <h3>{x.createdAt}</h3>
                </div>
                <p>{x.text}</p>
              </div>
            ))}
            <div className="flex justify-center my-10">
              <button
                onClick={onClickFetchBlog}
                type="submit"
                className="bg-emerald-700 text-white text-sm py-2  px-4  font-medium rounded"
              >
                さらに読み込む
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogIdArticle;