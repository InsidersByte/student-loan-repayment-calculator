/* eslint-disable import/prefer-default-export */
/* @flow */

export function numberOfMonthsToYearsAndMonths(numberOfMonths: number) {
    const years = Math.floor(numberOfMonths / 12);
    const months = Math.floor(numberOfMonths - (years * 12));
    return `${years} Year${years !== 1 ? 's' : ''} and ${months} Month${months !== 1 ? 's' : ''}`;
}
