import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logout from "./Logout";
import styled from "styled-components";
import Layout from "./Layout";
import '../App.css';

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
`;

const UserInfoContainer = styled.div`
    font-family: "Nexon_football", sans-serif;
    font-size: 1.5rem;
    background-color: #f9f9f9;
    background-color: rgba(249, 249, 249, 0.7);
    border: 1px solid #ddd;
    width:30rem;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    margin-top: 2.5rem;
`;
const StyledButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
`;

const LoginBar = styled.div`
    position: fixed;
    top: 7.5px;
    right: 20px;
    border-radius: 5px;
`;

const LogoutButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`;


const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 토큰 가져오기
        const token = localStorage.getItem('token');
        // 토큰이 없으면 로그인 페이지로 이동
        if (!token) {
            alert('로그인이 필요합니다!');
            navigate('/login');
            return;
        }

        // 헤더에 토큰 추가
        const config = {
            headers: {
                Authorization: `${token}` //헤더에 토큰을 추가
            }
        };

        // 사용자 정보 불러오기
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/members/userinfo`;
        axios.get(apiUrl, config)
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error('사용자 정보를 불러오는 중 오류.', error);
            });
    }, [navigate]); // navigate 함수를 의존성 배열에 추가

    const handleLogout = () => {
        // 로그아웃 처리 함수
        localStorage.removeItem('token');
        localStorage.removeItem('nickname');
        console.log("로그아웃 되었습니다");
        // 페이지 새로고침
        window.location.reload();
    };

    return (
        <div>
            <MainTitle to={"/"}>⚽️FC ONLINE</MainTitle>
            <LoginBar>
                <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                <StyledLink to={userInfo ? "/mypage" : "/login"}>
                    <StyledButton>{userInfo ? "마이페이지" : "로그인"}</StyledButton>
                </StyledLink>
                <StyledLink to="/main">
                    <StyledButton>메인페이지</StyledButton>
                </StyledLink>
            </LoginBar>
            {userInfo && (
                <UserInfoContainer>
                    <h2><strong>{userInfo.nickname}</strong>의 정보</h2>
                    <p><strong>이름: </strong> {userInfo.name}</p>
                    <p><strong>이메일:</strong> {userInfo.email}</p>
                    <p><strong>닉네임:</strong> {userInfo.nickname}</p>
                    <p><strong>나이:</strong> {userInfo.age}</p>
                    <p><strong>핸드폰:</strong> {userInfo.phone}</p>
                </UserInfoContainer>
            )}
        </div>

    );
};

export default MyPage;



