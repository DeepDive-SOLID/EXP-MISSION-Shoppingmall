### 사용자 관리 : main/sign
- controller(컨트롤러)
  - SignController.java
- dto(객체정보)
  - SignCheckIdEmailDto.java
  - SignFindIdDto.java
  - SignInDto.java
  - SignMemberInfoDto.java
  - SignUpCheckIdDto.java
  - SignUpdPwDto.java
  - SignUpDto.java
- repository(jpa)
  - SignRepository.java
- service(비즈니스 로직)
  - SignService.java
  - SignServiceImpl.java

### API 목록
[회원가입]
- HTTP method : POST
- HTTP request URL : /main/sign/signUp
- param : signUpDto
- return : ResponseEntity<String>

[회원가입 아이디 중복 확인]
- HTTP method : POST
- HTTP request URL : /main/sign/checkId
- param : signInCheckIdDto
- return : ResponseEntity<Boolean> (아이디가 있으면 true, 없으면 false)

[로그인]
- HTTP method : POST
- HTTP request URL : /main/sign/login
- param : signInDto
- return : ResponseEntity<String>

[아이디 찾기]
- HTTP method : POST
- HTTP request URL : /main/sign/findId
- param : signFindIdDto
- return : String (memberId)

[비밀번호 재설정 - 아이디, 이메일 확인]
- HTTP method : POST
- HTTP request URL : /main/sign/checkIdEmail
- param : signCheckIIdEmailDto
- return : ResponseEntity<String>

[비밀번호 재설정]
- HTTP method : POST
- HTTP request URL : /main/sign/updPw
- param : signUpdPwDto
- return : ResponseEntity<String>