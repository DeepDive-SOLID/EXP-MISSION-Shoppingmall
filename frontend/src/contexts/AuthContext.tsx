import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  isLoggedIn as checkIsLoggedIn,
  logout as logoutUser,
} from "../utils/auth";

// AuthContext에서 제공할 데이터의 타입 정의
interface AuthContextType {
  isLoggedIn: boolean; // 현재 로그인 상태 (true: 로그인됨, false: 로그인 안됨)
  login: () => void; // 로그인 함수 (Context 상태를 true로 변경)
  logout: () => void; // 로그아웃 함수 (토큰 제거 + Context 상태를 false로 변경)
}

// React Context 생성 (초기값은 undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 다른 컴포넌트에서 AuthContext를 쉽게 사용할 수 있도록 하는 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);

  // AuthProvider로 감싸지 않은 컴포넌트에서 useAuth를 사용할 경우 에러 발생
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// AuthProvider 컴포넌트의 props 타입 정의
interface AuthProviderProps {
  children: ReactNode; // AuthProvider로 감쌀 자식 컴포넌트들
}

// 로그인 상태를 전역적으로 관리하는 Provider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 로그인 상태를 관리하는 state (false: 로그인 안됨, true: 로그인됨)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트가 처음 마운트될 때 실행되는 useEffect
  useEffect(() => {
    // localStorage에 저장된 토큰을 확인하여 로그인 상태 초기화
    setIsLoggedIn(checkIsLoggedIn());
  }, []); // 빈 배열이므로 컴포넌트 마운트 시에만 실행

  // 로그인 함수: Context의 로그인 상태를 true로 변경
  const login = () => {
    setIsLoggedIn(true);
  };

  // 로그아웃 함수: 토큰 제거 + Context의 로그인 상태를 false로 변경
  const logout = () => {
    logoutUser(); // localStorage에서 토큰 제거 및 홈페이지로 이동
    setIsLoggedIn(false); // Context 상태를 false로 변경
  };

  // Context에 제공할 값들을 객체로 묶기
  const value = {
    isLoggedIn, // 현재 로그인 상태
    login, // 로그인 함수
    logout, // 로그아웃 함수
  };

  // Context.Provider로 자식 컴포넌트들을 감싸서 value를 전역적으로 제공
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
