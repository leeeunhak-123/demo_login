import React from 'react';

const Logout = ({ onLogout }) => {
    const handleLogout = () => {
        onLogout(); // 로그아웃 처리 함수 호출
    };

    return (
        <button onClick={handleLogout}>로그아웃</button>
    );
};

export default Logout;
