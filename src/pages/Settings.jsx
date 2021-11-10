import React, { useContext } from "react";
import { Form, Card } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

export const Settings = () => {
  const { user } = useContext(AuthContext);
  let username = user.username;
  return (
    <Card fluid>
      <div className="page-title">
        <h1>Settings</h1>
        <Form>
          <div className="ui action input fluid">
            <p>Username:</p>
            <input
              type="text"
              placeholder="Comment..."
              name="Comment"
              value={username}
              // onChange={(event) => setComment(event.target.value)}
              // ref={commentInputRef}
            />
            <button
              type="submit"
              className="ui button teal"
              // disabled={comment.trim() === ""}
              // onClick={submitComment}
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </Card>
  );
};
