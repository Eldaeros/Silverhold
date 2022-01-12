import React, { useRef, useEffect, useContext } from "react";
import { CssBaseline, AppBar } from "@material-ui/core";
import Page from "../components/Page";

const Index = () => {
    useEffect(() => {
        document.title = "Silverhold Studios";
    }, []);

    const blogsRef = useRef();

    const handleScrollTo = (elRef) => {
        // Incase the ref supplied isn't ref.current
        const el = elRef.current ? elRef.current : elRef;

        // Scroll the element into view
        el.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <>
            <CssBaseline />
            <Page></Page>
        </>
    );
};

export default Index;
