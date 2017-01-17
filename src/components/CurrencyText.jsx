/* @flow */

import React from 'react';
import accounting from 'accounting';

const CurrencyText = ({ value }: { value: number }) =>
    <div>{accounting.formatMoney(value, '£', 0)}</div>
;

export default CurrencyText;
