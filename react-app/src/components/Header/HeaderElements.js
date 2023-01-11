import styled from "styled-components"

export const Head = styled.nav`
    background-color: #eeeeee;
    height: 10vh;
    display: flex;
    align-items:center;
    justify-content: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index:10;
    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`;