# 너로 정했다!👊 (On no, It's me!)

### 익명 투표 기반 밸런스 게임 & 커뮤니티 플랫폼, 너로 정했다!

![main](public/readme/main.png)

## 🚀 프로젝트 소개

유레카 프론트엔드 대면반 2기의 하루 활기를 복돋아줄 **익명 투표 기반 밸런스 게임 & 커뮤니티 플랫폼**입니다.

### ⏳ 프로젝트 개발 기간

2025.03.13 ~ 2025.03.21 (7일)

### 👥 팀원 소개

| 이영주(팀장)                                                                | 박은서                                                                      | 이다예                                                                       | 진영호                                                                       |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/u/77565980?v=4" width="96"> | <img src="https://avatars.githubusercontent.com/u/88071251?v=4" width="96"> | <img src="https://avatars.githubusercontent.com/u/138192341?v=4" width="96"> | <img src="https://avatars.githubusercontent.com/u/149752689?v=4" width="96"> |
| [@abyss-s](https://github.com/abyss-s)                                      | [@arty0928](https://github.com/arty0928)                                    | [@leedaye0412](https://github.com/leedaye0412)                               | [@kuru2141](https://github.com/kuru2141)                                     |

## 🌟 주요 기능

| 기능             | 설명                                                   |
| ---------------- | ------------------------------------------------------ |
| 🗳 투표 진행      | 유레카 프론트엔드 대면반 멤버들이 등장하는 밸런스 게임 |
|                  | 4명 중 반드시 한 명을 선택하여 투표를 참여해야 함      |
| 🏆 랭킹 시스템   | 제한 시간동안 투표 진행                                |
|                  | 투표 마감 후 1위 공개                                  |
| 💬 익명 커뮤니티 | **익명 댓글창에서 자유로운 수다 가능**                 |
|                  | 로그인 시 랜덤 닉네임 자동 부여                        |

## 🛠️ 기술 스택

| 카테고리     | 스택                                                                                                                                                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | <img src="https://img.shields.io/badge/React-61DAFB.svg?&style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Javascript-F7DF1E.svg?&style=flat-square&logo=Javascript&logoColor=white"/>                                                                                                           |
| **Backend**  | <img src="https://img.shields.io/badge/Spring_Boot-6DB33F.svg?&style=flat-square&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1.svg?&style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/MyBatis-2E4E4E.svg?&style=flat-square&logo=MyBatis&logoColor=white"/> |

## 📊 Flowchart

![ERD 다이어그램](public/readme/flow.png)

## 📌 ERD Diagram

![ERD 다이어그램](public/readme/erd.png)

## 📑 API Documents

[🔗 Notion API 명세서 확인하기](https://lowly-brian-a99.notion.site/1af64f2ada64805da616db17bceb4efe?v=1af64f2ada64813ba8ac000c12b30f1f)

## 📂 Folder Architecture

```plaintext
📦springboot-app
┣ 📂.gradle
┃ ┣ 📂8.13
┣ 📂gradle
┃ ┗ 📂wrapper
┣ 📂src
┃ ┣ 📂main
┃ ┃ ┣ 📂java
┃ ┃ ┃ ┗ 📂com
┃ ┃ ┃ ┃ ┗ 📂uplus
┃ ┃ ┃ ┃ ┃ ┗ 📂eureka
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂candidate
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂comment
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂poll
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂user
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂vote
┃ ┃ ┣ 📂resources
┃ ┃ ┃ ┣ 📂mapper
┃ ┃ ┃ ┃ ┣ 📜candidates.xml
┃ ┃ ┃ ┃ ┣ 📜comments.xml
┃ ┃ ┃ ┃ ┣ 📜poll.xml
┃ ┃ ┃ ┃ ┣ 📜users.xml
┃ ┃ ┃ ┃ ┗ 📜vote.xml
┃ ┃ ┃ ┣ 📂static
┃ ┃ ┃ ┃ ┣ 📂assets
┃ ┃ ┃ ┃ ┃ ┗ 📂img
┃ ┃ ┃ ┃ ┣ 📜eureka_logo.png
┃ ┃ ┃ ┃ ┗ 📜index.html
┃ ┃ ┃ ┗ 📜application.properties
┣ 📂target
┣ 📜.gitignore
┣ 📜README.md
┣ 📜build.gradle
┣ 📜application.properties
┗ 📜settings.gradle
```

## 프로젝트 실행 방법

> 본 프로젝트는 Springboot를 사용하므로 `springboot-app/src/main/resources/application.properties` 파일을 수정해주세요.

```yml
spring.datasource.hikari.jdbc-url=jdbc:mysql://localhost:3306/mini4?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8 # Database
spring.datasource.hikari.username=username # username
spring.datasource.hikari.password=password # password
```

> 본 프로젝트는 gradle 기반이므로 다음 명령어를 사용해 빌드 및 실행할 수 있습니다.

```sh
cd springboot-app/
./gradlew bootRun
```


> 본 프로젝트는 Docker를 활용하여 빌드 및 실행할 수 있습니다.
```sh
docker build -t backend .
docker run -d -p 8080:8080 backend
```