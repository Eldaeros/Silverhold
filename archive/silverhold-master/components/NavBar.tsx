import React from "react";
import {
    AppBar,
    Toolbar as MaterialToolbar,
    Tab as MaterialTab,
    Container,
} from "@material-ui/core";
import { scale } from "../styles/blog";
import { colors } from "../styles/colors";
import styled, { css } from "styled-components";
import NextLink from "next/link";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

interface NavBarProps {}

const NavBar = (props: NavBarProps) => {
    return (
        <AppBar position="sticky">
            <Toolbar variant="dense" disableGutters>
                <Tabs>
                    <Tab label="Articles" path="/" />
                    <Tab label="Projects" path="/projects" />
                    <Tab label="Gallery" path="/gallery" disabled />
                    <Tab label="About" path="/about" disabled />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

interface TabsProps {
    children: JSX.Element | JSX.Element[];
}
const Tabs = (props: TabsProps) => {
    const TabsContainer = styled.div`
        display: flex;
    `;

    return (
        <Container>
            <TabsContainer>{props.children}</TabsContainer>
        </Container>
    );
};

interface TabProps extends WithRouterProps {
    label: string;
    path: string;
    disabled?: boolean;
}
const Tab = withRouter((props: TabProps) => {
    const isActive = props.router.pathname === props.path;

    const LinkContent = styled.div`
        position: relative;
        background: ${isActive ? colors.greyDark : colors.grey};
        ${props.disabled ? `pointer-events: none; ` : ``}
        &:hover {
            background: ${isActive ? `` : `rgba(34, 38, 41, 0.2);`};
        }

        .MuiTab-wrapper {
            ${(props) =>
                props.theme.setFontWithRhythm(
                    "Roboto",
                    scale["minorThird"](props.theme.baseFontSize, 2),
                )}

            color: ${props.disabled ? `${colors.greyDark};` : `#e7e7e9;`}
        }
    `;
    return (
        <NextLink href={props.path}>
            <LinkContent>
                <MaterialTab label={props.label} />
                {isActive && <ActiveArrow />}
            </LinkContent>
        </NextLink>
    );
});

const Toolbar = styled(MaterialToolbar)`
    background-color: #474b4f;
`;

const ActiveArrow = styled.div`
    width: 50px;
    height: 25px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        background: ${colors.greyDark};
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
        top: 0;
        left: 50%;
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    }
`;

export default NavBar;
