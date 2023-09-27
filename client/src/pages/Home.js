import ListHeader from "../components/ListHeader";
import Comment from "../components/Comment";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import CommentBar from "../components/CommentBar";
import ImageBar from "../components/ImageBar";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [comments, getComments] = useState(null);

  const [cookies] = useCookies(null);
  const authToken = cookies.AuthToken;
  const c_nick = cookies.c_nick;
  //console.log(c_nick);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/comments`
      );
      const json = await response.json();
      getComments(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const sortedComments = comments?.sort((a, b) => a.id - b.id);

  return (
    <div className="app">
      <br />
      <div className="logged-in mx-2">
        {authToken && <p>logged in as {cookies.c_nick}</p>}
        {!authToken && <p>not logged in</p>}
        <ImageBar />
      </div>

      <CommentBar getData={getData} />
      {sortedComments?.map((commentw) => (
        <Comment key={commentw.id} comment={commentw} getData={getData} />
      ))}
    </div>
  );
};

export default Home;
