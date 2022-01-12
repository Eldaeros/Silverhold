export const size = {
    xsmall: 0,
    small: 640,
    medium: 920,
    large: 1280,
    xlarge: 1600
};

export const media = {
    xsmall: `@media (min-width: 0)`,
    small: `@media (min-width: ${size.small}px)`,
    medium: `@media (min-width: ${size.medium}px)`,
    large: `@media (min-width: ${size.large}px)`,
    xlarge: `@media (min-width: ${size.xlarge}px)`
};
