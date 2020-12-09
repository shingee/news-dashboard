import React from "react";
import ArticleItem from "./ArticleItem";

const Column = () => {
  return (
    <div
      style={{
        height: "100vh",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
    </div>
  );
};

export default Column;
