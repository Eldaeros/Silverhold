import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../libs/useWindowResize';
import { getBaseFontSize, RhythmTypography } from '../libs/rhythm';
import { useTypography } from '../libs/useTypography';
import { content } from '../styles/blog';
import { media } from '../styles/media';

interface ImageProps extends React.ImgHTMLAttributes<any> {}
const RhythmImage = (props: ImageProps) => {
    const typography = useTypography();

    const rhythmnHeight = typography?.rhythmHeight(1);
    const size = useWindowSize();
    const [imageHeight, setimageHeight] = useState<number | undefined>();

    const imgRef = useRef();
    useEffect(() => {
        if (imgRef.current && typography) {
            const imageHeight = (imgRef.current as any).getBoundingClientRect()
                .height;
            const baseFontSize = getBaseFontSize();
            const imageRhythmnHeight =
                imageHeight / (rhythmnHeight * baseFontSize);
            const calculatedHeight =
                Math.floor(imageRhythmnHeight) * rhythmnHeight * baseFontSize;

            setimageHeight(calculatedHeight);
        }
    }, [size, typography]);

    if (typography === undefined) {
        return null;
    }
    return (
        <>
            <ImageContainer height={imageHeight}>
                <img ref={imgRef} {...props} />
            </ImageContainer>
            <Description rhythmTypography={typography}>{props.alt}</Description>
        </>
    );
};

const Description = styled.div`
    ${content('minorThird')}
    ${media.wide} {
        ${content('majorThird')}
    }
    margin-top: 0;
    text-align: center;
`;

interface ImageContainerProps {
    height?: number;
    typography?: RhythmTypography;
}
const ImageContainer = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${(props: ImageContainerProps) =>
        props.typography
            ? `margin-bottom: ${props.typography.rhythmHeight(1)};`
            : ``};
    ${(props: ImageContainerProps) =>
        props.height ? `height: ${props.height}px;` : ``}
`;

export default RhythmImage;
