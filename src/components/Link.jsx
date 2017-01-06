/* @flow */

import styled from 'styled-components';

const Link = styled.a`
    color: ${props => props.theme.colour};
    margin: 0.5em 0;
    font-family: Helvetica, Arial, sans-serif;
    
    &:hover {
        text-decoration: underline;
    }
`;

export default Link;
