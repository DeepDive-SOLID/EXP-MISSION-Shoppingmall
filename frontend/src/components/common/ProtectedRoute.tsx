import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // 인증이 필요한지 여부 (기본값: true)
  requireAdmin?: boolean; // 관리자 권한이 필요한지 여부 (기본값: false)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
}) => {
  const { isLoggedIn, isAdmin } = useAuth();

  // 로그인이 필요한데 로그인하지 않은 경우
  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 관리자 권한이 필요한데 관리자가 아닌 경우
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // 모든 조건을 만족하면 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
