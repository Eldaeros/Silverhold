import React from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";
import NavBar from "./NavBar";
import { Container } from "@material-ui/core";

interface Props {
    children?: JSX.Element | JSX.Element[];
}

const Page = (props: Props) => {
    return (
        <PageBackground>
            <NavBar />
            <PageContent>{props.children}</PageContent>
        </PageBackground>
    );
};

const PageBackground = styled.div`
    background: #d5d9dd;
`;

interface PageContentProps {
    children?: JSX.Element | JSX.Element[];
}

const PageContent = (props: PageContentProps) => {
    return (
        <Container>
            <PageContainer>{props.children}</PageContainer>
        </Container>
    );
};

const PageContainer = styled.div`
    background: ${colors.white};
    min-height: calc(100vh - 48px);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

export default Page;
