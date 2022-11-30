import styled from 'styled-components';
import '../DefaultStyles.css';



export const AdminContainer = styled.div`
    background-color: #D9D9D9;
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
`;

export const AdminDataListing = styled.div`
    
    background-color: white;
    grid-area: a;
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
`;

export const AdminDonutGraphContainer = styled.div`
    background-color: white;
    grid-area: b;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const AdminAddDataContainer = styled.div`
    background-color: white;
    grid-area: c;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;