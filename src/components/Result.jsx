/* @flow */

import React from 'react';
import Wrapper from '../components/Wrapper';
import Title from '../components/Title';
import SubTitle from '../components/SubTitle';
import Text from '../components/Text';
import CurrencyText from '../components/CurrencyText';

type PropsType = {
    dateTillDebtFree: moment$Moment,
    studentLoanableIncome: number,
    monthlyStudentLoanableIncome: number,
    monthlyContribution: number,
    yearlyContribution: number,
    totalAmountRepayable: number,
}

const Result = ({ dateTillDebtFree, studentLoanableIncome, monthlyStudentLoanableIncome, monthlyContribution, yearlyContribution, totalAmountRepayable }: PropsType) =>
    <div>
        <Wrapper>
            <SubTitle>I will be debt free by</SubTitle>
            <Title>{dateTillDebtFree.format('MMMM YYYY')}</Title>
        </Wrapper>

        <Wrapper>
            <Text>Student Loanable Income <CurrencyText value={studentLoanableIncome} /></Text>
            <Text>Monthly Student Loanable Income <CurrencyText value={monthlyStudentLoanableIncome} /></Text>
            <Text>Monthly Contribution <CurrencyText value={monthlyContribution} /></Text>
            <Text>Yearly Contribution <CurrencyText value={yearlyContribution} /></Text>
            <Text>Total Amount Repayable <CurrencyText value={totalAmountRepayable} /></Text>
        </Wrapper>
    </div>
;

export default Result;
