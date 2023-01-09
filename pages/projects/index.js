import Head from "next/head";
import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_projects } from "../../src/api/request";
import Project from "../../src/components/Project";
import { Atma, Roboto } from "../../src/font";
import { set } from "../../src/store";

import ComponentStyles from "../../styles/Component.module.css";
import Styles from "../../styles/Project.module.css";

export default function Projects(props) {
  return (
    <ProjectsComponent
      {...props}
      dispatch={useDispatch()}
      projects={useSelector((state) => state.projects)}
      isWaiting={useSelector((state) => state.waiting)}
    />
  );
}

class ProjectsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
    };
  }

  async getProjects() {
    const { dispatch } = this.props;

    dispatch(set({ key: "waiting", value: true }));
    await get_projects((res) => {
      let i = 0;
      dispatch(
        set({
          key: "projects",
          value: res.projects.map((elm) => {
            elm["key"] = i++;
            return elm;
          }),
        })
      );
    });
    dispatch(set({ key: "waiting", value: false }));
  }

  componentDidMount() {
    this.getProjects();
  }

  render() {
    const { isWaiting, projects } = this.props;

    return (
      <>
        <Head>
          <title>Portfolio - Projects</title>
        </Head>

        <section
          className={[
            Styles.page,
            ComponentStyles.center,
            ComponentStyles.column,
          ].join(" ")}
        >
          <div
            className={[
              ComponentStyles.row,
              ComponentStyles.center,
              Roboto.className,
            ].join(" ")}
          >
            <div className={ComponentStyles.pageTitle}>Projects</div>
          </div>
          {isWaiting && projects.length === 0 ? (
            <div
              className={[
                Styles.container,
                ComponentStyles.row,
                ComponentStyles.fadeIn,
              ].join(" ")}
            >
              <div
                className={ComponentStyles.row}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <div className={[Styles.logo, Styles.loading].join(" ")}> </div>
                <div className={ComponentStyles.row}>
                  <div
                    className={[Styles.section, Styles.loading].join(" ")}
                    style={{ height: "30px" }}
                  >
                    {" "}
                  </div>
                  <div
                    className={[Styles.section, Styles.loading].join(" ")}
                    style={{ width: "40%", height: "15px" }}
                  ></div>
                </div>
              </div>
              <div
                className={[Styles.section, Styles.loading].join(" ")}
                style={{ height: "70px" }}
              ></div>
              <div className={ComponentStyles.row}>
                <div
                  className={[
                    Styles.section,
                    Styles.loading,
                    Styles.source,
                  ].join(" ")}
                  style={{ color: "transparent", fontSize: "0.9rem" }}
                >
                  Source
                </div>
              </div>
            </div>
          ) : (
            <div className={Styles.projectContainer}>
              {projects.map((elm) => (
                <Project
                  className={ComponentStyles.fadeIn}
                  style={{ animationDelay: `${0.2 * elm.key}s` }}
                  key={elm.key}
                  project={elm}
                />
              ))}
            </div>
          )}
          {!isWaiting && projects.length === 0 && (
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
        </section>
      </>
    );
  }
}
