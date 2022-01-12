import React, { useRef, useEffect, useContext } from "react";
import { CssBaseline, AppBar } from "@material-ui/core";
import Page from "../components/Page";

const Projects = () => {
    useEffect(() => {
        document.title = "Silverhold Studios - Projects";
    }, []);

    return (
        <>
            <CssBaseline />
            <Page></Page>
        </>
    );
};

export default Projects;
