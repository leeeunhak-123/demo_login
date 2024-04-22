import {useNavigate} from 'react-router-dom';
import React,{useState} from "react";
import axios from "axios";
import Layout from "./Layout";
import styled from "styled-components";

const SignUpForm = styled.div`
    background-color: #f9f9f9;
    background-color: rgba(249, 249, 249, 0.7);
    border: 2px solid #ccc;
    width: 45rem;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const SignUpButton = styled.button`
    border-radius: 3px;
`


const SignUp = ({setMembers}) => {
    const [newMember,setNewMember]= useState({name: "",email:"",userPw:"",nickname:"",phone:"",age:""});

    const handleInputChange = (e)=> {
        const {name,value} = e.target;
        //휴대전화인 경우에만 정규 표현식을 적용하여 포맷팅
        setNewMember((prevData)=>({
            ...prevData,
            [name]: value,
        }));
    };
    const navigate = useNavigate(); //useNavigate를 사용하여 history 객체 생성

    const insertMember = () => {
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/members/insert`, newMember)
            .then((res) => {
                console.log("새로운 회원이 추가되었습니다.");

                // 새로운 회원을 추가한 후에 다시 회원 목록을 갱신
                axios
                    .get(`${process.env.REACT_APP_API_BASE_URL}/api/members`)
                    .then((res) => setMembers(res.data))
                    .catch((error) => console.error("회원을 추가하는데에 오류 발생", error));

                // 회원 추가 후 로그인 페이지로 이동
                navigate("/main");
            })
            .catch((error) => console.error("회원을 추가하는데에 오류 발생", error));
    };

    return (
        <Layout>
            <SignUpForm>
                <h2>Sign Up</h2>
                <label>이름</label>
                <input type="text" name="name" value={newMember.name} onChange={handleInputChange}/>
                <label>이메일</label>
                <input type="text" name="email" value={newMember.email} onChange={handleInputChange}/>
                <label>비밀번호</label>
                <input type="password" name="userPw" value={newMember.userPw} onChange={handleInputChange}/>
                <label>나이</label>
                <input type="number" name="age" value={newMember.age} onChange={handleInputChange}/>
                <label>닉네임</label>
                <input type="text" name="nickname" value={newMember.nickname} onChange={handleInputChange}/>
                <label>전화번호</label>
                <input type="text" name="phone" value={newMember.phone} onChange={handleInputChange}/>

                <SignUpButton onClick={insertMember}>가입</SignUpButton>
            </SignUpForm>
        </Layout>
    );
};

export default SignUp;