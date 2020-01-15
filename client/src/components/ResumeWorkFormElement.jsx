import React, { useState, useEffect } from "react";

import styled from "styled-components";

import {rgba} from "polished";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faGripVertical } from "@fortawesome/free-solid-svg-icons";

import EditDropdown from "./EditDropdown";
import { Button2 } from "./Button";

function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

function FormElement({handle, register, editable, errors, ...props}) {
    const [isEditable, setIsEditable] = useState(editable);
    const [editDropdownActive, setEditDropdownActive] = useState(false);

    return <div {...props}>
        <div {...handle} className="handle">
            <FontAwesomeIcon icon={faGripVertical}  />
        </div>
        <div className="content">
            <div className={`form ${!isEditable ? 'hidden' : ''}`}>
                <label>Company Name*</label>
                <input type="text" name={`work[${props.index}].name`} ref={register({required: true})} placeholder="Google" />
                {
                    errors.name ? 
                        errors.name[props.index] && <span id={`name${props.index}Error`}>This field is required</span>
                        : null
                }

                <label>Job Title</label>
                <input type="text" name={`work[${props.index}].title`} ref={register} placeholder="Software Engineer" />

                <label>Job Location</label>
                <input type="text" name={`work[${props.index}].location`} ref={register} placeholder="Mountain View, CA" />

                <label>Start Date</label>
                <input type="text" name={`work[${props.index}].start`} ref={register} placeholder="Sep 2015" />

                <label>End Date</label>
                <input type="text" name={`work[${props.index}].end`} ref={register} placeholder="June 2019" />

                <div className="buttons">
                    <Button2 onClick={async () => {
                        props.delete()
                    }}>Delete</Button2>

                    <Button2 type="submit" onClick={async () => {
                        console.log(props.watch())
                        const errors = await props.triggerValidation();
                        console.log(923,errors)
                        if (errors) {
                            setIsEditable(false);
                        }
                    }}>Save</Button2>
                </div>

            </div>
            <div className={`render ${isEditable ? 'hidden' : ''}`}>
                <div className="left">
                    <div className="name">
                        {props.watch(`work[${props.index}].name`)}
                    </div>
                    <div className="work">
                        <span className="work">
                            {props.watch(`work[${props.index}].title`)}
                        </span>
                    </div>
                </div>
                <div className="right">
                    <div className="location">
                        {props.watch(`work[${props.index}].location`)}
                    </div>
                    <div className="start-end">
                        <span className="start">
                            {props.watch(`work[${props.index}].start`)}
                        </span>
                        <span className="gap">
                            {
                                // If there is an end date then put the dash in
                                props.watch(`work[${props.index}].end`)  ? 
                                    " - " : null
                            }
                        </span>
                        <span className="end">
                            {props.watch(`work[${props.index}].end`)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        {
            !isEditable ?
            <div className="edit" onClick={() => {
                setEditDropdownActive(!editDropdownActive);
            }}>
                <FontAwesomeIcon icon={faEllipsisV} />
                {
                    editDropdownActive ?
                        <EditDropdown setIsEditable={setIsEditable}></EditDropdown> : null
                }
            </div> : null
        }
    </div>
}

export default styled(FormElement)`
    display: flex;
    align-items: center;

    .handle {
        color: ${props => props.theme.PRIMARY_COLOR};
        visibility: ${props => props.handle ? 'visible' : 'hidden' };
        margin-right: 8px;
    }

    .content {
        padding: 8px;
        flex-grow: 1;

        .form {
            * {
                display: block;
            }

            input {
                width: 100%;
                background: ${props => rgba(props.theme.PRIMARY_COLOR, 0.1)};
                padding: 4px;
                border: 1px solid ${props =>props.theme.PRIMARY_COLOR};
                border-radius: 4px;
                color: #e5e5e5;
            }

            &.hidden {
                display: none;
            }

            .buttons {
                display: flex;
                margin-top: 8px;

                ${Button2}:first-child {
                    margin-left: 0px;
                }

                ${Button2} {
                    margin-left: 4px;
                }

            }

        }

        .render { 
            justify-content: space-between;
            align-items: center;

            display: flex;

            &.hidden {
                display: none;
            }

            .name {
                font-size: 20px;
                font-weight: bold;
            }

            .left {
                text-align: left;
            }

            .right {
                text-align: right;
            }

        }
    }
    
    .edit {
        color: ${props => props.theme.PRIMARY_COLOR};
        margin-left: 8px;
        cursor: pointer;

    }
`;