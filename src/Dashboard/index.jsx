/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import ArticleItem from "./ArticleItem";
import fetchArticles from "../lib/fetchArticles";
import styled from "styled-components";
import { CATEGORY_BLACKLIST } from "../config";

const displayArticleAmount = 3;

const LoadBar = styled.div`
  width: 0%;

  &.active {
    transition: width 60s linear;
    width: 100%;
  }
`;

const Dashboard = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [activeArticles, setActiveArticles] = useState([]);
  const [activeArticlePointer, setActiveArticlePointer] = useState(0);
  const loadBarRef = useRef(null);

  useEffect(() => {
    (async () => {
      console.log(`Fetching articles...`);

      const result = await fetchArticles();

      if (result.status === 200 && result.data.items) {
        console.log(`Fetched ${result.data.items.length} articles.`);

        const validArticles = [];

        result.data.items.forEach(item => {
          if (
            item.categories &&
            !CATEGORY_BLACKLIST.includes(item.categories[0].id) &&
            (item.visual || item.thumbnail)
          ) {
            if (item.visual && item.visual.url === "none") {
              return;
            }

            validArticles.push({
              visual: item.visual,
              thumbnail: item.thumbnail,
              alternate: item.alternate,
              title: item.title,
              published: item.published,
              category: item.categories[0].label,
            });
          }
        });

        console.log(`Accepted ${validArticles.length} articles.`);

        setAllArticles(validArticles);
      } else {
        console.log(result);
      }
    })();
  }, []);

  useEffect(() => {
    if (allArticles.length === 0) {
      return;
    }

    const articles = [];

    for (let n = 0; n < displayArticleAmount; n++) {
      if (allArticles[activeArticlePointer + n]) {
        articles.push(allArticles[activeArticlePointer + n]);
      }
    }

    setActiveArticlePointer(
      allArticles[activeArticlePointer + displayArticleAmount]
        ? activeArticlePointer + displayArticleAmount
        : 0
    );

    setActiveArticles(articles);
  }, [allArticles]);

  useEffect(() => {
    if (activeArticles.length === 0) {
      return;
    }

    loadBarRef.current.classList.add("active");

    setTimeout(() => {
      loadBarRef.current.classList.remove("active");

      const articles = [];

      for (let n = 0; n < displayArticleAmount; n++) {
        if (allArticles[activeArticlePointer + n]) {
          articles.push(allArticles[activeArticlePointer + n]);
        }
      }

      setActiveArticlePointer(
        allArticles[activeArticlePointer + displayArticleAmount]
          ? activeArticlePointer + displayArticleAmount
          : 0
      );

      setActiveArticles(articles);
    }, 60000);
  }, [activeArticles]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {activeArticles.map((article, key) => {
          return <ArticleItem key={key} data={article} />;
        })}
      </div>
      <div>
        {allArticles.length === 0 ? (
          <div style={{ fontSize: 12, padding: "8px 35px", color: "#6c6c6c" }}>
            Loading Feed...
          </div>
        ) : (
          <div style={{ fontSize: 12, padding: "8px 35px", color: "#6c6c6c" }}>
            Showing {activeArticlePointer - 2}-{activeArticlePointer} /{" "}
            {allArticles.length}
          </div>
        )}
        <LoadBar
          ref={loadBarRef}
          style={{
            height: 1,
            backgroundColor: "#343434",
          }}
        ></LoadBar>
      </div>
    </div>
  );
};

export default Dashboard;
