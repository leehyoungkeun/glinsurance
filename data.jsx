// Board data is loaded at runtime from content/board.json
// (editable via Decap CMS at /admin/).
// Category Korean label is derived from catKey.

const CATEGORY_LABELS = {
  notice: "공지사항",
  report: "리서치/보고서",
  policy: "정책·약관",
  disclosure: "경영공시",  // legacy — supported if any old post still uses it
};

const BOARD_CATS = [
  { key: "all",    label: "전체" },
  { key: "notice", label: "공지사항" },
  { key: "report", label: "리서치/보고서" },
  { key: "policy", label: "정책·약관" },
];

// Promise that resolves to the post array.
// Adds the derived `category` (Korean label) and a stable `no` for display.
window.BOARD_POSTS_PROMISE = fetch("content/board.json", { cache: "no-cache" })
  .then((r) => {
    if (!r.ok) throw new Error("board.json " + r.status);
    return r.json();
  })
  .then((d) => {
    const posts = (d.posts || []).map((p) => ({
      ...p,
      category: CATEGORY_LABELS[p.catKey] || "공지사항",
      no: p.pinned ? "공지" : p.id,
    }));
    return posts;
  })
  .catch((err) => {
    console.error("게시판 데이터를 불러오지 못했습니다:", err);
    return [];
  });

window.BOARD_CATS = BOARD_CATS;
