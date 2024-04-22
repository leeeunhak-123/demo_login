import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import MyPage from './MyPage';
import PostList from "./PostList";
import Post_write from "./Post_write";
import PostDetail from "./PostDetail";
import axios from "axios";
import styled from "styled-components";
import Layout from "./Layout";

const MainWrapper = styled.div`
    background-position: center;
    width: 100%;
    height: 100vh; /* 뷰포트의 높이와 동일하게 설정 */
    display: flex;
    justify-content: center; 
`;
const FontStyle = styled.div`
    font-family: 'DoHyeon';
`
const MemberList = styled.h2`
    font-family: "Nexon_football", sans-serif;
    padding-top: 1.5rem;
    font-size: 3rem;
    padding-bottom: 3rem;
`
const MemberInform = styled.ul`
    background-color: #f9f9f9;
    background-color: rgba(249, 249, 249, 0.7);
    border: 2px solid #ccc;
    width: 25rem;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    padding: 20px; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    
`
const MemberItem = styled.li`
    padding-bottom: 0.8rem;
    font-size: 1.3rem;
`

const Main = () => {
    const [members, setMembers] = useState([]);
    const [nickname, setNickname] = useState(""); // 사용자 닉네임 상태

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/members`;
        axios.get(apiUrl)
            .then((res) => setMembers(res.data))
            .catch((error) => console.error('회원 목록을 불러오는데 오류가 발생했습니다.', error));
    }, []);
    return (
        <MainWrapper>
            <Layout>
                <div>
                    <MemberList>회원 목록</MemberList>
                    <MemberInform>
                        <FontStyle>
                            {members.map((member) => (
                                <MemberItem key={member.id} className={"member-item"}>
                                    {member.name}({member.nickname}) - {member.age}세
                                </MemberItem>
                            ))}
                        </FontStyle>
                    </MemberInform>
                    <Routes>
                        <Route path="/posts" element={<PostList /> } />
                        <Route path="/write" element={<Post_write/> } />
                        <Route path="/post-detail/:postId" element={<PostDetail /> } />
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </div>
            </Layout>
        </MainWrapper>
    );
};

export default Main;


