import Head from "next/head";
import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_archievements } from "../src/api/request";
import {
  Atma,
  Barlow,
  Cabin,
  Catamaran,
  OpenSans,
  Oxygen,
  Roboto,
} from "../src/font";
import { set } from "../src/store";

import ComponentStyles from "../styles/Component.module.css";
import Styles from "../styles/Archievement.module.css";
import Archievement from "../src/components/Archievement";

export default function Archievements(props) {
  return (
    <ArchievementsComponent
      {...props}
      archievements={useSelector((state) => state.archievements)}
      isWaiting={useSelector((state) => state.waiting)}
      dispatch={useDispatch()}
    />
  );
}

class ArchievementsComponent extends Component {
  async getArchievements() {
    const { dispatch } = this.props;
    dispatch(set({ key: "waiting", value: true }));
    await get_archievements((res) => {
      let i = 0;
      dispatch(
        set({
          key: "archievements",
          value: res.archievements.map((elm) => {
            elm["key"] = i++;
            return elm;
          }),
        })
      );
    });
    dispatch(set({ key: "waiting", value: false }));
  }

  componentDidMount() {
    this.getArchievements();
  }

  render() {
    const { archievements, isWaiting } = this.props;
    return (
      <>
        <Head>
          <title>Portfolio - Archievements</title>
        </Head>

        <section className={ComponentStyles.page}>
          <div
            className={[
              ComponentStyles.row,
              ComponentStyles.fadeInBottom,
              ComponentStyles.center,
              Roboto.className,
            ].join(" ")}
          >
            <div className={ComponentStyles.pageTitle}>Archievements</div>
          </div>
          <div className={Styles.container}>
            {isWaiting && archievements.length === 0 && (
              <>
                <Archievement archievement={{}} style={{ opacity: "1" }} />
                <Archievement archievement={{}} style={{ opacity: "1" }} />
                <Archievement archievement={{}} style={{ opacity: "1" }} />
                <Archievement archievement={{}} style={{ opacity: "1" }} />
                <Archievement archievement={{}} style={{ opacity: "1" }} />
                <Archievement archievement={{}} style={{ opacity: "1" }} />
                <Archievement archievement={{}} style={{ opacity: "1" }} />
                <Archievement archievement={{}} style={{ opacity: "1" }} />
                <Archievement archievement={{}} style={{ opacity: "1" }} />
                <Archievement archievement={{}} style={{ opacity: "1" }} />
              </>
            )}
            {archievements.map((elm) => (
              <Archievement
                className={ComponentStyles.fadeIn}
                style={{ animationDelay: `${elm.key * 0.2}s` }}
                key={elm.key}
                archievement={elm}
              />
            ))}
          </div>
          {!isWaiting && archievements.length === 0 && (
            <>
              <div
                className={[Atma.className, ComponentStyles.fadeIn].join(" ")}
                style={{
                  margin: "25px",
                  color: "wheat",
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
              >
                No results found.
              </div>
            </>
          )}
        </section>
      </>
    );
  }
}
