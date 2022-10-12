/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query GetArticles($limit: Int) {\n    Article(order_by: { createdAt: desc }, limit: $limit) {\n      id\n      title\n      text\n      createdAt\n      updatedAt\n      Blog {\n        title\n      }\n    }\n  }\n": types.GetArticlesDocument,
    "\n  query GetBlogArticles($limit: Int, $id: uuid!) {\n    Blog(where: { id: { _eq: $id } }, limit: $limit) {\n      id\n      title\n      Articles {\n        id\n        text\n        title\n        createdAt\n        all_text\n        User {\n          name\n          id\n          email\n        }\n        Blog {\n          title\n        }\n      }\n    }\n  }\n": types.GetBlogArticlesDocument,
    "\n  query GetArticle($id: uuid!) {\n    Article(where: { id: { _eq: $id } }, order_by: { createdAt: desc }) {\n      id\n      title\n      text\n      createdAt\n      updatedAt\n      all_text\n      User {\n        name\n        id\n        email\n      }\n      Blog {\n        title\n      }\n    }\n  }\n": types.GetArticleDocument,
    "\n  query GetBlogs($limit: Int) {\n    Blog(order_by: { createdAt: desc }, limit: $limit) {\n      id\n      title\n      blog_users {\n        User {\n          name\n          id\n        }\n      }\n    }\n  }\n": types.GetBlogsDocument,
};

export function graphql(source: "\n  query GetArticles($limit: Int) {\n    Article(order_by: { createdAt: desc }, limit: $limit) {\n      id\n      title\n      text\n      createdAt\n      updatedAt\n      Blog {\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetArticles($limit: Int) {\n    Article(order_by: { createdAt: desc }, limit: $limit) {\n      id\n      title\n      text\n      createdAt\n      updatedAt\n      Blog {\n        title\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query GetBlogArticles($limit: Int, $id: uuid!) {\n    Blog(where: { id: { _eq: $id } }, limit: $limit) {\n      id\n      title\n      Articles {\n        id\n        text\n        title\n        createdAt\n        all_text\n        User {\n          name\n          id\n          email\n        }\n        Blog {\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBlogArticles($limit: Int, $id: uuid!) {\n    Blog(where: { id: { _eq: $id } }, limit: $limit) {\n      id\n      title\n      Articles {\n        id\n        text\n        title\n        createdAt\n        all_text\n        User {\n          name\n          id\n          email\n        }\n        Blog {\n          title\n        }\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query GetArticle($id: uuid!) {\n    Article(where: { id: { _eq: $id } }, order_by: { createdAt: desc }) {\n      id\n      title\n      text\n      createdAt\n      updatedAt\n      all_text\n      User {\n        name\n        id\n        email\n      }\n      Blog {\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetArticle($id: uuid!) {\n    Article(where: { id: { _eq: $id } }, order_by: { createdAt: desc }) {\n      id\n      title\n      text\n      createdAt\n      updatedAt\n      all_text\n      User {\n        name\n        id\n        email\n      }\n      Blog {\n        title\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query GetBlogs($limit: Int) {\n    Blog(order_by: { createdAt: desc }, limit: $limit) {\n      id\n      title\n      blog_users {\n        User {\n          name\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBlogs($limit: Int) {\n    Blog(order_by: { createdAt: desc }, limit: $limit) {\n      id\n      title\n      blog_users {\n        User {\n          name\n          id\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;