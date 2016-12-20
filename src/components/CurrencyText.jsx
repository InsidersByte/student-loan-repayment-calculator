/* @flow */

import React from 'react';
import accounting from 'accounting';

export default function CurrencyText({ value }: { value: number }) {
    return (
        <span>{accounting.formatMoney(value, '£', 0)}</span>
    );
}
