import React, { useState, useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../libs/useWindowResize';
import { content } from '../styles/blog';
import { media } from '../styles/media';
import { ThemeContext } from 'styled-components';
import { getBaseFontSize } from '../libs/rhythm';

interface ImageProps extends React.ImgHTMLAttributes<any> {}
const RhythmImage = (props: ImageProps) => {
    const themeContext: { rhythmHeight: number } = useContext(ThemeContext);
    const size = useWindowSize();
    const [imageHeight, setimageHeight] = useState<number | undefined>();

    const imgRef = useRef();
    useEffect(() => {
        if (imgRef.current) {
            const imageHeight = (imgRef.current as any).getBoundingClientRect()
                .height;
            const baseFontSize = getBaseFontSize();
            const imageRhythmnHeight =
                imageHeight / (themeContext.rhythmHeight * baseFontSize);
            const calculatedHeight =
                Math.floor(imageRhythmnHeight) *
                themeContext.rhythmHeight *
                baseFontSize;

            setimageHeight(calculatedHeight);
        }
    }, [size]);

    return (
        <>
            <ImageContainer height={imageHeight}>
                <img ref={imgRef} {...props} />
            </ImageContainer>
            <Description>{props.alt}</Description>
        </>
    );
};

const Description = styled.div`
    ${content('minorThird')}
    ${media.large} {
        ${content('majorThird')}
    }
    margin-top: 0;
    text-align: center;
`;

interface ImageContainerProps {
    height?: number;
}
const ImageContainer = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${(props: ImageContainerProps) =>
        props.height ? `height: ${props.height}px;` : ``}
`;

export default RhythmImage;
