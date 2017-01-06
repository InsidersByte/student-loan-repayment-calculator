/* @flow */

import React from 'react';
import accounting from 'accounting';

const CurrencyText = ({ value }: { value: number }) =>
    <span>{accounting.formatMoney(value, '£', 0)}</span>
;

export default CurrencyText;
