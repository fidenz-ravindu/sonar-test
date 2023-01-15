import Head from "next/head";
import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_details, send_message } from "../src/api/request";
import Details from "../src/components/Details";
import Input from "../src/components/Input";
import { set } from "../src/store";

import HomeStyles from "../styles/Home.module.css";
import ComponentStyles from "../styles/Component.module.css";
import Styles from "../styles/Contact.module.css";
import {
  AltonaSans,
  Lato,
  MaterialIcons,
  OpenSans,
  Quicksand,
  Sarabun,
} from "../src/font";

export default function ContactMe(props) {
  return (
    <ContactMeComponent
      {...props}
      dispatch={useDispatch()}
      details={useSelector((state) => {
        return (
          state.details.length > 0 &&
          state.details.find((elm) => {
            if (elm.field === "Find Me") return elm;
          })
        );
      })}
      isWaiting={useSelector((state) => state.waiting)}
    />
  );
}

class ContactMeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      output: 0,
    };
  }

  async sendMessage(e) {
    this.setState({ output: 0 });
    const { dispatch } = this.props;
    dispatch(set({ key: "waiting", value: true }));

    let body = {};
    const elms = e.target.elements;
    for (let i = 0; i < elms.length; i++) {
      body[elms[i].name] = elms[i].value;
    }

    await send_message(body, (res) => {
      if (res.code === 200) {
        this.setState({ output: 1 });
      } else {
        this.setState({ output: 2 });
      }
    });
    dispatch(set({ key: "waiting", value: false }));
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    const { dispatch } = this.props;
    dispatch(set({ key: "waiting", value: true }));
    await get_details((e) => {
      dispatch(set({ key: "details", value: e.details }));
    });
    dispatch(set({ key: "waiting", value: false }));
  }

  render() {
    const { isWaiting } = this.props,
      { output } = this.state;

    return (
      <>
        <Head>
          <meta name="title" content="Ravindu Denuwan | Contact Me" />
          <meta
            name="description"
            content="You can get in touch with Ravindu in here."
          />
          <title>Portfolio - Contact Me</title>
        </Head>

        <section>
          <Details
            data={this.props.details ? [this.props.details] : []}
            className={[HomeStyles.container, HomeStyles.detailsContainer].join(
              " "
            )}
            style={{ margin: "16px 8px", borderRadius: "8px" }}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.sendMessage(e);
            }}
            className={[
              ComponentStyles.center,
              ComponentStyles.column,
              Styles.messageForm,
            ].join(" ")}
          >
            <div className={[Lato.className, Styles.formTitle].join(" ")}>
              Leave a message
            </div>
            <div
              className={[
                ComponentStyles.center,
                ComponentStyles.row,
                ComponentStyles.rowInput,
              ].join(" ")}
            >
              <div
                className={[
                  ComponentStyles.row,
                  ComponentStyles.inputContainer,
                  ComponentStyles.center,
                ].join(" ")}
              >
                <Input
                  disabled={isWaiting}
                  className={[
                    ComponentStyles.dataInput,
                    Quicksand.className,
                  ].join(" ")}
                  required
                  spellCheck="false"
                  autoComplete="off"
                  type="text"
                  name="name"
                />
                <div
                  className={[
                    ComponentStyles.dataInputName,
                    AltonaSans.className,
                  ].join(" ")}
                >
                  Name
                </div>
              </div>
              <div
                className={[
                  ComponentStyles.row,
                  ComponentStyles.inputContainer,
                  ComponentStyles.center,
                ].join(" ")}
              >
                <Input
                  disabled={isWaiting}
                  className={[
                    ComponentStyles.dataInput,
                    Quicksand.className,
                  ].join(" ")}
                  required
                  spellCheck="false"
                  autoComplete="off"
                  type="email"
                  name="email"
                />
                <div
                  className={[
                    ComponentStyles.dataInputName,
                    AltonaSans.className,
                  ].join(" ")}
                >
                  Email
                </div>
              </div>
            </div>
            <div
              className={[
                ComponentStyles.row,
                ComponentStyles.inputContainer,
                ComponentStyles.center,
              ].join(" ")}
            >
              <Input
                disabled={isWaiting}
                className={[
                  ComponentStyles.dataInput,
                  Quicksand.className,
                ].join(" ")}
                required
                spellCheck="false"
                autoComplete="off"
                type="text"
                name="subject"
              />
              <div
                className={[
                  ComponentStyles.dataInputName,
                  AltonaSans.className,
                ].join(" ")}
              >
                Subject
              </div>
            </div>
            <div
              className={[
                ComponentStyles.row,
                ComponentStyles.inputContainer,
                ComponentStyles.center,
              ].join(" ")}
            >
              <textarea
                {...{ "data-value": "" }}
                disabled={isWaiting}
                className={[ComponentStyles.dataArea, Quicksand.className].join(
                  " "
                )}
                required
                spellCheck="false"
                autoComplete="off"
                type="text"
                name="message"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    e.target.clientHeight < e.target.scrollHeight
                  ) {
                    e.target.setAttribute(
                      "rows",
                      Math.max(
                        parseInt(e.target.getAttribute("rows") || 1) + 2,
                        2
                      )
                    );
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value.trim() !== "") {
                    e.target.setAttribute("data-value", "contains");
                  } else {
                    e.target.setAttribute("data-value", "");
                  }
                }}
              />
              <div
                className={[
                  ComponentStyles.dataInputName,
                  AltonaSans.className,
                ].join(" ")}
              >
                Message
              </div>
            </div>
            <div
              className={[
                ComponentStyles.row,
                ComponentStyles.inputContainer,
              ].join(" ")}
            >
              <span
                className={[
                  Styles.status,
                  OpenSans.className,
                  ComponentStyles.center,
                ].join(" ")}
                style={{
                  backgroundColor:
                    output == 1
                      ? "green"
                      : output === 2
                      ? "red"
                      : "transparent",
                }}
              >
                {output == 1 ? (
                  <>
                    <span
                      className={MaterialIcons.className}
                      style={{
                        marginRight: "5px",
                        height: "100%",
                        fontSize: "1rem",
                      }}
                    >
                      done
                    </span>{" "}
                    Sent
                  </>
                ) : output === 2 ? (
                  <>
                    <span
                      className={MaterialIcons.className}
                      style={{
                        marginRight: "5px",
                        height: "100%",
                        fontSize: "1rem",
                      }}
                    >
                      error
                    </span>{" "}
                    Error
                  </>
                ) : (
                  ""
                )}
              </span>
              <button disabled={isWaiting} className={Styles.btn} type="submit">
                Send
              </button>
            </div>
          </form>
        </section>
      </>
    );
  }
}
