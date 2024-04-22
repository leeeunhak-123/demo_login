import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Layout from "./Layout";
import Main from "./main";

const Maintitle = styled.h1`
    padding-top: 1rem;
    font-size: 2.5rem;
    font-family: "Nexon_football", sans-serif;
`
const StyledLayout = styled.div`
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    height: 65vh; /* 전체 화면 높이 */
`;

const MemberLogin = styled.div`
    background-color: #f9f9f9;
    background-color: rgba(230,255,255,0.7);
    border: 1px solid #ccc;
    width:30rem;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    
    padding-bottom: 2rem;
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
`
const ButtonLogin = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    
    &:hover {
        background-color: #45a049;
    }
`;

const StyledLabel = styled.label`
    font-family: "Nexon_football", sans-serif;
    display: block;
    color: #333;
    margin-bottom: 5px;
    font-size: 1.4rem;
    font-weight: 600;
`;

const StyledInput = styled.input`
    font-family: "Nexon_stick",sans-serif;
    width: 50%;
    font-size: 1rem;
    height: 2.5rem;
    padding: 8px 10px;
    margin-bottom: 2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* padding을 포함한 너비 고정 */
`;

const LoginForm = () => {
    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            // 서버로 로그인 요청을 보냄
            const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/members/login`;
            const response = await axios.post(apiUrl, {
                email, password,
            });
            // 로그인 성공 시 서버에서 받은 JWT를 저장
            const token = response.data.token;
            // jwt token을 로컬 스토리지에 저장
            localStorage.setItem('token', token);
            localStorage.setItem('nickname', response.data.nickname); // 닉네임 저장
            console.log('로그인 성공', response.data);

            // 메인 페이지로 리다이렉트 또는 다른 작업 수행
            navigate("/main", { state: { nickname: response.data.nickname } });
        } catch (error) {
            // 로그인 실패시 처리
            console.error('로그인 실패', error.response ? error.response.data : error.message);
            console.log(error);
        }
    };

    return (
        <Layout>
            <StyledLayout>
                <MemberLogin>
                    <Maintitle>Login</Maintitle>
                    <StyledLabel>이메일</StyledLabel>
                    <StyledInput type="email" value={email} placeholder="이메일을 입력하세요" onChange={(e) => setEmail(e.target.value)}/>
                    <StyledLabel>비밀번호</StyledLabel>
                    <StyledInput type="password" value={password} placeholder="비밀번호를 입력하세요" onChange={(e) => setPassword(e.target.value)}/>
                    <div>
                        <ButtonLogin onClick={handleLogin}>로그인</ButtonLogin>
                    </div>
                </MemberLogin>
            </StyledLayout>
        </Layout>

    );
};

export default LoginForm;