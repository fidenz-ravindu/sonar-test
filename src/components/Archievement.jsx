import { Component } from "react";

import ComponentStyles from "../../styles/Component.module.css";
import ProjectStyles from "../../styles/Project.module.css";
import Styles from "../../styles/Archievement.module.css";
import { Nunito } from "../font";

export default class Archievement extends Component {
  render() {
    const { archievement, className, style } = this.props;

    return <div className={[Styles.archievement, className].join(" ")} style={{ height: "fit-content", ...style }}>
      <div className={[Styles.logoContainer, ComponentStyles.center, ProjectStyles.loading].join(" ")} onLoad={e => {
        e.target.style.opacity = 1;
        e.target.parentNode.classList.remove(ProjectStyles.loading);
      }}>
        <img className={Styles.logo} src={archievement.logo} alt="Archievement logo" />
      </div>
      <div className={[Styles.description, Nunito.className].join(" ")}>
        {archievement.description}
      </div>
    </div>;
  }
}
