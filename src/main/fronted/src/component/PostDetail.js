import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import styled from "styled-components";
import hearImage from '../images/heart.png';


const BlockWrapper = styled.div`
    display: block;
`

const CategoryDiv = styled.p`
    font-weight: bold;
    margin-left: -40rem;
    font-family: "Nexon_stick", sans-serif;
`
const NicknameDiv = styled.p`
    font-weight: bold;
    margin-left: -40.4rem;
    font-family: "Nexon_stick", sans-serif;
`

const DateDiv = styled.p`
    text-align: center;
    font-family: "Nexon_stick", sans-serif;
`

const Maintitle = styled.h1`
    font-size: 2.5rem;
    font-family: "Nexon_football", sans-serif;
`
const PostImg = styled.img`
    width: 100%; // 이미지가 항상 컨테이너 너비에 맞춰지도록 설정
    max-width: 50rem; // 이미지 최대 너비 제한
    object-fit: contain; // 이미지가 영역에 맞춰져 자연스럽게 보이도록 설정
    border-radius: 10px; // 이미지 모서리를 둥글게 하려면 추가
    margin-bottom: 20px; // 이미지 아래에 여백 추가
`
const PostDetailWrapper = styled.div`
    background-color: #f9f9f9;
    background-color: rgba(249, 249, 249, 0.7);
    border: 2px solid #ccc;
    width: 50rem;
    margin: -2rem auto auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    img{
        width:4rem;
    }
`
const LikeCount = styled.div`
    font-family: "Nexon_football", sans-serif;
    font-size: 1.5rem;
`
const TextArea = styled.textarea`
    font-family: "Nexon_stick", sans-serif;
    font-size: 1.2rem;
    width: inherit;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 5rem;
`;
const CommentWrapper = styled.div`
    background-color: #f9f9f9;
    background-color: rgba(249, 249, 249, 0.7);
    border: 2px solid #ccc;
    width: 48rem;
    margin: -2rem auto auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CommentButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
`;
const CommentTitle = styled.h2`
    font-family: "Nexon_football", sans-serif;
    font-size: 2rem;
`
const CommentCard = styled.div`
    width: inherit;
    padding: 10px 15px;
    border-radius: 8px;
    background-color: rgba(255, 192, 203, 0.5); // 투명한 핑크색 배경
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    margin-bottom: 2px;
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
`;

const CommentInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 5px 0;
`;

const CommentName = styled.span`
    font-family: "Nexon_stick", sans-serif;
    font-size: 0.8rem;
    margin-right: 20px;
    color: #333;
`;

const CommentDate = styled.span`
    color: #666;
    font-size: 0.8rem;
    text-align: right;
`;

const CommentContent = styled.p`
    font-family: "Nexon_stick", sans-serif;
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 8px; // 위쪽 여백
    line-height: 1.4; // 줄 간격
`;


const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [newComment,setNewComment] = useState(""); // 새 댓글 입력란
    const [comments, setComments] = useState([]); // 댓글 목록

    useEffect(() => {
        // 게시물 상세 정보 가져오기
        const fetchPostDetail = async () => {
            try {
                console.log("현재 postId:", postId); //postId 출력
                const postResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`);
                setPost(postResponse.data);
            } catch (error) {
                console.error('게시물 로딩중 오류', error);
            }
        };

        // 댓글 목록 불러오기
        const fetchComments = async () => {
            try {
                const commentsResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/comment/posts/${postId}`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error("댓글 로딩중 오류", error);
            }
        };
        fetchPostDetail();
        fetchComments();
    }, [postId]);

    // 댓글 작성 함수
    const handleAddComment = async () => {
        if(!newComment.trim()) return; //빈 내용이면 리턴
        try{
            const token = localStorage.getItem('token');
            const nickname = localStorage.getItem('nickname');

            //서버에 댓글 추가 요청
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/comment`,
                {postId, memberNickname: nickname, content: newComment},
                {headers: {Authorization:`${token}`}}
            );

            //서버로부터 반환된 새 댓글 데이터
            const addedComment = response.data;
            console.log(addedComment.memberNickname);
            console.log(addedComment.createdAt);

            //새 댓글을 댓글 목록에 추가
            setComments([addedComment, ...comments]);
            setNewComment("");
            console.log("댓글 목록",comments);
        }catch(error){
            console.error('댓글 작성 오류',error);
        }
    };
    // 날짜 문자열을 변환하는 함수
    const convertDateFormat = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해주고, 두 자리로 맞춤
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours(); // 12시간제로 변경
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

        return `${year}-${month}-${day} ${hour}:${minute}:${second} ${ampm}`;
    };

    // 로딩 중 혹은 데이터가 없을 때 표시할 내용
    if (!post) {
        return (
            <Layout>
                <h1>게시글을 불러오는 중...</h1>
            </Layout>
        );
    }
    return(
        <Layout>
            <PostDetailWrapper>
                <BlockWrapper>
                    <CategoryDiv>Category: {post.category}</CategoryDiv>
                    <NicknameDiv>nickname: {post.memberNickname}</NicknameDiv>
                </BlockWrapper>
                <Maintitle>{post.title}</Maintitle>
                {post.image_url && <PostImg src={`http://localhost:8080/images/${post.image_url}`} alt="Post" />}
                <p>{post.content}</p>
                <LikeButton>
                    <img src={hearImage} alt="Like" style={{background:'none', imageRendering: "pixelated"}}/>
                </LikeButton>
                <LikeCount>{post.like_count}</LikeCount>
                <DateDiv>작성일: {new Date(post.created_at).toLocaleDateString()}</DateDiv>
                <TextArea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요."
                />
            </PostDetailWrapper>
            <CommentButton onClick={handleAddComment}>작성</CommentButton>
            {/*댓글 목록 표시*/}
            <CommentWrapper>
                <CommentTitle>댓글</CommentTitle>
                {comments.map((comment) => (
                    <CommentCard key={comment.id}>
                        <CommentInfo>
                            <CommentName>nickname:<strong> {comment.memberNickname}</strong></CommentName>
                            <CommentDate>{
                                comment.createdAt
                                    ? convertDateFormat(comment.createdAt)
                                    : '날짜 정보 없음'
                            }</CommentDate>
                        </CommentInfo>
                        <CommentContent>{comment.content}</CommentContent>
                    </CommentCard>
                ))}
            </CommentWrapper>
        </Layout>
    )
}

export default PostDetail;