/* @flow */

export default (rate: number, paymentAmount: number, presentValue: number) =>
    -Math.log(1 - (rate * (presentValue / paymentAmount))) / Math.log(1 + rate);
