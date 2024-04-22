import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import axios from 'axios';
import styled from 'styled-components';
import '../App.css';
import Post_write from "./Post_write";

const MainTitle = styled(Link)`
    font-size: 3rem;
    color: black; 
    font-weight: bolder;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); 
    cursor: pointer;
    text-decoration: none;
    font-family: "Nexon_football", sans-serif; 
    background-color: #87ceeb; 
    padding: 10px 20px; 
    border-radius: 10px;
    align-items: center;
    margin-left: 20rem;

    /* 1024px 이하에서 적용되는 스타일 */
    @media (max-width: 1024px) {
        margin-left: 10rem;
    }
`;

const StyledButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
`;

const LogoutButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
`

const LoginBar = styled.div`
    float: right;
    margin-left: 4rem;
    
`;

const ContentWrapper = styled.div`
    margin-top: 3rem;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const StyledDiv = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
    width: 60rem;
    background-color: #6C63FF;
    color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    text-align: center;

    /* 1024px 이하에서 적용되는 스타일 */
    @media (max-width: 1024px) {
        width: auto;
        flex-wrap: wrap;
        justify-content: center;
    }
`;

const Styled = styled(Link)`
    font-family: "Nexon_football", sans-serif;
    padding: 1rem;
    text-decoration: none;
    color: white;
    width: 100%;
    font-size: 1.5rem;
    &:hover {
        color: #4B0082;
    }
`;
const Divider = styled.div`
    width: 1px;
    height: 1.5rem;
    background-color: #6C63FF;
`;

const Layout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        // 페이지 로드 시 사용자의 로그인 상태 확인
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const userNickname = localStorage.getItem('nickname');
            setNickname(userNickname);
        }
    }, []);

    // 로그아웃 처리 함수
    const handleLogout = () => {
        // 로컬 스토리지에서 토큰 및 사용자 정보 제거
        localStorage.removeItem('token');
        localStorage.removeItem('nickname');
        console.log("로그아웃 되었습니다");
        // 로그인 상태 변경
        setIsLoggedIn(false);
        // 사용자 닉네임 초기화
        setNickname("");
    };

    return (
        <div>
            <MainTitle to="/">⚽️FC ONLINE</MainTitle>
            <LoginBar>
                {isLoggedIn ? (
                    <>
                        <p><strong>{nickname}</strong>님, 환영합니다!</p>
                        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                    </>
                ) : (
                    <StyledLink to="/login">
                        <StyledButton>로그인</StyledButton>
                    </StyledLink>
                )}
                <Link to="/mypage">
                    <StyledButton>마이페이지</StyledButton>
                </Link>
                <Link to="/signup">
                    <StyledButton>회원가입</StyledButton>
                </Link>
            </LoginBar>
            <StyledDiv>
                <Styled to={"/posts"}>자유 게시판</Styled>
                <Divider />
                <Styled to={"/evaluation"}>선수 평가</Styled>
            </StyledDiv>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </div>
    );
};

export default Layout;
