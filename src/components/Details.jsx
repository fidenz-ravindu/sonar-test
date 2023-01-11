import { Component } from "react";
import { useSelector } from "react-redux";
import { store } from "../store";

import ComponentStyles from "../../styles/Component.module.css";
import Styles from "../../styles/Details.module.css";
import {
  AltonaSans,
  Atma,
  DancingScript,
  Lato,
  Lora,
  MaterialIcons,
  Nunito,
  OpenSans,
  Sarabun,
  SourceSansPro,
} from "../font";
import Image from "next/image";
import { months } from "../util";

export default function Details(props) {
  const { value, data, ...rest } = props;
  return (
    <DetailsComponent
      {...rest}
      details={useSelector((state) => (value ? state[value] : data))}
    />
  );
}

class DetailsComponent extends Component {
  render() {
    const { details } = this.props;
    return (
      <>
        <div {...this.props}>
          <div className={[Styles.container]}>
            {details &&
              details.map((elm) => {
                switch (elm.type) {
                  case "image":
                    return (
                      <div
                        className={[
                          Styles.contentBox,
                          ComponentStyles.row,
                          ComponentStyles.center,
                        ].join(" ")}
                        key={elm.priority}
                      >
                        <img
                          src={elm.content}
                          width={200}
                          height={200}
                          alt="Pic"
                          style={{ borderRadius: "50%", overflow: "hidden" }}
                        />
                      </div>
                    );

                  case "Date":
                    const date = new Date(elm.content);
                    return (
                      <div
                        className={[
                          ComponentStyles.row,
                          ComponentStyles.center,
                          ComponentStyles.column,
                          Styles.contentBox,
                          SourceSansPro.className,
                        ].join(" ")}
                        key={elm.priority}
                      >
                        <div
                          className={[
                            Styles.contentTitle,
                            DancingScript.className,
                          ].join(" ")}
                        >
                          {elm.field}
                        </div>
                        <div
                          className={[
                            ComponentStyles.center,
                            ComponentStyles.justifyStart,
                          ].join(" ")}
                        >
                          <div
                            className={[
                              ComponentStyles.row,
                              Styles.content,
                            ].join(" ")}
                          >
                            {date.getDate() - 1}
                          </div>
                          <div
                            className={[
                              ComponentStyles.row,
                              Styles.content,
                            ].join(" ")}
                          >
                            {months[date.getMonth()]}
                          </div>
                          <div
                            className={[
                              ComponentStyles.row,
                              Styles.content,
                            ].join(" ")}
                          >
                            {date.getFullYear()}
                          </div>
                        </div>
                      </div>
                    );
                  case "String":
                    return (
                      <div
                        className={[
                          ComponentStyles.row,
                          ComponentStyles.column,
                          Styles.contentBox,
                          ComponentStyles.center,
                          SourceSansPro.className,
                        ].join(" ")}
                        key={elm.priority}
                      >
                        <div
                          className={[
                            Styles.contentTitle,
                            DancingScript.className,
                          ].join(" ")}
                        >
                          {elm.field}
                        </div>
                        <div className={Styles.content}>{elm.content}</div>
                      </div>
                    );
                  case "Array":
                    return (
                      <div
                        className={[
                          ComponentStyles.row,
                          Styles.contentBox,
                          Styles.arrayContainer,
                        ].join(" ")}
                        key={elm.priority}
                      >
                        <div
                          className={[
                            Styles.contentTitle,
                            DancingScript.className,
                          ].join(" ")}
                          style={{ marginLeft: "25px" }}
                        >
                          {elm.field}
                        </div>
                        <div
                          className={Styles.content}
                          style={{ padding: "20px" }}
                        >
                          {elm.content.map((element) => {
                            return (
                              <div
                                className={[
                                  ComponentStyles.row,
                                  ComponentStyles.center,
                                ].join(" ")}
                                key={element.icon}
                              >
                                <div
                                  className={[
                                    Styles.arrayElement,
                                    ComponentStyles.center,
                                  ].join(" ")}
                                >
                                  <span
                                    className={[
                                      MaterialIcons.className,
                                      Styles.elementIcon,
                                    ].join(" ")}
                                    style={{
                                      color: `rgb(${225 * Math.random()}, ${
                                        225 * Math.random()
                                      }, ${225 * Math.random()})`,
                                    }}
                                  >
                                    {element.icon}
                                  </span>
                                  <span
                                    className={[
                                      Lato.className,
                                      Styles.skill,
                                    ].join(" ")}
                                  >
                                    {element.content}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  case "Object-Array":
                    return (
                      <div
                        className={[
                          Styles.contentBox,
                          ComponentStyles.row,
                        ].join(" ")}
                        key={elm.priority}
                      >
                        <div
                          className={[
                            Styles.contentTitle,
                            DancingScript.className,
                          ].join(" ")}
                          style={{ marginLeft: "25px" }}
                        >
                          {elm.field}
                        </div>
                        <div
                          className={[Styles.content].join(" ")}
                          style={{ width: "unset" }}
                        >
                          <div className={[Styles.objectContainer].join(" ")}>
                            {Object.entries(elm.content).map((element) => {
                              return (
                                <a
                                  className={[
                                    Styles.link,
                                    ComponentStyles.center,
                                    ComponentStyles.hoverPopUpAnchor,
                                  ].join(" ")}
                                  href={element[1].first}
                                  key={Math.random()}
                                >
                                  <img
                                    className={Styles.linkLogo}
                                    src={element[1].second}
                                    alt="link"
                                  />
                                  <div
                                    className={[
                                      ComponentStyles.center,
                                      ComponentStyles.hoverPopUp,
                                    ].join(" ")}
                                    style={{
                                      backgroundColor: "white",
                                      color: "white",
                                    }}
                                  >
                                    <span
                                      className={AltonaSans.className}
                                      style={{
                                        color: "black",
                                        width: "fit-content",
                                      }}
                                    >
                                      {element[0]}
                                    </span>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  case "Category-Array":
                    return (
                      <div
                        className={[
                          Styles.contentBox,
                          ComponentStyles.row,
                        ].join(" ")}
                        key={elm.priority}
                      >
                        <div
                          className={[
                            Styles.contentTitle,
                            DancingScript.className,
                          ].join(" ")}
                          style={{ marginLeft: "25px" }}
                        >
                          {elm.field}
                        </div>
                        <div
                          className={[
                            Styles.content,
                            ComponentStyles.center,
                            ComponentStyles.column,
                          ].join(" ")}
                          style={{ width: "unset" }}
                        >
                          {Object.entries(elm.content).map((element) => {
                            return (
                              <div
                                className={Styles.categoryContainer}
                                key={Math.random()}
                                style={{ margin: "15px 0", width: "100%" }}
                              >
                                <div
                                  className={[
                                    Styles.category,
                                    Atma.className,
                                  ].join(" ")}
                                  style={{
                                    marginLeft: "25px",
                                    fontSize: "1rem",
                                  }}
                                >
                                  {element[0]}
                                </div>
                                <div className={Styles.slugContent}>
                                  {element[1].map((skill) => {
                                    return (
                                      <div
                                        className={[
                                          ComponentStyles.center,
                                          ComponentStyles.column,
                                        ].join(" ")}
                                        style={{ position: "relative" }}
                                        key={skill.slug}
                                      >
                                        <div className={Styles.iconContainer}>
                                          <img
                                            style={{
                                              filter:
                                                "drop-shadow(0 0 0.4px white)",
                                            }}
                                            className={Styles.icon}
                                            src={skill.icon}
                                            alt={skill.slug}
                                          />
                                        </div>
                                        <div
                                          className={[
                                            Styles.name,
                                            ComponentStyles.center,
                                            OpenSans.className,
                                          ].join(" ")}
                                          style={
                                            !skill.status
                                              ? {
                                                  borderBottom:
                                                    "2px solid var(--v-dr)",
                                                }
                                              : {}
                                          }
                                        >
                                          {skill.name}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                }
              })}
          </div>
        </div>
      </>
    );
  }
}
