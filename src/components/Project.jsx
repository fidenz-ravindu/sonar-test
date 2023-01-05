import { Component } from "react";

import ComponentStyles from '../../styles/Component.module.css'
import Styles from '../../styles/Project.module.css'
import { AltonaSans, LeagueSpartan, MaterialIcons, Nunito, OpenSans, Quicksand } from "../font";

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  render() {
    const { project, className, style } = this.props;

    const created = new Date(project.created);

    return <>
      <div className={[Styles.container, ComponentStyles.center, ComponentStyles.relative, className].join(" ")} style={{ opacity: 0, ...style }} onClick={() => {

      }}>
        <div className={[Styles.bg, ComponentStyles.absolute].join(" ")} style={{
          background: `conic-gradient(from 45deg, ${project.colors.toString()})`,
          overflow: "visible"
        }}></div>
        <div className={[ComponentStyles.parentFill].join(" ")} style={{ zIndex: "501" }}>
          <div className={ComponentStyles.row} style={{ display: "inline-flex", alignItems: "center" }}>
            <div>
              <span className={Styles.logo}>
                <img className={Styles.img} src={project.logo} alt="Logo" />
              </span>
            </div>
            <div>
              <div className={[OpenSans.className, Styles.section].join(" ")} style={{ margin: "0 10px", fontSize: "1.2rem", fontWeight: "600" }}>
                {project.name}
              </div>
              <div className={[Styles.section, Quicksand.className].join(" ")} style={{ color: "wheat", margin: "0 10px", fontSize: "0.7rem" }}>
                {`Created on ${created.getFullYear()} ${this.months[created.getMonth()]} ${created.getDate()}`}
              </div>
            </div>
          </div>
          <div className={[Styles.section, Nunito.className].join(" ")} style={{ fontSize: "0.9rem" }}>
            {project.description}
          </div>
          <div className={[Styles.section, ComponentStyles.center, ComponentStyles.spaceBet].join(" ")} >
            {project.source && <div className={[Styles.source, AltonaSans.className].join(" ")} style={{ float: "left" }}>
              <a href={project.source} style={{ color: "wheat" }}>Source</a>
            </div>}
            {project.link && <div style={{ float: "right" }}>
              <a className={[MaterialIcons.className, ComponentStyles.center, Styles.link].join(" ")} href={project.link} >arrow_forward</a>
            </div>}
          </div>
          {!project.released && <div className={[Styles.section, LeagueSpartan.className].join(" ")} style={{ fontSize: "0.8rem", margin: " 15px" }}>
            Coming Soon...
          </div>}
        </div>
      </div>
    </>;
  }
}
