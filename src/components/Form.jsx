/* @flow */

import React from 'react';
import Wrapper from './Wrapper';
import Input from './Input';

type PropsType = {
    salary: string,
    remaining: string,
    onChange: Function,
};

const Form = ({ salary, remaining, onChange }: PropsType) =>
    <Wrapper>
        <Input
            name="salary"
            placeholder="Salary"
            type="number"
            value={salary}
            onChange={onChange}
            autoFocus
        />

        <Input
            name="remaining"
            placeholder="Student Loan"
            type="number"
            value={remaining}
            onChange={onChange}
        />
    </Wrapper>
;

export default Form;
