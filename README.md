<h4 align='center'>
캡스톤 디자인 2 - SafePill입니다. 
</h4>
<br>

## SafePill이란  

 건강에 대한 관심도가 증가하는 현대 사회의 흐름에 따라, 자연스럽게 의약품의 발달이 이루어졌고 이는 1인 가구의 의약품 구비 비율이 증가하는 현상을 원인이 되었습니다.  

 하지만 의약품을 구하기는 쉽지만, 약품에 대한 성분과 약품의 상호 작용과 같은 정확한 정보를 빠르게 구할 수 없다는 문제점을 발견하였습니다.

 이러한 문제점을 해결하고자 ‘증상 및 이름에 적합한 약품의 정보와 약들의 상호 작용의 문제 여부를 사용자에게 제공하는 서비스를 만들면 어떨까?’라는 생각으로 선정하였습니다. 

 ## **주요기능**  
### **메인페이지 라우팅**    
<img width="80%" src="https://user-images.githubusercontent.com/81761524/207899880-7df408fa-0d19-4bf9-afb7-9971622f8ab5.gif"/>  

### **증상에 따른 약 추천 **     
<img width="80%" src="https://user-images.githubusercontent.com/81761524/207899822-d61d4391-a7b5-49a8-a8e4-af744a645b17.gif"/>    

### **약명에 따른 약 조회**       
<img width="80%" src="https://user-images.githubusercontent.com/81761524/207899887-998e8bde-ca36-4cd3-9577-d00f142aec9b.gif"/>  

### **병용금기 조회**     
<img width="80%" src="https://user-images.githubusercontent.com/81761524/207899841-67e15435-779c-4731-a36b-d7297c34f49b.gif"/>  

### **...etc**     
<img width="80%" src="https://user-images.githubusercontent.com/81761524/207899830-8d2fe001-4aa8-40cc-9f0a-64d0d6673f81.gif"/>  

<br>

## How to Start?

```
# Step 0 : 처음 시작한 경우
yarn install

# Step 1 : 실행
yarn start
```

<br>

## 🛠 Tech Stack

```
주요 개발 언어, 프레임워크
-   JavaScript, React-native

상태 관리
- Recoil


```

## commit message

| 헤더     | 내용                                                                  |
| -------- | --------------------------------------------------------------------- |
| Feat     | 새로운 기능 추가                                                      |
| Refactor | 코드 리팩토링                                                         |
| Fix      | 버그 수정                                                             |
| Style    | 세미 콜론 수정, 줄바꿈, 스타일 등 기능에 지장 가지 않는 스타일 변경   |
| Test     | 테스트 추가, 테스트 코드 리팩터링, 프로덕션 코드 변경 없음            |
| Chore    | 빌드 테스크 업데이트, 패키지 매니저 환경설정, 프로덕션 코드 변경 없음 |
| Merge    | 합병 및 깃 충돌 해결 커밋 메시지                                      |
| Docs     | 문서,주석 수정                                                        |

<br>



<br>

## **폴더구조**

```
src
├── assests
│   └── fonts
│
├── Atoms
│   └── atoms.js
│
├── Components
│   ├── Footer.js
│   └── Header.js
│
│
├── Datas
│   └── Symptoms.js
│
├── Screen
│   ├── CommentList.js
│   ├── Main.js
│   ├── Recommend.js
│   ├── Result.js
│   ├── Search.js
│   ├── Select.js
│   ├── SignIn.js
│   └── SignUp.js
│
└── else
```
