import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../libs/useWindowResize';
import { getBaseFontSize, RhythmTypography } from '../libs/rhythm';
import { useTypography } from '../libs/useTypography';

interface CodeBlockProps {
    children: JSX.Element;
}
const RhythmCodeBlock = (props: CodeBlockProps) => {
    const typography = useTypography();

    const rhythmnHeight = typography.rhythmHeight(1);
    const size = useWindowSize();
    const [blockHeight, setBlockHeight] = useState<number | undefined>();

    const codeRef = useRef();
    useEffect(() => {
        if (codeRef.current) {
            const blockHeight = (codeRef.current as any).firstElementChild
                .firstElementChild.clientHeight;
            const baseFontSize = getBaseFontSize();
            const codeRhythmnHeight =
                blockHeight / (rhythmnHeight * baseFontSize);
            const calculatedHeight =
                Math.ceil(codeRhythmnHeight) * rhythmnHeight * baseFontSize;
            setBlockHeight(calculatedHeight);
        }
    });

    return (
        <CodeContainer
            typography={typography}
            height={blockHeight}
            ref={codeRef}
        >
            {props.children}
        </CodeContainer>
    );
};

interface CodeContainerProps {
    typography?: RhythmTypography;
    height?: number;
}
const CodeContainer = styled.div`
    background-color: lightgray;
    overflow: hidden;
    display: flex;
    justify-content: left;
    align-items: center;
    ${(props: CodeContainerProps) =>
        props.typography
            ? `margin-bottom: ${props.typography.rhythmHeight(1)};`
            : ``};
    ${(props: CodeContainerProps) =>
        props.height ? `height: ${props.height}px;` : ``}

    pre {
        ${(props: CodeContainerProps) =>
            props.height ? `height: ${props.height}px;` : ``}
    }
`;

export default RhythmCodeBlock;
