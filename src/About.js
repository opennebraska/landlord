import React, {useEffect} from "react";
import {Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import * as ReactGA from "react-ga";

export function About() {
    useEffect(() => ReactGA.pageview('About'), []);

    return <React.Fragment>
        <Typography variant={'h2'}>About</Typography>
        <Typography>
            Landlords of Omaha displays searchable data from the <a
            href={"https://data-dogis.opendata.arcgis.com/datasets/parcels"}>Omaha/Douglas County GIS parcels
            dataset</a> and was created by volunteers from Open Nebraska.
            There are three options for what you see on this website, which you can see by clicking on the three
            little bars in the upper
            left hand corner.
        </Typography>
        <List>
            <ListItem>
                <Typography style={{fontWeight: 600}}>Out of Omaha: </Typography> Properties owned by people or companies located outside of Omaha
            </ListItem>
            <ListItem>
                <Typography style={{fontWeight: 600}}>Out of State:</Typography> Omaha properties that are owned by people or companies located outside of Nebraska
            </ListItem>
            <ListItem>
                <Typography style={{fontWeight: 600}}>Low Condition:</Typography> Omaha properties that are in Poor to Worn Out condition
            </ListItem>
        </List>
        <Typography>
            The table data is searchable. If you want to view only owners located in
            Omaha, simply enter omaha in the Search box by the upper right hand corner.
            Any column can be sorted up or down. So you can sort by Owner Name or Owner Address or Owner City, etc. You
            can even do this after you have created a view of, say - Owner City as Omaha – as in the previous paragraph.
            Property Quality refers to the durability of the building when it was constructed. Property Condition
            means just what you would expect.
            When sorting by STATE (owner state of residence), the abbreviation AE stands for U.S. Armed Forces –
            Europe.
        </Typography>
    </React.Fragment>
}
