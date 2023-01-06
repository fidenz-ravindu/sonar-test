import Head from "next/head";
import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_work } from "../src/api/request";
import Position from "../src/components/Position";
import { Atma, MaterialIcons, OpenSans } from "../src/font";
import { getWorkDetails } from "../src/repos/work_repository";
import { set } from "../src/store";
import { sleep } from "../src/util";

import ComponentStyles from "../styles/Component.module.css";
import Styles from "../styles/Work.module.css";

export default function Work(props) {
  return (
    <WorkComponent
      {...props}
      dispatch={useDispatch()}
      work={useSelector((state) => state.work)}
    />
  );
}

class WorkComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeElement: "",
      shouldRender: false,
    };

    this.content = ["Requesting Information . . .", "Request Completed."];
  }

  async showElement(content) {
    let N = content.length;
    for (let i = 0; i < N; i++) {
      await sleep(100);
      this.setState({ activeElement: content.substring(0, i + 1) });
    }
  }

  async updateWork() {
    await this.showElement(this.content[0]);
    const { dispatch } = this.props;
    dispatch(set({ key: "waiting", value: true }));
    await get_work((e) => {
      let i = 0;
      dispatch(
        set({
          key: "work",
          value: e.work.map((elm) => {
            elm.key = i++;
            return elm;
          }),
        })
      );
    });
    dispatch(set({ key: "waiting", value: false }));
    await this.showElement(this.content[1]);
    this.setState({ shouldRender: true });
  }

  componentDidMount() {
    this.updateWork();
  }

  render() {
    const { work } = this.props,
      { shouldRender, activeElement } = this.state;
    return (
      <>
        <Head>
          <title>Portfolio - Work</title>
        </Head>

        <section
          className={[ComponentStyles.center, ComponentStyles.column].join(" ")}
          style={{ margin: "20px" }}
        >
          <div
            className={[ComponentStyles.row, ComponentStyles.center].join(" ")}
          >
            <div
              className={ComponentStyles.center}
              style={{
                borderRadius: "5px",
                padding: "8px 15px",
                background: "var(--dark)",
              }}
            >
              <span
                className={[
                  MaterialIcons.className,
                  ComponentStyles.blink,
                ].join(" ")}
                style={{
                  color: "green",
                  filter: "brightness(1.3)",
                  margin: "5px",
                }}
              >
                circle
              </span>
              <span className={OpenSans.className} style={{ color: "white" }}>
                {activeElement}
              </span>
            </div>
          </div>
          {shouldRender &&
            (work.length > 0 ? (
              <div
                className={[ComponentStyles.row, Styles.container].join(" ")}
              >
                {work.map((elm) => {
                  return (
                    <Position
                      style={{ animationDelay: `${elm.key * 0.2}s` }}
                      key={Math.random()}
                      work={elm}
                    />
                  );
                })}
              </div>
            ) : (
              <>
                <div
                  className={[Atma.className, ComponentStyles.fadeIn].join(" ")}
                  style={{ margin: "25px", color: "wheat", fontSize: "1.2rem" }}
                >
                  No results found.
                </div>
              </>
            ))}
        </section>
      </>
    );
  }
}
