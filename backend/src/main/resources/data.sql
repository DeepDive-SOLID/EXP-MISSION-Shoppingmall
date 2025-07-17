-- auth 테이블 초기 데이터
MERGE INTO auth (auth_id, auth_name) VALUES ('ADMIN', '관리자');
MERGE INTO auth (auth_id, auth_name) VALUES ('MANAGER', '여행 상품 관리자');
MERGE INTO auth (auth_id, auth_name) VALUES ('USER', '사용자');

-- card 테이블 초기 데이터
MERGE INTO card (card_id, card_img) VALUES (1111, '/card/kakao.jpg');
MERGE INTO card (card_id, card_img) VALUES (2222, '/card/kb.jpg');
MERGE INTO card (card_id, card_img) VALUES (3333, '/card/nh.jpg');
MERGE INTO card (card_id, card_img) VALUES (4444, '/card/samsung.jpg');
MERGE INTO card (card_id, card_img) VALUES (5555, '/card/shinhan.jpg');

-- member 테이블 초기 데이터(관리자 권한)
MERGE INTO member (member_id, auth_id, member_name, member_pw, member_email, member_phone, member_birth, member_img) VALUES ('admin', 'ADMIN', '관리자', 'admin', 'admin@gmail.com', '010-1111-1111', '1990-01-01', null);

