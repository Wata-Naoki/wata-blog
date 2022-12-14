import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { GET_BLOG } from "../../queries";
import { BlogHeader } from "../../components/header/BlogHeader";
import { Header } from "../../components/header/SearchHeader";
import { Loading } from "../../components/loading/Loading";
import { Sidebar } from "../../components/sidebar/navbar";
import { formatJst } from "../../components/formatJst/FormatJst";
import { Pagination } from "../../components/ui/pagination/pagination";

const ADMINARTICLESBYBLOG_QUERY = gql`
  query adminArticlesByBlog {
    adminArticlesByBlog {
      mockAdminBlogsArticles {
        mockMyBlogs {
          id
        }
        blog
        id
        title
        user
        createAt
        text3
      }
    }
  }
`;

export const AdminBlogsId = () => {
  // const { loading, error, data } = useQuery(ADMINARTICLESBYBLOG_QUERY);
  const { id } = useParams();
  const navigate = useNavigate();
  //const [adminBlogFlag, setAdminBlogFlag] = useRecoilState(adminBlogState);

  const [numblog, setNumBlog] = useState<number>(1);
  const [
    executeBlog,
    { data: blogData, error: blogError, loading: blogLoading, refetch },
  ] = useLazyQuery(GET_BLOG);

  const onClickFetchBlog = () => {
    setNumBlog(numblog + 1);
  };

  useEffect(() => {
    // if (id='1bf773a5-9c62-43bc-b5ce-43633fdb3b14') {
    /* refetch({
      variables: { id: id, limit: numblog },
    }); */

    if (id === "undefined") {
      navigate("/authentication");
    }

    executeBlog({
      variables: { id: id, limit: numblog },
    });

    // }
  }, [executeBlog, numblog, id]);

  if (blogLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <BlogHeader blogTitle={blogData?.Blog[0].title} />
      </div>

      <div className="flex justify-start w-screen ">
        <div className="w-1/4">
          <Sidebar />
        </div>

        <div className="flex justify-center w-6/12 px-12 mt-4 ml-12 gap-y-8">
          {/* ?????????????????????????????????????????? */}
          <div className="w-full">
            <div className="flex flex-col gap-y-6">
              {blogData?.Blog[0].Articles.map((x: any) => (
                <div key={x.id}>
                  <Link
                    className="w-full"
                    to={`/admin/blogs/${id}/articles/${x.id}`}
                    /* onClick={() => {setBlogIdStateValue(`/admin/blogs/${id}/articles/${x.id}`)}} */ state={{
                      title: x.title,
                      text: x.text,
                    }}
                  >
                    <h2 className="w-full mt-8 text-2xl whitespace-pre-wrap ">
                      {x.title}
                    </h2>
                  </Link>

                  <div className="flex justify-between w-full pr-10 my-5">
                    <h3 className="text-gray-500">
                      {blogData.Blog[0].blog_users[0].User.name}
                    </h3>
                    <h3 className="mr-5 text-gray-500">
                      {formatJst(x.createdAt)}
                    </h3>
                  </div>

                  <p className="whitespace-pre-wrap">{x.text}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center my-14">
              <Pagination onClickFetchBlog={onClickFetchBlog} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
