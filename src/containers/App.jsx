/* @flow */

import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import moment from 'moment';
import * as CONSTANTS from '../constants/index';
import nper from '../util/nper';
import { numberOfMonthsToYearsAndMonths } from '../util/dateHelper';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Form from '../components/Form';
import SubTitle from '../components/SubTitle';
import Result from '../components/Result';

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
        const lastValuationDate = moment(CONSTANTS.STUDENT_LOAN_LAST_VALUATION_DATE, 'DD/MM/YYYY');
        const dateTillDebtFree = moment(lastValuationDate).add(monthsToPayoff, 'months');
        const totalAmountRepayable = monthsToPayoff * monthlyContribution;

        return (
            <Result
                dateTillDebtFree={dateTillDebtFree}
                studentLoanableIncome={studentLoanableIncome}
                monthlyStudentLoanableIncome={monthlyStudentLoanableIncome}
                monthlyContribution={monthlyContribution}
                yearlyContribution={yearlyContribution}
                timeToPayoff={timeToPayoff}
                totalAmountRepayable={totalAmountRepayable}
            />
        );
    };

    render() {
        const { remaining, salary } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <div>
                    <Header />

                    <Form
                        salary={salary}
                        remaining={remaining}
                        onChange={this.onChange}
                    />

                    {this.showResults()}
                </div>
            </ThemeProvider>
        );
    }
}
