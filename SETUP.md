# 지엘보험중개 홈페이지 — 배포 & 관리 가이드

## 📁 프로젝트 구조

```
.
├── index.html              # 메인 페이지
├── styles.css              # 스타일
├── app.jsx, sections.jsx, board.jsx, data.jsx
├── tweaks-panel.jsx
├── assets/
│   ├── gl-logo.png         # 로고
│   ├── sleep-tokens.css    # 디자인 토큰
│   └── files/              # 게시판 첨부파일 업로드 위치
├── content/
│   └── board.json          # 게시판 글 데이터
├── admin/
│   ├── index.html          # Decap CMS 관리자 페이지
│   └── config.yml          # CMS 설정
└── netlify.toml            # Netlify 설정
```

## 🚀 Netlify 배포

### Step 1. GitHub 저장소 만들기
1. GitHub에서 새 저장소 생성 (예: `gl-website`)
2. 이 프로젝트 폴더를 그대로 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/gl-website.git
git branch -M main
git push -u origin main
```

> ⚠️ `admin/config.yml` 의 `branch: main` 이 GitHub 기본 브랜치와 일치해야 합니다.

### Step 2. Netlify 사이트 연결
1. [app.netlify.com](https://app.netlify.com) 로그인
2. **Add new site → Import from Git → GitHub** 선택
3. 방금 만든 저장소 선택
4. Build settings는 기본값(빌드 명령 없음, publish `/`) 그대로 → **Deploy**

배포가 끝나면 `https://<랜덤이름>.netlify.app` 으로 사이트가 열립니다.

### Step 3. 도메인 연결 (선택)
Netlify 대시보드 → **Domain settings → Add custom domain** 에서 자체 도메인(예: `glinsurance.kr`) 연결.

---

## ⚙️ 관리자 페이지 (Decap CMS) 설정

배포 후 `https://your-site.netlify.app/admin/` 에 접속해 글·파일을 편집할 수 있게 활성화합니다.

### Step 1. Netlify Identity 활성화
1. Netlify 대시보드 → **Site configuration → Identity** 메뉴 진입
2. **Enable Identity** 클릭
3. **Registration preferences** → "**Invite only**" 로 설정 (외부인 가입 차단)

### Step 2. Git Gateway 활성화
1. 같은 **Identity** 페이지 하단 → **Services → Git Gateway** 섹션
2. **Enable Git Gateway** 클릭 → GitHub 권한 승인

### Step 3. 관리자 계정 초대
1. **Identity** 페이지 → **Invite users** 클릭
2. 관리자가 될 이메일 주소 입력 (여러 명 가능)
3. 받은 메일에서 **Accept the invite** → 비밀번호 설정

### Step 4. 사용
1. `https://your-site.netlify.app/admin/` 접속
2. 초대받은 계정으로 로그인
3. **공시·소식 게시판** 메뉴에서 글 추가/수정/삭제, 파일 업로드 가능
4. 저장하면 자동으로 GitHub에 커밋되고 사이트에 1~2분 내 반영됩니다

---

## 📝 게시판 운영 — 자주 쓰는 작업

### 새 글 작성
1. `/admin/` 로그인 → **공시·소식 게시판 → 게시글 목록**
2. 우측 **게시글** 리스트에서 **+** 버튼
3. 입력:
   - **제목**: 글 제목
   - **분류**: 공지사항 / 리서치·보고서 / 정책·약관
   - **등록일**: 날짜 선택
   - **본문**: 마크다운 에디터로 작성 (## 소제목, - 목록 등)
   - **첨부파일**: 필요 시 PDF/문서 업로드
   - **상단 고정**: 게시판 맨 위 고정시 체크
   - **NEW 뱃지**: 새 글 표시 (보통 1~2주 후 해제 권장)
4. **Save** → 자동 배포 (1~2분 후 사이트 반영)

### 첨부파일 업로드
글 작성 화면에서 **첨부파일** 섹션의 **파일 업로드** 위젯으로 직접 올리면 `assets/files/` 폴더에 자동 저장되고 다운로드 링크가 글에 표시됩니다.

### ID 관리
각 글의 **ID**는 고유 번호여야 합니다. 새 글을 만들 때 기존 글 중 가장 큰 ID + 1 을 입력해주세요. (자동 부여 기능이 필요하면 추가 작업 가능)

---

## 🛠 직접 코드로 수정해야 하는 항목

CMS로 관리하지 않는 항목들은 다음 파일을 직접 수정:

| 변경 대상 | 파일 |
|---|---|
| 회사 슬로건·소개 문구 | `sections.jsx` (Hero, WhyUs 부분) |
| 보험 상품 라인업 | `sections.jsx` (`PRODUCTS` 객체) |
| 중개 프로세스 단계 | `sections.jsx` (`PROCESS` 객체) |
| 푸터 회사정보 | `sections.jsx` (`Footer` 컴포넌트) |
| 색상·여백·폰트 | `styles.css` |

---

## ❓ 문제 해결

- **`/admin/` 접속 시 빈 화면**: Netlify Identity와 Git Gateway가 모두 활성화되었는지 확인
- **로그인 후 GitHub 권한 오류**: Git Gateway를 다시 한 번 Disable → Enable
- **저장은 됐는데 사이트에 반영 안 됨**: Netlify 대시보드 **Deploys** 탭에서 빌드 진행 상태 확인
- **글이 안 보임**: 브라우저 강력 새로고침 (Ctrl/Cmd+Shift+R)

도움 필요하시면 언제든 말씀해 주세요.
