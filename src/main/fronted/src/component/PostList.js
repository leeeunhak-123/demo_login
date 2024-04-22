import React,{useState,useEffect} from "react";
import Layout from "./Layout";
import axios from "axios";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const MainTitle = styled.h1`
    font-family: "Nexon_football", sans-serif;
    font-size: 3rem;
`
const SearchContainer = styled.div`
    align-items: center;
    margin-bottom: 20px;
`;

// 검색 입력 필드 스타일
const SearchInput = styled.input`
    font-family: "Nexon_stick", sans-serif;
    padding: 10px;
    height: 2rem;
    width: 25rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
`;

// 검색 버튼 스타일
const SearchButton = styled.button`
    padding: 7px 20px 11px;
    text-align: center;
    background: #F2FE8A;
    background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgba(2, 126, 251, 1) 100%);
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    margin-right: 4rem;
`;

//글 작성 버튼 스타일
const WriteButton = styled.button`
    padding: 8px 20px 10px;
    background-color: #6C63FF;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease; /* 배경색 변화에 대한 전환 효과 추가 */
    
    &:hover {
        background-color: #8a85ff; /* 연보라색 */
    }
`;

const SearchOptions = styled.select`
    font-family: "Nexon_stick", sans-serif;
    background-color: #f2f2f2; 
    padding-top: 10px;
    padding-bottom: 11px;
    height: 2.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
`;

const SortOptions = styled.select`
    font-family: "Nexon_stick", sans-serif;
    margin-top: 0.35rem;
    float: right;
    background-color: #f2f2f2; 
    padding: 10px;
    height: 2.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
`;

const TableWrapper = styled.div`
    overflow-x: auto;
    background-color: #f9f9f9;
`;


const Table = styled.table`
    width: 100%;
    border-radius: 5px;
`;


const Th = styled.th`
    background-color: rgba(160, 220, 230, 0.5);
    position: sticky;
    top: 0;
    z-index: 1;
`;

const HeartIcon = styled.span`
    display: inline-block;
    width: 1.5rem; 
    height: 1.5rem; 
    font-size: 1.5rem; 
    color: salmon;
`

const Td = styled.td`
    cursor: pointer;
    padding: 8px;
    border-bottom: 1px solid #ddd;
`;

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState(""); //정렬 상태를 업데이트 하기 위한 변수
    const [searchTerm , setSearchTerm] = useState("");
    const [searchCategory, setSearchCategory] = useState("title");
    //sortBy : 정렬 기준 order:정렬방식
    useEffect(() => {
        const fetchPosts = async () => {
            let url = `${process.env.REACT_APP_API_BASE_URL}/api/posts`;
            if (sortOption) {
                //sortBy : 정렬 기준 order:정렬방식
                const [sortBy, order] = sortOption.split("_");
                url += `?sortBy=${sortBy}&order=${order}`;
            }
            try {
                const response = await axios.get(url);
                setPosts(response.data);
                console.log(posts);
            } catch (error) {
                console.error('포스트 로딩 중 에러', error);
            }
        };
        fetchPosts();
    }, [sortOption]);

    //검색 요청 핸들러
    const handleSearch = async () => {
        let url = `${process.env.REACT_APP_API_BASE_URL}/api/posts/search?category=${searchCategory}&term=${searchTerm}`;
        try{
            const response = await axios.get(url);
            setPosts(response.data);
            console.log(response.data);
        }catch(error) {
            console.error('검색 중 에러',error);
        }
    };
    //검색어 입력 변경 핸들러
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }
    const handleSearchCategoryChange = (e) =>{
        setSearchCategory(e.target.value);
    }
    //검색 카테고리 변경 핸들러

    const handWriteButtonClick = () => {
        const token = localStorage.getItem('token');
        console.log(token);
        if(!token) {
            alert('로그인이 필요합니다!');
            navigate('/login');
        }else {
            //토큰이 있는경우
            navigate('/write');
        }

    };
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        console.log(e.target.value + "순으로 정렬완료");
    }
    //게시글을 보기위한 페이지로 넘어가게 하는 이벤트 생성
    const handleShowPosts = (postId) => {
        navigate(`/post-detail/${postId}`); //상세페이지 경로
    }
    return (
        <Layout>
            <MainTitle>자유 게시판</MainTitle>
            <SearchContainer>
                <SearchOptions value={searchCategory} onChange={handleSearchCategoryChange}>
                    <option value="title">제목별</option>
                    <option value="category">카테고리별</option>
                    <option value="memberNickname">작성자별</option>
                </SearchOptions>
                <SearchInput type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="검색어를 입력하세요"></SearchInput>
                <SearchButton onClick={handleSearch}>검색</SearchButton>
                <WriteButton onClick={handWriteButtonClick}>게시글 작성</WriteButton>
                <SortOptions onChange={handleSortChange}>
                    <option value="">정렬순</option>
                    <option value="createdAt_desc">최신순</option>
                    <option value="likeCount_desc">좋아요순</option>
                </SortOptions>
            </SearchContainer>
            <TableWrapper>
                <Table>
                    <thead>
                        <tr>
                            <Th>카테고리</Th>
                            <Th>제목</Th>
                            <Th>작성자</Th>
                            <Th>작성일</Th>
                            <Th><HeartIcon>&#10084;</HeartIcon></Th>
                        </tr>
                    </thead>
                    <tbody>
                    {posts.map((post) => (
                        <tr key={post.id} onClick={() => handleShowPosts(post.id)}>
                            <Td>{post.category}</Td>
                            <Td>{post.title}</Td>
                            <Td>{post.memberNickname}</Td>
                            <Td>{post.created_at}</Td>
                            <Td>{post.like_count}</Td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </TableWrapper>
        </Layout>
    );
};
export default PostList;