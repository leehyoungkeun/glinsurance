// App root — composition + Tweaks
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "teal",
  "compact": false
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  teal:   { c500: "#14B89A", c400: "#2DD4B0", c300: "#5EEDC9", c700: "#0E8A73", textOn: "#06140F" },
  indigo: { c500: "#5B6BFF", c400: "#7B86FF", c300: "#A0AAFF", c700: "#3949C7", textOn: "#FFFFFF" },
  gold:   { c500: "#F5A524", c400: "#FFC774", c300: "#FFE7B8", c700: "#A66200", textOn: "#1B1408" },
};

function hexA(hex, a) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0,2),16), g = parseInt(m.slice(2,4),16), b = parseInt(m.slice(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

function applyAccent(key) {
  const a = ACCENT_PRESETS[key] || ACCENT_PRESETS.teal;
  const r = document.documentElement.style;
  r.setProperty("--brand-500", a.c500);
  r.setProperty("--brand-400", a.c400);
  r.setProperty("--brand-300", a.c300);
  r.setProperty("--brand-700", a.c700);
  r.setProperty("--brand-glow", `0 0 60px ${hexA(a.c500, 0.28)}`);
  r.setProperty("--brand-text-on", a.textOn);
  // Inline override for the few places that hard-code dark text on brand chips
  document.querySelectorAll(".btn-primary, .nav-cta, .prod-tab.active, .board-filter.active, .board-pagination button.active")
    .forEach((el) => { el.style.color = a.textOn; });
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => { applyAccent(t.accent); }, [t.accent]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--section-py",
      t.compact ? "clamp(56px, 7vw, 96px)" : "clamp(80px, 10vw, 140px)"
    );
  }, [t.compact]);

  return (
    <>
      <Nav/>
      <Hero/>
      <WhyUs/>
      <Services/>
      <Products/>
      <Process/>
      <CtaStrip/>
      <Board/>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="액센트 컬러">
          <TweakRadio
            label="Accent"
            value={t.accent}
            options={[
              { value: "teal", label: "Teal" },
              { value: "indigo", label: "Indigo" },
              { value: "gold", label: "Gold" },
            ]}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>
        <TweakSection label="레이아웃">
          <TweakToggle label="컴팩트 간격" value={t.compact} onChange={(v) => setTweak("compact", v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
