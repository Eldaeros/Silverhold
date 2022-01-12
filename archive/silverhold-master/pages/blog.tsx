import React, { useState, useEffect, useContext } from 'react';
import posts, { Post } from '../data/blog-posts';
import { Container } from '@material-ui/core';
import RhythmImage from '../components/Image';
import styled from 'styled-components';
import RhythmCodeBlock from '../components/CodeBlock';
import styles from '../styles/blog';
import { media } from '../styles/media';

interface BlogProps {
    meta: Omit<Post, 'path'>;
    children: JSX.Element | JSX.Element[];
}
const Blog = (props: BlogProps) => {
    const current = posts.map(({ title }) => title).indexOf(props.meta?.title);
    const next = posts[current - 1];
    const prev = posts[current + 1];

    const [children, setChildren] = useState(props.children);
    useEffect(() => {
        let children = Array.isArray(props.children)
            ? props.children
            : [props.children];
        children = mutateChildren(children);
        setChildren(children);
    }, []);

    useEffect(() => {
        document.title = 'Silverhold Studios - ' + props.meta?.title;
    }, []);

    return (
        <>
            <Container maxWidth="md">
                <StyleWrapper>
                    <h1>{props.meta?.title}</h1>
                    {children}
                    <div>
                        <div>
                            {prev && (
                                <PostNavigation
                                    href={prev.path}
                                    position="< Previous post"
                                    title={prev.title}
                                />
                            )}
                        </div>
                        <div>
                            {next && (
                                <PostNavigation
                                    href={next.path}
                                    position="Next post >"
                                    title={next.title}
                                />
                            )}
                        </div>
                    </div>
                </StyleWrapper>
            </Container>
        </>
    );
};

const StyleWrapper = styled.div`
    ${styles('minorThird')}
    ${media.large} {
        ${styles('majorThird')}
    }
`;

const mutateChildren = (children: any, level: number = 0) => {
    return children.map((child, i) => {
        const descendants = child?.props?.children;
        if (descendants?.props?.mdxType === 'img') {
            const imgProps = { ...descendants.props };
            delete imgProps.parentName;
            delete imgProps.originalType;
            delete imgProps.mdxType;
            child = <RhythmImage key={i} {...imgProps} />;
        } else if (child?.props?.mdxType === 'pre') {
            child = <RhythmCodeBlock key={i}>{child}</RhythmCodeBlock>;
        }
        return child;
    });
};

interface PostNavigationProps {
    href: string;
    position: string;
    title: string;
}
const PostNavigation = (props: PostNavigationProps) => (
    <a href={props.href}>
        {props.position}{' '}
        {/* <Typography variant={'subtitle1'} component="h4">
            {props.title}
        </Typography> */}
    </a>
);

export default Blog;
