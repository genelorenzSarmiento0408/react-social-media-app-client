import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/auth";

import LikeButton from "./LikeButton";
import "../App.scss";
import DeleteButton from "./DeleteButton";
import PopupGlobal from "../util/PopupGlobal";

export default function PostCard({
  post: {
    title,
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
  },
}) {
  const { user } = useContext(AuthContext);
  return (
    <Grid mobile={16} tablet={8} computer={4}>
      <Grid.Column width={15} className="ui centered card">
        <Card.Content>
          <Image
            floated="left"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{title}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <PopupGlobal content="Comment on post">
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="red" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="red" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </PopupGlobal>

          {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      </Grid.Column>
    </Grid>
  );
}
