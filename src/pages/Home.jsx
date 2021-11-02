import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import { FETCH_POSTS_QUERY, FETCH_USERS_QUERY } from "../util/graphql";
import PostForm from "../components/PostForm.jsx";
import "../App.scss";

export default function Home() {
  const { user } = useContext(AuthContext);
  const FETCH_ALL = () => {
    const FETCH_POSTS = useQuery(FETCH_POSTS_QUERY);
    const FETCH_USERS = useQuery(FETCH_USERS_QUERY);
    return [FETCH_POSTS];
  };
  const [{ loading, data: { getPosts: posts } = {} }] = FETCH_ALL();
  //if the environment is not dev
  var environment = process.env.NODE_ENV;
  if (environment !== "development") {
    console.log("not in dev");
    return <h1>IN DEVELOPMENT</h1>;
  }
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column width={13}>
            <PostForm />
          </Grid.Column>
        )}
        {loading && <h1>Loading posts...</h1>}
        {
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column
                  key={post.id}
                  style={{ marginBottom: 20 }}
                  width={15}
                >
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        }
      </Grid.Row>
    </Grid>
  );
}
