import React from "react";
import moment from "moment";

const ArticleItem = props => {
  const baseSpacing = 35;
  let image = "";

  if (props.data.visual) {
    image = props.data.visual.url;
  } else if (props.data.thumbnail) {
    image = props.data.thumbnail[0].url;
  }

  console.log(props.data);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 0 33%",
      }}
    >
      <div
        style={{
          flex: 7,
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a
          href={props.data.alternate[0].href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            position: "absolute",
            top: baseSpacing,
            left: baseSpacing,
            right: baseSpacing,
            bottom: 0,
            borderRadius: 5,
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#131313",
          }}
        ></a>
      </div>
      <div
        style={{
          flex: 3,
        }}
      >
        <div
          style={{
            padding: baseSpacing,
            paddingTop: baseSpacing,
            color: "#c4c4c4",
            fontSize: 46,
          }}
        >
          <div
            style={{
              fontSize: 16,
              opacity: 0.7,
              marginBottom: baseSpacing / 4,
            }}
          >
            {props.data.category}
            {" "}&bull;{" "}
            {moment(props.data.published).fromNow()}
          </div>
          <div>{props.data.title}</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
