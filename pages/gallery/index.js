import Head from "next/head";
import { Component, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../styles/Gallery.module.css";
import ProjectStyles from "../../styles/Project.module.css";
import ComponentStyles from "../../styles/Component.module.css";
import { set } from "../../src/store";
import { get_gallery_media } from "../../src/api/request";
import { Atma } from "../../src/font";
import Media from "../../src/components/Media";

export default function Gallery(props) {
  return (
    <GalleryComponent
      {...props}
      dispatch={useDispatch()}
      media={useSelector((state) => state.gallery)}
      isWaiting={useSelector((state) => state.waiting)}
    />
  );
}

class GalleryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      left: 0,
      offset: 0
    };

    this.setActiveMedia = this.setActiveMedia.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scroll = this.scroll.bind(this);
    this.swipe = this.swipe.bind(this);

    this.mediaContainer = createRef();
  }

  async getMedia() {
    const { dispatch } = this.props;

    dispatch(set({ key: "waiting", value: true }));
    await get_gallery_media((res) => {
      let i = 0;
      dispatch(
        set({
          key: "gallery",
          value: res.gallery.map((elm) => {
            elm["key"] = i++;
            return elm;
          }),
        })
      );
    });
    dispatch(set({ key: "waiting", value: false }));
  }

  componentDidMount() {
    this.getMedia();
  }

  setActiveMedia(key, e) {
    this.setState({ active: key });

    if (e) {
      console.log(e.parentNode)
      this.scrollTo(e.parentNode.children[key]);
    }
  }

  scrollTo(e) {
    if (e)
      this.scroll(-e.offsetLeft + (this.mediaContainer.current.clientWidth - e.clientWidth) / 2);
  }

  scroll(len) {
    this.setState({
      left: len
    })
  }

  swipe(diff) {
    this.setState({
      offset: diff
    })
  }

  render() {
    const { isWaiting, media } = this.props,
      { active, left, offset } = this.state;

    return (
      <>
        <Head>
          <title>Portfolio - Gallery</title>
        </Head>

        <main
          className={[
            ComponentStyles.center,
            ComponentStyles.page,
            ComponentStyles.center,
          ].join(" ")}
        >
          {media.length === 0 && isWaiting && (
            <div
              className={[
                ProjectStyles.loading,
                Styles.mediaContainer,
                ComponentStyles.center,
              ].join(" ")}
            ></div>
          )}
          {media.length > 0 && (
            <div ref={this.mediaContainer} className={Styles.mediaContainer}>
              <div className={Styles.content} style={{ left: `${left + offset}px` }} >
                {media.map((elm) => (
                  <Media
                    rearrange={elm.key === 0}
                    active={active}
                    id={elm.key}
                    len={media.length}
                    setActive={this.setActiveMedia}
                    scroll={this.scrollTo}
                    scrollLen={this.scroll}
                    swipe={this.swipe}
                    key={elm.key}
                    post={elm}
                  />
                ))}
              </div>
            </div>
          )}
          {!isWaiting && media.length === 0 && (
            <>
              <div
                className={[Atma.className, ComponentStyles.fadeIn].join(" ")}
                style={{ margin: "25px", color: "wheat", fontSize: "1.2rem" }}
              >
                No results found.
              </div>
            </>
          )}
        </main>
      </>
    );
  }
}
