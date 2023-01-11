import Head from "next/head";
import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_people } from "../src/api/request";
import Person from "../src/components/Person";
import { Atma, Roboto } from "../src/font";
import { set } from "../src/store";

import ComponentStyles from "../styles/Component.module.css";
import Styles from "../styles/People.module.css";

export default function People(props) {
  return (
    <PeopleComponent
      isWaiting={useSelector((state) => state.waiting)}
      people={useSelector((state) => state.people)}
      dispatch={useDispatch()}
    />
  );
}

class PeopleComponent extends Component {
  async getPeople() {
    const { dispatch } = this.props;

    dispatch(set({ key: "waiting", value: true }));
    await get_people((res) => {
      let key = 0;
      dispatch(
        set({
          key: "people",
          value: res.people.map((elm) => {
            elm["key"] = key++;
            return elm;
          }),
        })
      );
    });
    dispatch(set({ key: "waiting", value: false }));
  }

  componentDidMount() {
    this.getPeople();
  }

  render() {
    const { isWaiting, people } = this.props;

    return (
      <>
        <Head>
          <title>Portfolio - People</title>
        </Head>

        <section>
          <div
            className={[
              ComponentStyles.row,
              ComponentStyles.fadeInBottom,
              ComponentStyles.center,
              Roboto.className,
            ].join(" ")}
          >
            <div className={ComponentStyles.pageTitle}>People</div>
          </div>
          <div className={[Styles.container, ComponentStyles.row].join(" ")}>
            {isWaiting && people.length === 0 ? (
              <>
                <Person person={{}} />
                <Person person={{}} />
                <Person person={{}} />
                <Person person={{}} />
                <Person person={{}} />
                <Person person={{}} />
                <Person person={{}} />
                <Person person={{}} />
                <Person person={{}} />
                <Person person={{}} />
              </>
            ) : (
              <>
                {people.map((elm) => (
                  <Person key={elm.key} person={elm} />
                ))}
              </>
            )}
          </div>
          {!isWaiting && people.length === 0 && (
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
