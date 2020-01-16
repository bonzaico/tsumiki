import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {Filter} from "./filter"

storiesOf("Filter", module)
    .add("Default", () => {

        const props = {
            filters:{
                "india":"India",
                "australia":"Australia",
                "china":"China",
                "new york":"New York",
                "new zealand":"New Zealand",
                "japan":"Japan",
                "korea":"Korea",
                "canada":"Canada",
                "thailand":"Thailand",
                "singapore":"Singapore"
            },
            onChangeEvent: (e:Array<string>) =>{
                console.log(e)
            }
        };

        return (
            <div style={{width:'50%'}}>
                <Filter 
                {...props}
                />
                <div>asdsad</div>
            </div>
        );
    });