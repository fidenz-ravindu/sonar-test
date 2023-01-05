import Head from "next/head";
import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_posts } from "../../src/api/request";
import Post from "../../src/components/Post";
import { Atma } from "../../src/font";
import { set, setPosts } from "../../src/store";

import ComponentStyles from "../../styles/Component.module.css";

export default function Feed(props) {
  return (
    <FeedComponent
      {...props}
      data={useSelector((state) => {
        return {
          page: state.feedPage,
          posts: state.posts,
          waiting: state.waiting,
        };
      })}
      dispatch={useDispatch()}
    />
  );
}

class FeedComponent extends Component {
  constructor(props) {
    super(props);
  }

  async getPosts() {
    const { dispatch, data } = this.props;
    dispatch(set({ key: "waiting", value: true }));
    await get_posts({ page: data.page, limit: 6 }, (res) => {
      if (res.posts.length > 0) {
        dispatch(setPosts({ page: data.page, posts: res.posts }));
      }
    });
    dispatch(set({ key: "waiting", value: false }));
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { posts, waiting, page } = this.props.data;
    return (
      <>
        <Head>
          <title>Portfolio - Feed</title>
        </Head>

        <main
          className={ComponentStyles.page}
          style={{ maxHeight: "100vh", overflow: "auto" }}
          onScroll={(e) => {
            if (
              e.target.scrollTop + e.target.clientHeight ===
              e.target.scrollHeight
            )
              this.getPosts();
          }}
        >
          {waiting && (!posts[1] || posts[1].length == 0) && (
            <>
              <Post type={1} style={{ animationDelay: "0.2s" }} />
              <Post type={1} style={{ animationDelay: "0.4s" }} />
              <Post type={1} style={{ animationDelay: "0.6s" }} />
              <Post type={1} style={{ animationDelay: "0.8s" }} />
              <Post type={1} style={{ animationDelay: "1s" }} />
            </>
          )}
          {Object.entries(posts).map((elm) => {
            return elm[1].map((element) => (
              <Post
                type={2}
                key={element.key}
                post={element}
                style={{
                  animationDelay: `${(element.key - element.t) * 0.2}s`,
                }}
              />
            ));
          })}
          {!waiting && (!posts[1] || posts[1].length === 0) && (
            <div
              className={[
                Atma.className,
                ComponentStyles.fadeIn,
                ComponentStyles.row,
                ComponentStyles.center,
              ].join(" ")}
              style={{ margin: "25px 0", color: "wheat", fontSize: "1.2rem" }}
            >
              No results found.
            </div>
          )}
        </main>
      </>
    );
  }
}
