import React from 'react';
import { Post } from '../data/blog-posts';
// import { Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import styled from 'styled-components';
import {
    Typography,
    Card,
    CardHeader,
    CardActionArea,
    CardMedia,
    CardActions as MaterialCardActions,
    Button,
    CardContent as MaterialCardContent
} from '@material-ui/core';
import { scale } from '../styles/blog';
import { media } from '../styles/media';

interface BlogCardProps extends Post {}
const BlogCard = (props: BlogCardProps) => {
    return (
        <Card>
            <CardActionArea href={props.path}>
                <CardImage image={props.banner} title={props.title} />
                <CardContent>
                    <Title>{props.title}</Title>
                    <Body>
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                    </Body>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

const CardContent = styled(MaterialCardContent)``;

const Title = styled.div`
    ${(props) =>
        props.theme.setFontWithRhythm(
            'Lato',
            scale['minorThird'](props.theme.baseFontSize, 3)
        )};
    padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
`;

const Body = styled.div`
    ${(props) =>
        props.theme.setFontWithRhythm(
            'Muli',
            scale['minorThird'](props.theme.baseFontSize, 2)
        )}

    ${media.large} {
        ${(props) =>
            props.theme.setFontWithRhythm(
                'Muli',
                scale['majorThird'](props.theme.baseFontSize, 2),
                1.5
            )}
    }
`;

const CardActions = styled(MaterialCardActions)`
    && {
        > button {
            > span {
                ${(props) =>
                    props.theme.setFontWithRhythm(
                        'Muli',
                        scale['minorThird'](props.theme.baseFontSize, 0)
                    )}

                ${media.large} {
                    ${(props) =>
                        props.theme.setFontWithRhythm(
                            'Muli',
                            scale['majorThird'](props.theme.baseFontSize, 0),
                            1.5
                        )}
                }
            }
        }
    }
`;

interface CardImageProps {
    image: string;
    title?: string;
}
const CardImage = styled.div`
    height: 0;
    padding-top: 56.25%;
    background-image: url(${(props: CardImageProps) => props.image});
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    height: ${(props) => props.theme.rhythmSizing(30)}rem;
`;

export default BlogCard;
