// Main sections — Hero, Why-us, Services, Products, Process, CTA, Footer
const { useState, useEffect } = React;

// ─── small SVG icon set ─────────────────────────────────────────
const Icon = {
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  layers: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 17 9 5 9-5"/><path d="m3 12 9 5 9-5"/></svg>
  ),
  arrowRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  search: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  pin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>
  ),
  x: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
};

// ─── NAV ────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <a href="#top" className="nav-brand">
        <img src="assets/gl-logo.png" alt="GL"/>
        <div className="nav-brand-text">
          <span className="kr">지엘보험중개</span>
        </div>
      </a>
      <div className="nav-links">
        <a href="#services">서비스</a>
        <a href="#products">상품</a>
        <a href="#process">프로세스</a>
        <a href="#board">공시·소식</a>
        <a href="#contact">오시는 길</a>
      </div>
      <a href="#contact" className="nav-cta">상담 신청</a>
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────
function Hero({ showStats = true }) {
  return (
    <header className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero-bg"></div>
      <div className="hero-inner">
        <span className="hero-kicker">
          <span className="dot"></span>
          INSURANCE &amp; REINSURANCE BROKERAGE
        </span>
        <h1 className="hero-h1">
          손해보험은 반드시<br/>
          <em>비교하고 가입</em>해야 합니다.
        </h1>
        <p className="hero-sub">
          국내외 보험·재보험 시장 비교견적, 리스크 분석, 사고처리까지
          — 지엘보험중개가 전문가의 시각으로 기업의 자산을 지키는
          최적의 보험 프로그램을 설계합니다.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            견적 문의하기 {Icon.arrowRight}
          </a>
          <a href="#services" className="btn btn-ghost">
            서비스 살펴보기
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── WHY US ─────────────────────────────────────────────────────
function WhyUs() {
  const items = [
    {
      kr: "전문가의 도움",
      en: "Get help from a PROFESSIONAL",
      body: "20여 년 손해보험·재보험 실무 경험을 가진 전문가가 직접 위험분석과 상품설계를 수행합니다.",
      sub: "for the better analysis of your risk/portfolios.",
    },
    {
      kr: "전세계 비교견적",
      en: "COMPARE prices and quality",
      body: "국내 보험사 전 영역은 물론 런던 마켓을 포함한 22개국 재보험사 네트워크에서 최적 조건을 견적합니다.",
      sub: "for the better protection AROUND THE WORLD.",
    },
    {
      kr: "추가비용 전무",
      en: "NO EXTRA TIME AND MONEY",
      body: "별도의 중개 수수료를 청구하지 않으며, 의뢰 즉시 견적이 전달되어 시간과 비용 부담이 없습니다.",
      sub: "as we do not charge any fee for a better term.",
    },
  ];
  return (
    <section data-screen-label="02 Why Us">
      <div className="container">
        <div className="section-head">
          <div className="section-tag">Why GL</div>
          <h2 className="section-h2">왜 ‘GL’을 선택해야 하는가</h2>
          <p className="section-lede">
            보험은 가격이 아닌 ‘보장’입니다. 정확한 리스크 진단과 비교를 거치지 않은 가입은,
            정작 필요할 때 공백을 만듭니다.
          </p>
        </div>
        <div className="why-grid">
          {items.map((it, i) => (
            <div className="why-card" key={i}>
              <div className="why-num">REASON 0{i+1}</div>
              <h3>{it.kr}</h3>
              <p>{it.body}</p>
              <div className="en">— {it.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ───────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" data-screen-label="03 Services">
      <div className="container">
        <div className="section-head">
          <div className="section-tag">Our Services</div>
          <h2 className="section-h2">보험중개의 모든 영역을<br/>한 곳에서.</h2>
          <p className="section-lede">
            원수보험과 재보험을 아우르는 풀스택 중개와, 가입 이전 단계의
            리스크 컨설팅까지 — 세 가지 핵심 서비스로 기업의 보험을 정렬합니다.
          </p>
        </div>
        <div className="services-grid">
          <div className="svc-card">
            <div className="svc-icon">{Icon.shield}</div>
            <div className="svc-en">Insurance Broking</div>
            <h3>보험 중개</h3>
            <p>
              보험계약자와 원보험사 사이에서, 최적의 보장조건과 보험료를
              협상합니다. 청약부터 증권 수령까지 전 과정을 대행합니다.
            </p>
            <ul className="svc-list">
              <li>위험분석 / 보험설계</li>
              <li>국내외 비교견적</li>
              <li>조건 협상 및 청약</li>
              <li>증권 관리 / 갱신</li>
            </ul>
          </div>
          <div className="svc-card">
            <div className="svc-icon">{Icon.globe}</div>
            <div className="svc-en">Reinsurance Broking</div>
            <h3>재보험 중개</h3>
            <p>
              원보험사·공제조합을 대신해 국내외 복수의 재보험사와 협상하여,
              안정적이고 효율적인 재보험 구조를 설계합니다.
            </p>
            <ul className="svc-list">
              <li>계약분석 / 재보험 설계</li>
              <li>복수 재보험사 Placing</li>
              <li>최적조건 협상</li>
              <li>Cover / Debit Note 발급</li>
            </ul>
          </div>
          <div className="svc-card">
            <div className="svc-icon">{Icon.layers}</div>
            <div className="svc-en">Risk Management Consulting</div>
            <h3>리스크 컨설팅</h3>
            <p>
              포괄적인 리스크 관리 자문을 통해, 보험 가입 이전 단계에서
              손실예방·안전관리·청구처리 역량을 끌어올립니다.
            </p>
            <ul className="svc-list">
              <li>리스크 측정 / 분석</li>
              <li>손실예방 (Loss Prevention)</li>
              <li>산업안전 / 범죄예방</li>
              <li>보험사고 처리(Claim Control)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCTS ───────────────────────────────────────────────────
const PRODUCTS = {
  basic: {
    label: "기업공통",
    en: "Basic Project",
    items: [
      ["Packages", "패키지"],
      ["Property All Risks", "재산종합"],
      ["Machinery Breakdown", "기관기계"],
      ["Liabilities", "배상책임"],
      ["Business Interruption", "휴업"],
    ],
  },
  transport: {
    label: "운수사업",
    en: "Transportation",
    items: [
      ["Commercial Auto", "자동차"],
      ["Marine Hull", "선박"],
      ["Cargo / STPI", "적하"],
      ["Transit", "운송"],
      ["Airline / General Aviation", "항공"],
      ["Satellite", "위성"],
      ["Kidnap & Ransom", "납치"],
      ["Travel", "여행"],
      ["P&I", "선주책임"],
      ["Shipbuilding", "조선"],
    ],
  },
  special: {
    label: "전문사업",
    en: "Specialty",
    items: [
      ["Construction", "건설공사"],
      ["WC / EL", "근재"],
      ["Exhibition / Museum", "박물관"],
      ["Crop", "농작물"],
      ["Credit", "신용"],
    ],
  },
};

function Products() {
  const [tab, setTab] = useState("basic");
  const cur = PRODUCTS[tab];
  return (
    <section id="products" style={{background: "var(--st-bg-1)"}} data-screen-label="04 Products">
      <div className="container">
        <div className="section-head">
          <div className="section-tag">(Re)Insurance Products</div>
          <h2 className="section-h2">모든 산업, 모든 리스크.</h2>
          <p className="section-lede">
            일반기업의 공통 보장부터, 운수·전문 산업에 특화된 보험까지 —
            22개 라인업을 통해 어떤 비즈니스라도 빈틈없이 보장합니다.
          </p>
        </div>

        <div className="prod-tabs">
          {Object.entries(PRODUCTS).map(([k, v]) => (
            <button
              key={k}
              className={"prod-tab" + (tab === k ? " active" : "")}
              onClick={() => setTab(k)}
            >
              {v.label}<span className="en">{v.en}</span>
            </button>
          ))}
        </div>

        <div className="prod-grid">
          {cur.items.map(([en, kr], i) => (
            <div className="prod-item" key={en}>
              <span className="prod-num">{String(i+1).padStart(2,"0")}</span>
              <h4>{kr}</h4>
              <div className="en">{en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ────────────────────────────────────────────────────
const PROCESS = {
  ins: {
    label: "원보험계약",
    en: "Insurance",
    steps: [
      { label: "STEP 01", title: "위험분석 / 보험설계", bullets: ["보험계약자와 협의", "Risk Analysis", "Insurance Programming"] },
      { label: "STEP 02", title: "보험 청약", bullets: ["최적의 상품조건 선택", "Application"] },
      { label: "STEP 03", title: "조건 협상", bullets: ["국내외 비교견적", "Term Negotiations"] },
      { label: "STEP 04", title: "보험계약 체결", bullets: ["확정청약 / 보험료 납부", "Contract & Premium"] },
    ],
  },
  re: {
    label: "재보험계약",
    en: "Reinsurance",
    steps: [
      { label: "STEP 01", title: "계약분석 / 재보험설계", bullets: ["원보험사와 협의", "Reinsurance Programming"] },
      { label: "STEP 02", title: "재보험 청약", bullets: ["복수 재보험사 Placing", "조건협의"] },
      { label: "STEP 03", title: "조건 협상", bullets: ["최적조건 협상", "Term Negotiations"] },
      { label: "STEP 04", title: "재보험 확정 / 인수증 발급", bullets: ["Cover / Debit Note", "Closing Instruction"] },
    ],
  },
};

function Process() {
  const [tab, setTab] = useState("ins");
  const cur = PROCESS[tab];
  return (
    <section id="process" data-screen-label="05 Process">
      <div className="container">
        <div className="section-head">
          <div className="section-tag">Intermediary Process</div>
          <h2 className="section-h2">4단계로 정리된<br/>중개 프로세스.</h2>
          <p className="section-lede">
            원보험과 재보험, 어느 경로든 동일하게 ‘분석 → 청약 → 협상 → 체결’의 네 단계로 진행됩니다.
            각 단계에서 보험계약자의 결정권을 보장하는 게 GL의 원칙입니다.
          </p>
        </div>

        <div className="process-toggle">
          {Object.entries(PROCESS).map(([k, v]) => (
            <button key={k} className={tab === k ? "active" : ""} onClick={() => setTab(k)}>
              <span className="label-kr">{v.label}</span>
              <span className="label-en">{v.en}</span>
            </button>
          ))}
        </div>

        <div className="process-grid">
          {cur.steps.map((s, i) => (
            <div className="process-step" key={i}>
              <div className="pstep-num">0{i+1}</div>
              <div className="pstep-label">{s.label}</div>
              <h4>{s.title}</h4>
              <ul>{s.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA STRIP ──────────────────────────────────────────────────
function CtaStrip() {
  return (
    <section style={{paddingTop: 0}}>
      <div className="container">
        <div className="cta-strip">
          <div>
            <h2>지금 우리 회사의 보험,<br/>제대로 설계되어 있을까요?</h2>
            <p>전문가의 무료 진단으로 5분 안에 확인하세요. 별도의 중개 수수료는 없습니다.</p>
          </div>
          <div style={{display:"flex", gap: 12, flexWrap:"wrap"}}>
            <a href="#contact" className="btn btn-primary">무료 진단 신청 {Icon.arrowRight}</a>
            <a href="#board" className="btn btn-ghost">최근 공시 보기</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" data-screen-label="07 Contact">
      <div className="footer-inner">
        <div className="footer-brand">
          <h4>지엘보험중개㈜</h4>
          <div className="en">GL INSURANCE, INC.</div>
          <p style={{marginTop:14, color:"var(--st-fg-3)", maxWidth: 320}}>
            손해보험은 반드시 비교하고, 가입해야 합니다.
          </p>
        </div>
        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="#services">보험 중개</a></li>
            <li><a href="#services">재보험 중개</a></li>
            <li><a href="#services">리스크 컨설팅</a></li>
            <li><a href="#products">상품 라인업</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#board">공지사항</a></li>
            <li><a href="#board">리서치/보고서</a></li>
            <li><a href="#process">중개 프로세스</a></li>
            <li><a href="#contact">오시는 길</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <div className="contact-line">
            <strong>T.</strong> 02-722-7431<br/>
            <strong>F.</strong> 02-722-7432<br/>
            <strong>E.</strong> afocus@glinsurance.kr
          </div>
          <div className="contact-line" style={{marginTop:14}}>
            서울특별시 서초구<br/>
            강남대로 305<br/>
            서초현대렉시온 424호
          </div>
        </div>
      </div>

      <div className="footer-info">
        <div className="footer-info-row">
          <span><em>상호명</em> 지엘보험중개㈜</span>
          <span><em>대표자</em> 김수미</span>
          <span><em>사업자등록번호</em> 216-81-41847</span>
          <span><em>보험중개사등록번호</em> 제2018011601호</span>
        </div>
        <div className="footer-info-row">
          <span><em>주소</em> 서울특별시 서초구 강남대로 305 서초현대렉시온 424호</span>
        </div>
        <div className="footer-info-row">
          <span><em>TEL</em> 02-722-7431</span>
          <span><em>FAX</em> 02-722-7432</span>
          <span><em>E-MAIL</em> afocus@glinsurance.kr</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div>Copyright © 2026 GL Insurance, Inc. All rights reserved.</div>
        <div style={{display:"flex", gap: 20}}>
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">고객권익보호</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, WhyUs, Services, Products, Process, CtaStrip, Footer, Icon });
