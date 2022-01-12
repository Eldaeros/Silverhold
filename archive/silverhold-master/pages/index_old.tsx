import React, { useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
    CssBaseline,
    Button,
    Container as MaterialContainer,
    Grid as MaterialGrid,
    AppBar,
    Toolbar as MaterialToolbar,
    Tabs as MaterialTabs,
    Tab as MaterialTab,
    Box,
    Typography
} from '@material-ui/core';
import { media } from '../styles/media';
import { scale } from '../styles/blog';
import posts from '../data/blog-posts';
import BlogCard from '../components/BlogCard';

const Index = () => {
    useEffect(() => {
        document.title = 'Silverhold Studios';
    }, []);

    const blogsRef = useRef();

    const handleScrollTo = (elRef) => {
        // Incase the ref supplied isn't ref.current
        const el = elRef.current ? elRef.current : elRef;

        // Scroll the element into view
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Background>
            <CssBaseline />
            <SplashImage image={'/images/lion_large.jpg'}>
                <TitleContainer>
                    <Header>
                        <Title>SILVERHOLD STUDIOS</Title>
                        <AuthorText>
                            <CreatedBy>Created by </CreatedBy>
                            <AuthorName>Peter Gates</AuthorName>
                        </AuthorText>
                    </Header>
                    <Footer>
                        <Logo />
                        <ButtonContainer>
                            <StyledButton
                                onClick={() => {
                                    handleScrollTo(blogsRef);
                                }}
                            >
                                About
                            </StyledButton>
                            <StyledButton
                                onClick={() => {
                                    handleScrollTo(blogsRef);
                                }}
                            >
                                Articles
                            </StyledButton>
                            <StyledButton
                                onClick={() => {
                                    handleScrollTo(blogsRef);
                                }}
                            >
                                Projects
                            </StyledButton>
                        </ButtonContainer>
                    </Footer>
                </TitleContainer>
            </SplashImage>
            <Transition />
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                    >
                        <Tab label="Articles" />
                        <Tab label="About" />
                        <Tab label="Projects" disabled />
                    </Tabs>
                </Toolbar>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Region background="white">
                    <div ref={blogsRef}></div>

                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            {posts.map((post, index) => (
                                <GridItem
                                    key={index}
                                    item
                                    xs={12}
                                    sm={6}
                                    lg={4}
                                >
                                    <BlogCard {...post} />
                                </GridItem>
                            ))}
                        </Grid>
                        <span>
                            Photo by{' '}
                            <a href="https://unsplash.com/@mattkerslake?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                                Matthew Kerslake
                            </a>{' '}
                            on{' '}
                            <a href="https://unsplash.com/s/photos/lion?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                                Unsplash
                            </a>
                        </span>
                    </Container>
                </Region>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Region background="white"></Region>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Region background="white"></Region>
            </TabPanel>
        </Background>
    );
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Toolbar = styled(MaterialToolbar)`
    background-color: #464953;
`;

const Tab = styled(MaterialTab)``;
const Tabs = styled(MaterialTabs)`
    ${Tab} {
        &.Mui-selected {
            background-color: #2c2d33;
        }

        ${(props) =>
            props.theme.setFontWithRhythm(
                'Muli',
                scale['minorThird'](props.theme.baseFontSize, 2)
            )}
        color: #f0f0f0;
        text-transform: none;
    }

    & .MuiTabs-indicator {
        /* TODO: Implement arrow pointer */
        display: none;
    }
`;

const Background = styled.div``;

interface SplashImageProps {
    image: string;
    title?: string;
}
const SplashImage = styled.div`
    height: 100vh;
    background-image: linear-gradient(
            0deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.5) 20%,
            rgba(0, 0, 0, 0.3) 100%,
            rgba(255, 255, 255, 0) 100%
        ),
        url(${(props: SplashImageProps) => props.image});
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-content: center;
    justify-content: center;
`;

const Logo = styled.div``;
const Header = styled.div``;
const Footer = styled.div``;
const Title = styled.div``;
const AuthorText = styled.div``;
const AuthorName = styled.span``;
const CreatedBy = styled.span``;
const ButtonContainer = styled.div``;
const TitleContainer = styled.div`
    display: block;
    color: white;
    position: relative;
    font-family: 'Fjalla One', sans-serif;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;

    ${Header} {
        ${Title} {
            ${(props) =>
                props.theme.setFontWithRhythm(
                    'Fjalla One',
                    scale['minorThird'](props.theme.baseFontSize, 7)
                )}
            text-align: center;

            ${media.small} {
                ${(props) =>
                    props.theme.setFontWithRhythm(
                        'Fjalla One',
                        scale['minorThird'](props.theme.baseFontSize, 10)
                    )}
            }
        }

        ${AuthorText} {
            ${(props) =>
                props.theme.setFontWithRhythm(
                    'Fjalla One',
                    scale['minorThird'](props.theme.baseFontSize, 1)
                )}
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
                sans-serif;

            ${media.small} {
                ${(props) =>
                    props.theme.setFontWithRhythm(
                        'Fjalla One',
                        scale['minorThird'](props.theme.baseFontSize, 2)
                    )}
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
                sans-serif;
            }

            ${CreatedBy} {
                color: rgb(255 255 255 / 60%);
                font-style: italic;
            }
            text-align: center;
            ${AuthorName} {
                color: white;
                font-weight: 600px;
            }
        }
    }

    ${Footer} {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 32px;

        ${Logo} {
            display: none;
            height: 100px;
            width: 100px;
            background-size: 70%;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url('/images/logo2.png');
            background-color: black;
            border-radius: 50%;
            margin-bottom: 20px;
            align-self: center;

            ${media.small} {
                display: block;
            }
        }

        ${ButtonContainer} {
            display: flex;
            flex-direction: column;
            > * {
                margin: 8px 0px;
                width: 180px;
            }

            ${media.small} {
                display: flex;
                flex-direction: row;
                > * {
                    margin: 0px 8px;
                }
            }
        }
    }
`;

const Transition = styled.div`
    height: 100px;
    background-color: black;
`;

const Container = styled(MaterialContainer)`
    && {
        padding: ${(props) => props.theme.rhythmSizing(2)}rem;
    }
`;

const GridItem = styled(MaterialGrid)``;
const Grid = styled(MaterialGrid)`
    /* && {
        margin: 0;
        padding: 0;
        row-gap: ${(props) => props.theme.rhythmSizing(2)}rem;
    } */

    & ${GridItem} {
        margin: 0;
        padding: ${(props) => props.theme.rhythmSizing(2)}rem;
    }
`;

const Region = styled.div`
    background-color: ${(props: { background }) => props.background};
    min-height: 100vh;
`;

const StyledButton = styled(Button)`
    && {
        border: 1px solid white;
        color: white;
        width: 120px;
        border-radius: 0px;
    }

    && span {
        font-size: calc(16px * 0.875);
    }
`;

export default Index;
