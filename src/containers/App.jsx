/* @flow */

import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import moment from 'moment';
import * as CONSTANTS from '../constants/index';
import nper from '../util/nper';
import { numberOfMonthsToYearsAndMonths } from '../util/dateHelper';
import Input from '../components/Input';
import CurrencyText from '../components/CurrencyText';

const Title = styled.h1`
    color: ${props => props.theme.colour};
    font-size: 2.5em;
`;

const SubTitle = styled.h3`
    color: ${props => props.theme.colour};
`;

const Wrapper = styled.div`
    padding: 4em;
    text-align: center;

    &:nth-child(odd) {
        background: ${props => props.theme.backgroundColour};
    }
    
    @media (max-width: 1279px) {
        padding: 2em;
    }
    
    @media (max-width: 736px) {
        padding: 1em;
    }
`;

const Text = styled.div`
    color: ${props => props.theme.colour};
    font-size: 1.25em;
    margin: 0.5em;
`;

const theme = {
    backgroundColour: 'papayawhip',
    colour: 'palevioletred',
};

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
                <Wrapper>
                    <SubTitle>You don&#39;t yet earn enough to payback your student loan.</SubTitle>
                    <SubTitle>You need to earn a minimum of £{CONSTANTS.STUDENT_LOAN_FREE_AMOUNT}.</SubTitle>
                </Wrapper>
            );
        }

        const monthlyStudentLoanableIncome = studentLoanableIncome / CONSTANTS.MONTHS_IN_YEAR;
        const monthlyContribution = monthlyStudentLoanableIncome * CONSTANTS.STUDENT_LOAN_CONTRIBUTION;

        if (monthlyContribution < CONSTANTS.STUDENT_LOAN_MONTHLY_INTEREST_RATE * remaining) {
            return (
                <Wrapper>
                    <SubTitle>Your student loan will be written off as your monthly payment amount is less than the interest chargeable.</SubTitle>
                </Wrapper>
            );
        }

        const yearlyContribution = monthlyContribution * CONSTANTS.MONTHS_IN_YEAR;
        const monthsToPayoff = Math.ceil(nper(CONSTANTS.STUDENT_LOAN_MONTHLY_INTEREST_RATE, monthlyContribution, remaining));
        const timeToPayoff = numberOfMonthsToYearsAndMonths(monthsToPayoff);
        const dateTillDebtFree = moment().add(monthsToPayoff, 'months');
        const totalAmountRepayable = monthsToPayoff * monthlyContribution;

        return (
            <div>
                <Wrapper>
                    <SubTitle>I will be debt free by</SubTitle>
                    <Title>{dateTillDebtFree.format('MMMM YYYY')}</Title>
                </Wrapper>

                <Wrapper>
                    <Text>Student Loanable Income: <CurrencyText value={studentLoanableIncome} /></Text>
                    <Text>Monthly Student Loanable Income: <CurrencyText value={monthlyStudentLoanableIncome} /></Text>
                    <Text>Monthly Contribution: <CurrencyText value={monthlyContribution} /></Text>
                    <Text>Yearly Contribution: <CurrencyText value={yearlyContribution} /></Text>
                    <Text>Time to Payoff: {timeToPayoff}</Text>
                    <Text>Total Amount Repayable: <CurrencyText value={totalAmountRepayable} /></Text>
                </Wrapper>
            </div>
        );
    };

    render() {
        const { remaining, salary } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <div>
                    <Wrapper>
                        <Title>Student Loan Repayment Calculator</Title>

                        <SubTitle>Calculate how long it will take to pay off your student loan.</SubTitle>
                    </Wrapper>

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
            </ThemeProvider>
        );
    }
}
