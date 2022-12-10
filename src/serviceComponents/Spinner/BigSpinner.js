import Spinner from "./Spinner";
import styled from "styled-components";

const Wrapper = styled.div`
    height: ${props => props.itemHeight};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BigSpinner = () => {

    return (
        <Wrapper itemHeight={'500px'}>
            <Spinner/>
        </Wrapper>
    )
}

export default BigSpinner;


    // "redux-np": "^2.4.1",