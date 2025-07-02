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
  getCurrentUserInfo, refreshNewToken,
} from "../utils/auth";

// AuthContext에서 제공할 데이터의 타입 정의
interface AuthContextType {
  isLoggedIn: boolean; // 현재 로그인 상태 (true: 로그인됨, false: 로그인 안됨)
  userInfo: { memberId: string; authId: string } | null; // 사용자 정보 (ID, 권한)
  isManager: boolean; // 관리자 권한 여부 (ADMIN, MANAGER)
  isAdmin: boolean; // 최고 관리자 권한 여부 (ADMIN만)
  isLoading: boolean; // 초기 로딩 상태
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
  // 사용자 정보를 관리하는 state
  const [userInfo, setUserInfo] = useState<{
    memberId: string;
    authId: string;
  } | null>(null);
  // 초기 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트가 처음 마운트될 때 실행되는 useEffect
  useEffect(() => {
    const initializeAuth = async () => {
      // 토큰이 유효한지 체크
      const loggedIn = checkIsLoggedIn();

      // 토큰이 유효한 경우
      if (loggedIn) {
        // 로그인한 사용자 정보 가져오기
        const currentUserInfo = getCurrentUserInfo();
        setUserInfo(currentUserInfo);
        setIsLoggedIn(true);

      // 유효한 토큰이 아닌 경우
      } else {
        const newToken = await refreshNewToken();

        // 사용자 정보가 있을 때
        if (newToken) {
          const currentUserInfo = getCurrentUserInfo();
          setUserInfo(currentUserInfo);
          setIsLoggedIn(true);

        // 사용자 정보가 없을 때
        } else {
          setIsLoggedIn(false);
          setUserInfo(null);
        }
      }

      // 초기화 완료
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // 로그인 함수: Context의 로그인 상태를 true로 변경
  const login = () => {
    setIsLoggedIn(true);
    // 로그인 시 사용자 정보도 업데이트
    const currentUserInfo = getCurrentUserInfo();
    setUserInfo(currentUserInfo);
  };

  // 로그아웃 함수: 토큰 제거 + Context의 로그인 상태를 false로 변경
  const logout = () => {
    logoutUser(); // localStorage에서 토큰 제거 및 홈페이지로 이동
    setIsLoggedIn(false); // Context 상태를 false로 변경
    setUserInfo(null); // 사용자 정보도 초기화
  };

  // 관리자 권한 여부 계산 (ADMIN, MANAGER 모두 포함)
  const isManager =
    userInfo?.authId === "ADMIN" || userInfo?.authId === "MANAGER";
  // 최고 관리자 권한 여부 계산 (ADMIN만)
  const isAdmin = userInfo?.authId === "ADMIN";

  // Context에 제공할 값들을 객체로 묶기
  const value = {
    isLoggedIn, // 현재 로그인 상태
    userInfo, // 사용자 정보 (ID, 권한)
    isManager, // 관리자 권한 여부 (ADMIN, MANAGER)
    isAdmin, // 최고 관리자 권한 여부 (ADMIN만)
    isLoading, // 초기 로딩 상태
    login, // 로그인 함수
    logout, // 로그아웃 함수
  };

  // Context.Provider로 자식 컴포넌트들을 감싸서 value를 전역적으로 제공
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
