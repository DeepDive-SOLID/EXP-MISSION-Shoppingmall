export interface SignUpDto {
  memberId: string; // 회원 아이디
  memberName: string; // 회원 이름
  memberPw: string; // 회원 비밀번호
  memberEmail: string; // 회원 이메일
  memberPhone: string; // 회원 전화번호
  memberBirth: string; // 회원 생년월일
  authId?: string; // 권한 ID (선택사항)
}

export interface SignInDto {
  memberId: string; // 회원 아이디
  memberPw: string; // 회원 비밀번호
}

export interface SignFindIdDto {
  memberEmail: string; // 회원 이메일
}

export interface SignCheckIdEmailDto {
  memberId: string; // 회원 아이디
  memberEmail: string; // 회원 이메일
}

export interface SignInCheckIdDto {
  memberId: string; // 확인할 회원 아이디
}

export interface SignUpdPwDto {
  memberId: string; // 회원 아이디
  memberPw: string; // 새로운 비밀번호
}

export type SignUpResponse = string;

export type SignInResponse = string;

export type FindIdResponse = string; // memberId

export type CheckIdEmailResponse = string; // "SUCCESS" or "FAIL"

export type UpdPwResponse = string; // "SUCCESS" or "FAIL"

export type CheckIdResponse = boolean;
