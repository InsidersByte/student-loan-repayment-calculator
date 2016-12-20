/* @flow */

import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import * as CONSTANTS from '../constants/index';
import nper from '../util/nper';
import { numberOfMonthsToYearsAndMonths } from '../util/dateHelper';
import Input from '../components/Input';
import CurrencyText from '../components/CurrencyText';

const Title = styled.h1`
    font-size: 1.5em;
    color: palevioletred;
`;

const Wrapper = styled.section`
    padding: 4em;
    text-align: center;
`;

const TitleWrapper = styled(Wrapper)`
    background: papayawhip;
`;

const Text = styled.div`
    font-size: 1.25em;
    margin: 0.5em;
    color: palevioletred;
`;

export default class App extends Component {
    state = {
        remaining: '',
        salary: '',
    };

    onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const state = Object.assign(this.state, { [name]: value });
        this.setState(state);
    };

    showResults = () => {
        const { remaining: remainingString, salary: salaryString } = this.state;
        const remaining = parseInt(remainingString || 0, 10);
        const salary = parseInt(salaryString || 0, 10);

        if (remaining <= 0 || salary <= 0) {
            return null;
        }

        const studentLoanableIncome = salary - CONSTANTS.STUDENT_LOAN_FREE_AMOUNT;

        if (studentLoanableIncome <= 0) {
            return (
                <div>
                    <Title>You don&#39;t yet earn enough to payback your student loan.</Title>
                    <Title>You need to earn a minimum of £{CONSTANTS.STUDENT_LOAN_FREE_AMOUNT}.</Title>
                </div>
            );
        }

        const monthlyStudentLoanableIncome = studentLoanableIncome / CONSTANTS.MONTHS_IN_YEAR;
        const monthlyContribution = monthlyStudentLoanableIncome * CONSTANTS.STUDENT_LOAN_CONTRIBUTION;
        const yearlyContribution = monthlyContribution * CONSTANTS.MONTHS_IN_YEAR;
        const monthsToPayoff = Math.ceil(nper(CONSTANTS.STUDENT_LOAN_INTEREST_RATE / CONSTANTS.MONTHS_IN_YEAR, monthlyContribution, remaining));
        const timeToPayoff = numberOfMonthsToYearsAndMonths(monthsToPayoff);
        const dateTillDebtFree = moment().add(monthsToPayoff, 'months');

        return (
            <Wrapper>
                <Text>Student Loanable Income: <CurrencyText value={studentLoanableIncome} /></Text>
                <Text>Monthly Student Loanable Income: <CurrencyText value={monthlyStudentLoanableIncome} /></Text>
                <Text>Monthly Contribution: <CurrencyText value={monthlyContribution} /></Text>
                <Text>Yearly Contribution: <CurrencyText value={yearlyContribution} /></Text>
                <Text>Time to Payoff: {timeToPayoff}</Text>
                <Text>Date Till Debt Free to Payoff: {dateTillDebtFree.format('MMMM YYYY')}</Text>
            </Wrapper>
        );
    };

    render() {
        const { remaining, salary } = this.state;

        return (
            <div>
                <TitleWrapper>
                    <Title>Student Loan Repayment Calculator</Title>
                </TitleWrapper>

                <Wrapper>
                    <Input
                        name="salary"
                        placeholder="Salary"
                        type="number"
                        value={salary}
                        onChange={this.onChange}
                        autoFocus
                    />

                    <Input
                        name="remaining"
                        placeholder="Student Loan"
                        type="number"
                        value={remaining}
                        onChange={this.onChange}
                    />
                </Wrapper>

                {this.showResults()}
            </div>
        );
    }
}
