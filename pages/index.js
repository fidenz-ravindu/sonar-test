import Head from "next/head";
import Link from "next/link";
import { Component } from "react";
import Styles from "../styles/Home.module.css";
import ComponentStyles from "../styles/Component.module.css";
import { sleep } from "../src/util";
import {
  Barlow,
  Cabin,
  Catamaran,
  Lato,
  LeagueSpartan,
  Lora,
  MaterialIcons,
  Nunito,
  Oxygen,
  Poppins,
  Roboto,
  SourceSansPro,
} from "../src/font";
import { get_details } from "../src/api/request";
import Details from "../src/components/Details";
import { Provider, useDispatch, useSelector } from "react-redux";
import { set, store } from "../src/store";
import Router, { useRouter } from "next/router";

export default function Home(props) {
  return (
    <HomeComponent
      {...props}
      dispatch={useDispatch()}
      router={Router}
      query={useRouter().query}
    />
  );
}

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      render: 0,
    };

    this.content = [
      {
        key: 1,
        element: (
          <>
            <h1
              className={[
                ComponentStyles.row,
                ComponentStyles.center,
                ComponentStyles.fadeInBottom,
                Roboto.className,
              ].join(" ")}
              style={{ color: "wheat", fontSize: "2rem", margin: "5px" }}
            >
              {"{ Hey }"}
            </h1>
          </>
        ),
        timeout: 700,
      },
      {
        key: 2,
        element: (
          <>
            <div
              className={[
                ComponentStyles.row,
                ComponentStyles.center,
                ComponentStyles.fadeInBottom,
              ].join(" ")}
            >
              <h1 className={Styles.separator} />
            </div>
          </>
        ),
        timeout: 700,
      },
      {
        key: 3,
        element: (
          <>
            <div className={ComponentStyles.fadeInBottom}>
              <span className={[Barlow.className, Styles.result].join(" ")}>
                [<span className={Styles.in}>#</span>]
              </span>
              <span className={Catamaran.className}>Initializing app</span>
            </div>
          </>
        ),
        timeout: 700,
      },
      {
        key: 4,
        element: (
          <>
            <div className={ComponentStyles.fadeInBottom}>
              <span className={[Barlow.className, Styles.result].join(" ")}>
                [<span className={Styles.in}>#</span>]
              </span>
              <span className={Catamaran.className}>
                Requesting Information . . .{" "}
              </span>
            </div>
          </>
        ),
        timeout: 700,
        func: async () => {
          const { dispatch } = this.props;
          dispatch(set({ key: "waiting", value: true }));
          await get_details((e) => {
            dispatch(set({ key: "details", value: e.details }));
          });
          dispatch(set({ key: "waiting", value: false }));
        },
      },
      {
        key: 5,
        element: (
          <>
            <div className={ComponentStyles.fadeInBottom}>
              <span className={[Barlow.className, Styles.result].join(" ")}>
                [<span className={Styles.in}>#</span>]
              </span>
              <span className={Catamaran.className}>Request Completed</span>
            </div>
          </>
        ),
        timeout: 700,
      },
      {
        key: 6,
        element: (
          <>
            <Details
              value="details"
              className={[Styles.container, Styles.detailsContainer].join(" ")}
              style={{ margin: "16px 8px", borderRadius: "8px" }}
            />
          </>
        ),
        timeout: 700,
      },
    ];
  }

  async componentDidMount() {
    let timeout = 700;
    for (let i = 0; i < this.content.length; i++) {
      await sleep(timeout);
      const content = this.content[i];

      this.setState({ render: i + 1 });
      timeout = content.timeout;

      if (content.func) await content.func();
    }
  }

  render() {
    return (
      <>
        <Head>
          <meta name="title" content="Ravindu Denuwan | Home"/> 
          <meta name="description" content="Ravindu is a professional software developer with a creative mind and he is passionate about everything wrapped around technology😋✌🏻✌🏻." />
          <title>Portfolio</title>
        </Head>

        <section
          className={[ComponentStyles.center].join(" ")}
          style={{ margin: "20px" }}
        >
          <div
            className={[
              Lato.className,
              ComponentStyles.fadeInBottom,
              ComponentStyles.container,
              Styles.commandPrompt,
            ].join(" ")}
          >
            {this.content.slice(0, this.state.render).map((elm) => {
              return <div key={elm.key}>{elm.element}</div>;
            })}
            <span className={ComponentStyles.blink}>_</span>
          </div>
        </section>
      </>
    );
  }
}
