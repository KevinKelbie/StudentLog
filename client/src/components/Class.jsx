import React from "react";

import styled, { withTheme } from "styled-components";

import date from "date-and-time";

import ImageMask from "./ImageMask";
import { darken, opacify, rgba } from "polished";

import A from "./A";

function Placeholder(props) {
    return <div {...props}>
        <ImageMask mask={props.mask} />
    </div>
}

Placeholder = styled(Placeholder)`
  background: white;
`

function Class(props) {
    return (
        <div {...props}>
            <div className="gradient" />
            <div className="top">
                <div className="time raise">
                    {date.format(new Date(parseInt(props.start)), "HH:mm")} -{" "}
                    {date.format(new Date(parseInt(props.end)), "HH:mm")} • {props.type}
                </div>
                <A href={`/class/2`} className="title">{props.module.title}</A>
                <div className="module raise">{props.module.id}</div>
            </div>
            <div className="bottom">
                <div className="duration-container">
                    <div className="duration raise">{`${props.duration} hour`}</div>
                </div>
                <div className="images">
                    {props.staff.map((staff_, i) => {
                        return (
                            <div className="image-container">
                                {/* If image has picture do this */}
                                {/* <div className="image raise">
                                <ImageMask
                                    mask={i === props.staff.length - 1 ? false : true}
                                />
                                </div> */}
                                {/* Otherwise do this */}
                                <Placeholder mask={i === props.staff.length - 1 ? false : true} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

Class = styled(Class)`
    grid-column: 2;
    border: 2px solid ${props => props.theme.is === "dark" ? "white" : "black"};
    position: relative;
    border-radius: 4px;
    box-shadow: 0px 0px 16px 0px ${props => rgba(props.theme.SECONDARY_COLOR, 0.3)};
    

    .gradient {
        border-radius: 4px;
        position: absolute;
        z-index: 1;
        content: "";
        display: block;
        height: calc(100% + 4px);
        width: calc(100% + 4px);
        top: -2px;
        left: -2px;
        background: linear-gradient(to bottom right, ${props => props.theme.PRIMARY_COLOR}, ${props => props.theme.SECONDARY_COLOR});
        mix-blend-mode: ${props => props.theme.is === "dark" ? "multiply" : "lighten"};
    }


    /* Styling for main section */
    &::before {
        position: absolute;
        z-index: 0;
        content: "";
        display: block;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        background: ${props => props.theme.is === "dark" ? "black" : "white"};
        border-radius: 4px;
    }

    .top {
        position: relative;
        z-index: 1;
        padding: 24px;
        border-radius: 4px 4px 0px 0px;
        background: ${props => props.theme.is === "dark" ? "#24252d" : "#fff"};
        mix-blend-mode: ${props => props.theme.is === "dark" ? "lighten" : "darken"};
        /* &::before {
        content: "";
        width: 100%;
        height: 100%;
        background: black;
        } */
    }

    .time {
        color: ${props => props.theme.is === "dark" ? "#cbcbcb" : "#848484"};
        font-size: 12px;
        font-weight: 600;
    }

    .title {
        position: sticky;
        font-weight: 600;
        background: -webkit-linear-gradient(${props => props.theme.PRIMARY_COLOR}, ${props => props.theme.SECONDARY_COLOR});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 20px;    
    }

    .module {
        color: ${props => props.theme.is === "dark" ? "#cbcbcb" : "#848484"};
        font-size: 16px;
    }

    .raise {
        position: relative;
        z-index: 2;
        isolation: isolate;
    }

    .drop {
        position: initial;
    }

    .bottom {
        position: relative;
        height: 24px;
        width: 100%;
        background: ${props => props.theme.is === "dark" ? "white" : "black"};
    }

    .duration-container {
        position: absolute;
        display: inline-block;
        background: ${props => props.theme.is === "dark" ? "#24252d" : "#fff"};
        border: 2px solid ${props => props.theme.is === "dark" ? "white" : "black"};
        bottom: 0;
        left: 24px;
    }

    .duration {
        background: ${props => props.theme.is === "dark" ? "#24252d" : "#fff"};
        padding: 8px;
        color: ${props => props.theme.is === "dark" ? "#cbcbcb" : "#919191"};
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
    }

    .images {
        display: flex;
        position: absolute;
        bottom: 0;
        right: 24px;
    }

    .image, ${Placeholder} {
        width: 100%;
        height: 100%;
        mix-blend-mode: lighten;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .image-container {
        width: 32px;
        height: 32px;
        border-radius: 100%;
        border: 2px solid ${props => props.theme.is === "dark" ? "white" : "black"};
        background: ${props => props.theme.is === "dark" ? "black" : "white"};
        margin-left: -8px;
        overflow: hidden;
        background: gray;
    }

    grid-row: span ${props => props.index};
`;

export default withTheme(Class);