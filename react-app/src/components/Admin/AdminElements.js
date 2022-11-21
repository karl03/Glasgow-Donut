import styled from 'styled-components'

export const AdminContainer = styled.div`
    background-color: black;
    align-items:center;
    justify-content: center;
    margin: auto;
    height: 90vh;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 10px;
    grid-template-areas:
        "a a a a b b b b"
        "a a a a b b b b"
        "a a a a b b b b"
        "a a a a c c c c";
    padding: 0 30px 0 30px;
`

export const AdminDataListing = styled.div`
    background-color: red;
    grid-area: a;
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
`

export const AdminDonutGraph = styled.div`
    background-color: green;
    grid-area: b;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`

export const AdminAddData = styled.div`
    background-color: blue;
    grid-area: c;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`