import {BrowserRouter,Routes,Route} from "react-router-dom";
import SignUp from "./component/SignUp";
import LoginForm from "./component/LoginForm";
import Main from "./component/main";
import MyPage from "./component/MyPage";
import Logout from "./component/Logout";
import PostList from "./component/PostList";
import Post_write from "./component/Post_write";
import PostDetail from "./component/PostDetail";
import {SingUpWrapper} from "./css/SingUp";
import styled from "styled-components";


const AppWrapper = styled.div`
    background-image: url("/—Pngtree—strong lights football field background_1233666.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* 배경 이미지 고정 */
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    overflow-y: auto; /* 수직 스크롤 적용 */
`;

function App(){
    return (
        <BrowserRouter>
            <AppWrapper>
                <SingUpWrapper>
                    <div className="App">
                        <Routes>
                            {/* 회원 목록 페이지 */}
                            <Route path ="*" element={<Main /> } />
                            {/* 로그인 페이지 */}
                            <Route path="/login" element={<LoginForm/> } />
                            {/* 회원가입 페이지 */}
                            <Route path="/signup" element={ <SignUp /> } />
                            {/* 마이페이지 */}
                            <Route path="/mypage" element={<MyPage/> } />
                            {/*로그아웃 */}
                            <Route path="/logout" element={<Logout /> } />
                            {/*게시판 페이지 */}
                            <Route path="/posts" element={<PostList/> } />
                            {/*게시판 작성 페이지 */}
                            <Route path="/write" element={<Post_write/> } />
                            {/*게시판 Detail 페이지 */}
                            <Route path="/post-detail/:postId" element={<PostDetail />} />
                        </Routes>
                    </div>
                </SingUpWrapper>
            </AppWrapper>
        </BrowserRouter>
    );
}
export default App;
