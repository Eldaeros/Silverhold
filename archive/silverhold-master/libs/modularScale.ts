// Sourced from https://github.com/modularscale/modularscale-js

// Values
export type ScaleKey =
    | 'minorSecond'
    | 'majorSecond'
    | 'minorThird'
    | 'majorThird'
    | 'perfectFourth'
    | 'augFourth'
    | 'perfectFifth'
    | 'minorSixth'
    | 'goldenSection'
    | 'majorSixth'
    | 'minorSeventh'
    | 'majorSeventh'
    | 'octave'
    | 'majorTenth'
    | 'majorEleventh'
    | 'majorTwelfth'
    | 'doubleOctave';
export const scales: Record<ScaleKey, number> = {
    minorSecond: 16 / 15,
    majorSecond: 1.125,
    minorThird: 1.2,
    majorThird: 1.25,
    perfectFourth: 4 / 3,
    augFourth: 1.414,
    perfectFifth: 1.5,
    minorSixth: 1.6,
    goldenSection: 1.61803398875,
    majorSixth: 5 / 3,
    minorSeventh: 16 / 9,
    majorSeventh: 1.875,
    octave: 2,
    majorTenth: 2.5,
    majorEleventh: 8 / 3,
    majorTwelfth: 3,
    doubleOctave: 4
};

const value = typeof Object.keys(scales);

export type ModularScale = typeof scales;
// Function settings
const modularscale = {
    base: 16,
    ratio: 1.5
};

// Function
export const msFunction = (
    stepValue: number,
    settings: { base: number; ratio: number }
) => {
    // Parse settings
    // Write initial settings if undefined
    if (settings === undefined) {
        settings = modularscale;
    }
    // Initiate values
    let base = settings.base;
    let ratio = settings.ratio;
    // Fill in the blanks with default values
    if (ratio === undefined) {
        ratio = modularscale.ratio;
    }
    if (base === undefined) {
        base = modularscale.base;
    }

    // Fast calc if not multi stranded
    if (!Array.isArray(base) || base.length === 1) {
        return Math.pow(ratio, stepValue) * base;
    }

    // Normalize bases
    // Find the upper bounds for base values
    let baseHigh = Math.pow(ratio, 1) * base[0];
    for (let i = 1; i < base.length; i++) {
        // shift up if value too low
        while (base[i] / 1 < base[0] / 1) {
            base[i] = Math.pow(ratio, 1) * base[i];
        }
        // Shift down if too high
        while (base[i] / 1 >= baseHigh / 1) {
            base[i] = Math.pow(ratio, -1) * base[i];
        }
    }
    // Sort bases
    base.sort();

    // Figure out what base to use with modulo
    const rBase = Math.round(
        (stepValue / base.length - Math.floor(stepValue / base.length)) *
            base.length
    );

    // Return
    return Math.pow(ratio, Math.floor(stepValue / base.length)) * base[rBase];
};
