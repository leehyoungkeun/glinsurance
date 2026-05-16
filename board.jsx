// Disclosure board — filter, search, paginate, detail modal.
// Loads posts asynchronously from content/board.json and renders markdown bodies.
const { useState, useMemo, useEffect } = React;

// Render a markdown string to safe HTML using `marked` (loaded via CDN).
function renderMarkdown(md) {
  if (!md) return "";
  if (window.marked && typeof window.marked.parse === "function") {
    return window.marked.parse(md, { breaks: true, gfm: true });
  }
  // Fallback: minimal escape so raw text still renders
  const esc = String(md).replace(/[&<>]/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;" }[c]));
  return "<p>" + esc.replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br/>") + "</p>";
}

function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const perPage = 7;

  // Load posts on mount
  useEffect(() => {
    window.BOARD_POSTS_PROMISE.then((p) => {
      setPosts(p);
      setLoading(false);
    });
  }, []);

  // Filter + search
  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (cat !== "all" && p.catKey !== cat) return false;
      if (q.trim()) {
        const t = q.trim().toLowerCase();
        if (!p.title.toLowerCase().includes(t) && !(p.category || "").includes(q)) return false;
      }
      return true;
    });
  }, [posts, cat, q]);

  // Sort: pinned first, then by date desc
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (b.pinned && !a.pinned) return 1;
      return String(b.date).localeCompare(String(a.date));
    });
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  useEffect(() => { if (page > totalPages) setPage(1); }, [page, totalPages]);
  const pageRows = sorted.slice((page - 1) * perPage, page * perPage);

  const openPost = sorted.find((p) => p.id === openId) || null;
  const openIdx = openPost ? sorted.findIndex((p) => p.id === openId) : -1;
  const prevPost = openIdx > 0 ? sorted[openIdx - 1] : null;
  const nextPost = openIdx >= 0 && openIdx < sorted.length - 1 ? sorted[openIdx + 1] : null;

  // Lock body scroll while modal open + ESC/← → keyboard
  useEffect(() => {
    if (openId == null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "ArrowLeft" && prevPost) setOpenId(prevPost.id);
      if (e.key === "ArrowRight" && nextPost) setOpenId(nextPost.id);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId, prevPost, nextPost]);

  return (
    <section id="board" style={{background: "var(--st-bg-1)"}} data-screen-label="06 Disclosure Board">
      <div className="container">
        <div className="section-head" style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", maxWidth:"none", flexWrap:"wrap", gap:24}}>
          <div style={{maxWidth: 640}}>
            <div className="section-tag">Disclosure & News</div>
            <h2 className="section-h2">공시·소식</h2>
            <p className="section-lede">
              회사의 공지사항, 정책 개정, 그리고 보험·재보험 산업 인사이트 리포트를
              한 곳에서 투명하게 공개합니다.
            </p>
          </div>
          <div className="board-search">
            {Icon.search}
            <input
              type="text"
              placeholder="제목·카테고리로 검색"
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        <div className="board-wrap">
          <div className="board-toolbar">
            <div className="board-filters">
              {window.BOARD_CATS.map((c) => (
                <button
                  key={c.key}
                  className={"board-filter" + (cat === c.key ? " active" : "")}
                  onClick={() => { setCat(c.key); setPage(1); }}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div style={{fontSize: 12, color: "var(--st-fg-4)", fontFamily:"var(--st-font-mono)"}}>
              {loading ? "불러오는 중…" : `총 ${sorted.length}건`}
            </div>
          </div>

          {loading ? (
            <div className="board-empty">게시판 데이터를 불러오는 중입니다…</div>
          ) : pageRows.length === 0 ? (
            <div className="board-empty">검색 결과가 없습니다.</div>
          ) : (
            <table className="board-table">
              <thead>
                <tr>
                  <th className="col-num">No.</th>
                  <th className="col-cat">분류</th>
                  <th className="col-title">제목</th>
                  <th className="col-date">등록일</th>
                  <th className="col-views">조회</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((p) => (
                  <tr key={p.id} onClick={() => setOpenId(p.id)}>
                    <td className="col-num">
                      {p.pinned ? <span style={{color:"var(--brand-400)"}}>{Icon.pin}</span> : p.no}
                    </td>
                    <td className="col-cat">
                      <span className={"board-cat board-cat-" + p.catKey}>{p.category}</span>
                    </td>
                    <td className="col-title">
                      {p.title}
                      {p.isNew && <span className="new-badge">NEW</span>}
                    </td>
                    <td className="col-date">{p.date}</td>
                    <td className="col-views">{(p.views || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {totalPages > 1 && (
            <div className="board-pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>
              {Array.from({length: totalPages}, (_, i) => i + 1).map((n) => (
                <button key={n} className={page === n ? "active" : ""} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>›</button>
            </div>
          )}
        </div>
      </div>

      {openPost && (
        <div className="detail-overlay" onClick={() => setOpenId(null)}>
          <div className="detail" onClick={(e) => e.stopPropagation()}>
            <div className="detail-head">
              <div className="info">
                <span className={"board-cat board-cat-" + openPost.catKey}>{openPost.category}</span>
                <h2>{openPost.title}</h2>
                <div className="detail-meta">
                  <span>{openPost.date}</span>
                  <span>작성자 · {openPost.author}</span>
                  <span>조회 {(openPost.views || 0).toLocaleString()}</span>
                </div>
              </div>
              <button className="detail-close" onClick={() => setOpenId(null)} aria-label="닫기">
                {Icon.x}
              </button>
            </div>
            <div className="detail-body" dangerouslySetInnerHTML={{__html: renderMarkdown(openPost.body)}}/>
            {openPost.attachments && openPost.attachments.length > 0 && (
              <div className="detail-body" style={{paddingTop: 0}}>
                <h3>첨부파일</h3>
                {openPost.attachments.map((a, i) => (
                  <a key={i} className="attachment" href={a.file} download style={{display:"inline-flex", marginRight: 8, marginBottom: 8}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                    {a.name}{a.size ? ` · ${a.size}` : ""}
                  </a>
                ))}
              </div>
            )}
            <div className="detail-foot">
              <div className="detail-nav">
                <button disabled={!prevPost} onClick={() => prevPost && setOpenId(prevPost.id)}>← 이전 글</button>
                <button disabled={!nextPost} onClick={() => nextPost && setOpenId(nextPost.id)}>다음 글 →</button>
              </div>
              <button className="detail-nav" style={{display:"inline-flex"}} onClick={() => setOpenId(null)}>
                <span style={{padding:"8px 14px", fontSize:13, color:"var(--st-fg-3)"}}>목록으로</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

window.Board = Board;
