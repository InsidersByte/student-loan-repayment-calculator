/* @flow */

export default (rate: number, paymentAmount: number, presentValue: number) => {
    if (paymentAmount <= presentValue * rate) {
        throw new Error('The loan can never be paid off as the interest payments are higher than the payment amount');
    }

    return -Math.log(1 - (rate * (presentValue / paymentAmount))) / Math.log(1 + rate);
};
