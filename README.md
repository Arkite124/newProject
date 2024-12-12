#new Project<br>
Patch Log<br>
1. 아이디에 따른 Basket list Load하는 법(loginUser.json에 있는 user_id값이 arkite인지 아닌지를 따져서 맞다면 ${user_id}Baskets.json목록에 있는 파일을 동기화) (12/9)<br>
2. product.json,product1.json,product2.json에 상품 목록 이미지파일 파일경로 동기화(12/10)<br>
3. loginUser.json,arkiteBaskets.json 데이터 수정 및 업데이트(12/10)<br>
4. 전체적인 상품 갯수를 추가로 업데이트 했습니다. product,product2에 해당하는 이미지 및 product,product1,product2의 코드 번호 변경 주류는 내일 마저 업데이트 예정입니다.(12/10)<br>
5. product1(주류) 이미지파일 마무리 및 qtyinput 구조 변경 input => select, 주류는 3개 이상 선택 불가, 글씨체 튀는거 조정 마무리(12/11)
6. h1,h2 항목 UserSelect:none, 모든 버튼 스타일 조정, 중복 불러오기 불가 대신 불러오기 후 닫기버튼으로 텍스트를 바꿔 구현함. 닫기 누르면 해당 카테고리의 항목이 사라짐. 이로 인한 각 항목 ID변경 및 CSS와 마크업 구조 변경.(12/11)
7. (final)모든 항목 user-select : none 적용, 접기 누르면 가로축도 맞게 줄어들음.(12/12)