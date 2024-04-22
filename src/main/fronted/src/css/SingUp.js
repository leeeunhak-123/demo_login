import styled from "styled-components";

export const SingUpWrapper = styled.div`
    font-family: 'Arial', sans-serif;
    text-align: center;
    margin: 20px;

    h1 {
        color: #333;
    }

    ul {
        list-style: none;
        
    }
    h2 {
        margin-top: 20px;
    }

    label {
        font-weight: bold;
        display: block;
        margin: 10px 0 5px;
    }

    input {
        padding: 5px;
        margin: 5px 0 15px;
    }
    
    

    ${({ isMypage }) => isMypage && `
        #mypage {
            margin-top: 30px; 
        }
    `}
`;