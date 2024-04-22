import React, {useEffect, useState} from "react";
import axios from "axios";
import Layout from "./Layout";
import styled from "styled-components";

const Maintitle = styled.h1`
  font-size: 3rem;
  font-family: "Nexon_football", sans-serif;
    margin-top: 1rem;
`;

const CategorySelect = styled.select`
    width: 9rem;
    height: 2.5rem;
    font: inherit;
    border-radius: 8px;
`

const Container = styled.div`
  font-family: "Nexon_football", sans-serif;
  font-size: 1.5rem;
  background-color: #f9f9f9;
  background-color: rgba(249, 249, 249, 0.7);
  border: 1px solid #ddd;
  width: 50rem;
  max-height: 110vh; /* 최대 높이 설정 */
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  margin: 0 auto;
`;


const FormContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const Formtitle = styled.label`
  font-size: 2rem;
`;

const Input = styled.input`
    font: inherit;
  font-size: 1.5rem;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid black;
  border-radius: 5px;
`;
const Imageinput = styled.input`
    font:inherit;
    font-size: 1.3rem;
    width:30%;
    border: 1px solid black;
    border-radius: 8px;
`

const TextArea = styled.textarea`
    font:inherit;
  font-size: 1.2rem;
  width: 100%;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
    height: 30rem;
`;

const Button = styled.button`
  font-size: 1.5rem;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Post_write = ({ nickname }) => {
    const [category, setCategory] = useState(""); // 카테고리
    const [title, setTitle] = useState(""); // 제목
    const [content, setContent] = useState(""); // 내용
    const [image, setImage] = useState(null); // 이미지
    const [comments, setComments] =useState([]); //댓글 목록

    const handlePostSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const nickname = localStorage.getItem('nickname');
            console.log(nickname);
            const config = {
                headers: {
                    'Authorization': `${token}`, // 토큰을 Authorization 헤더에 포함
                    "Content-Type": "multipart/form-data", // 이미지를 포함한 데이터를 전송할때
                },
            };

            // FormData 객체 생성
            const formData = new FormData();
            formData.append("memberNickname",nickname);
            formData.append("category", category);
            formData.append("title", title);
            formData.append("content", content);
            if(image) {
                formData.append("image", image);
            }
            // 게시글 작성 요청
            const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/posts/write`;
            const response = await axios.post(apiUrl, formData, config);

            // 요청 성공
            console.log("게시글 작성 성공:", response.data);
            alert('게시글이 작성되었습니다.')
        } catch (error) {
            console.error("게시글 작성 오류:", error);
        }
    };

    return (
        <Layout>
            <Container>
                <Maintitle>게시판 작성</Maintitle>
                <FormContainer>
                    <Formtitle>카테고리</Formtitle>
                    <CategorySelect
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">카테고리 선택</option>
                        <option value="선수질문">선수질문</option>
                        <option value="팀질문">팀질문</option>
                        <option value="득템/강화">득템/강화</option>
                        <option value="꿀팁">꿀팁</option>
                        <option value="정보공유">정보공유</option>
                    </CategorySelect>
                </FormContainer>
                <FormContainer>
                    <Formtitle>이미지 파일</Formtitle>
                    <Imageinput
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                    />
                </FormContainer>
                <FormContainer>
                    <Formtitle>글 제목</Formtitle>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목"
                    />
                </FormContainer>
                <FormContainer>
                    <Formtitle>본문</Formtitle>
                    <TextArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="본문 내용을 입력하세요"
                    />
                </FormContainer>
                <Button onClick={handlePostSubmit}>게시글 작성</Button>
            </Container>
        </Layout>
    );
};

export default Post_write;
