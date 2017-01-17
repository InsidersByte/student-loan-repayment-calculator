/* @flow */

import React from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import Title from './Title';
import SubTitle from './SubTitle';
import Text from './Text';
import Link from './Link';
import { STUDENT_LOAN_REPAYMENT_URL } from '../constants';

const HeaderSubTitle = styled(SubTitle)`
    fontsize: 1.3em;
`;

const HeaderText = styled(Text)`
    font-size: 0.9em;
`;

const Header = () =>
    <Wrapper>
        <Title>Student Loan Repayment Calculator</Title>
        <HeaderSubTitle>Calculate how long it will take to pay off your student loan.</HeaderSubTitle>
        <HeaderText>If you aren't sure how much Student Loan you have left, you can find out <Link href={STUDENT_LOAN_REPAYMENT_URL} target="_blank" rel="noopener noreferrer">here</Link>.</HeaderText>
    </Wrapper>
;

export default Header;
