import React from "react";
import { Dimmer , Loader } from "semantic-ui-react";

export function Loading({ inverted = true, content="Loading..."}) {
    return (
    < Dimmer inverted={inverted} active={true}>
        < Loader content={content}/>
    </ Dimmer>
    )   
}