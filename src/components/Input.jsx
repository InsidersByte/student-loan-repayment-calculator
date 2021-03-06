/* @flow */

import styled from 'styled-components';

const Input = styled.input`
    font-size: 1.25em;
    padding: 0.5em;
    margin: 0.5em;
    color: ${props => props.theme.colour};
    background: ${props => props.theme.backgroundColour};
    border: none;
    border-radius: 3px;
    max-width: 100%;

    &:hover {
        box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
    }
`;

export default Input;
