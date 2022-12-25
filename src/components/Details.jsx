import { Component } from "react";
import { useSelector } from "react-redux";
import { store } from "../store";

import ComponentStyles from '../../styles/Component.module.css'
import Styles from '../../styles/Details.module.css'
import { Atma, DancingScript, Lato, Lora, MaterialIcons, Sarabun, SourceSansPro } from "../font";
import Image from "next/image";

export default function Details(props) {
    const { value, data, ...rest } = props;
    return <DetailsComponent {...rest} details={useSelector(state => value ? state[value] : data)} />
}

class DetailsComponent extends Component {
    constructor(props) {
        super(props);

        this.months = [
            "January",
            "February",
            "March",
            "April",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
    }

    render() {
        const { details } = this.props;
        return <>
            <div {...this.props}>
                <div className={[Styles.container]}>
                    {details &&
                        details.map(elm => {
                            switch (elm.type) {
                                case "image":
                                    return <div className={[Styles.contentBox, ComponentStyles.row, ComponentStyles.center].join(" ")} key={elm.priority}>
                                        <img src={elm.content} width={200} height={200} alt="Pic" style={{ borderRadius: "50%", overflow: "hidden" }} />
                                    </div>

                                case "Date":
                                    const date = new Date(elm.content);
                                    return <div className={[ComponentStyles.row, Styles.contentBox, SourceSansPro.className].join(" ")} key={elm.priority}>
                                        <div className={[Styles.contentTitle, DancingScript.className].join(" ")}>{elm.field}</div>
                                        <div className={[ComponentStyles.center, ComponentStyles.justifyStart].join(" ")}>
                                            <div className={[ComponentStyles.row, Styles.content].join(" ")}>
                                                {date.getDate() - 1}
                                            </div>
                                            <div className={[ComponentStyles.row, Styles.content].join(" ")}>
                                                {this.months[date.getMonth()]}
                                            </div>
                                            <div className={[ComponentStyles.row, Styles.content].join(" ")}>
                                                {date.getFullYear()}
                                            </div>
                                        </div>
                                    </div>
                                case "String":
                                    return <div className={[ComponentStyles.row, Styles.contentBox, SourceSansPro.className].join(" ")} key={elm.priority}>
                                        <div className={[Styles.contentTitle, DancingScript.className].join(" ")}>{elm.field}</div>
                                        <div className={Styles.content}>{elm.content}</div>
                                    </div>
                                case "Array":
                                    return <div className={[ComponentStyles.row, Styles.contentBox, Styles.arrayContainer].join(" ")}
                                        key={elm.priority}>
                                        <div className={[Styles.contentTitle, DancingScript.className].join(" ")}>{elm.field}</div>
                                        <div className={Styles.content} style={{ padding: "20px" }}>
                                            {elm.content.map(element => {
                                                return <div className={[ComponentStyles.row, ComponentStyles.center].join(" ")} key={element.icon}>
                                                    <div className={[Styles.arrayElement, ComponentStyles.center].join(" ")}>
                                                        <span className={[MaterialIcons.className].join(" ")} style={{ fontSize: "1.6rem", margin: "0 5px", width: "fit-content", height: "fit-content", color: `rgb(${225 * Math.random()}, ${225 * Math.random()}, ${225 * Math.random()})`, filter: "drop-shadow(0 0 6px black)" }}>{element.icon}</span>
                                                        <span className={Lato.className} style={{ margin: "5px" }}>{element.content}</span>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                case "Object-Array":
                                    return <div className={[Styles.contentBox, ComponentStyles.row].join(" ")} key={elm.priority}>
                                        <div className={[Styles.contentTitle, DancingScript.className].join(" ")}>{elm.field}</div>
                                        <div className={[Styles.content].join(" ")} style={{ width: "unset" }}>
                                            <div className={[Styles.objectContainer].join(" ")}>
                                                {Object.entries(elm.content).map(element => {
                                                    return <a className={[Styles.link, ComponentStyles.center, ComponentStyles.hoverPopUpAnchor].join(" ")} href={element[1].first} key={Math.random()}>
                                                        <img className={Styles.linkLogo} src={element[1].second} alt="link" />
                                                        <div className={[ComponentStyles.center, ComponentStyles.hoverPopUp].join(" ")} style={{ backgroundColor: "wheat", color: "wheat" }}>
                                                            <span className={Sarabun.className} style={{ color: "black", width: "fit-content" }}>{element[0]}</span>
                                                        </div>
                                                    </a>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                case "Category-Array":
                                    return <div className={[Styles.contentBox, ComponentStyles.row].join(" ")} key={elm.priority}>
                                        <div className={[Styles.contentTitle, DancingScript.className].join(" ")}>{elm.field}</div>
                                        <div className={[Styles.content, ComponentStyles.center, ComponentStyles.column].join(" ")} style={{ width: "unset" }} >
                                            {Object.entries(elm.content).map(element => {
                                                return <div className={Styles.categoryContainer} key={Math.random()} style={{ margin: "15px 0", width: "100%" }}>
                                                    <div className={[Lora.className, Styles.category, Atma.className].join(" ")} style={{
                                                        marginLeft: "25px",
                                                        fontSize: "1rem"
                                                    }}>{element[0]}</div>
                                                    <div className={Styles.slugContent}>
                                                        {element[1].map(skill => {
                                                            return <div className={[ComponentStyles.center, ComponentStyles.column].join(" ")} style={{ position: "relative" }} key={skill.slug}>
                                                                <div className={Styles.iconContainer}>
                                                                    <img style={{ filter: "drop-shadow(0 0 0.4px white)" }} className={Styles.icon} src={skill.icon} alt={skill.slug} />
                                                                </div>
                                                                <div className={[Styles.name, ComponentStyles.center].join(" ")}>{skill.name} </div>
                                                                {!skill.status && <span className={MaterialIcons.className} style={{ margin: "3px", fontSize: "1.1rem", color: "yellow", position: "absolute", top: "0", left: "0" }}>report</span>}
                                                            </div>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                            }
                        })
                    }
                </div>
            </div>
        </>
    }
}