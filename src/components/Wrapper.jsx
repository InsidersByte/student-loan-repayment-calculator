/* @flow */

import styled from 'styled-components';

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

export default Wrapper;
