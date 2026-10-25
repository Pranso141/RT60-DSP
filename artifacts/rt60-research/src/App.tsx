import { useState } from 'react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowDownRight, ArrowLeft, ArrowRight, AudioLines, ChevronDown, CircleHelp, CircuitBoard, Clock3, Cpu, FileText, Menu, MoveUpRight, Waves, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const navItems = [
  { href: '/', label: 'Overview', number: '01' },
  { href: '/method', label: 'Method', number: '02' },
  { href: '/research', label: 'Research', number: '03' },
  { href: '/contributions', label: 'Contributions', number: '04' },
];

function Shell({ children }: { children: ReactNode }) {
  const [path] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="paper-grain min-h-[100dvh]">
      <header className="site-header">
        <Link href="/" className="brand" aria-label="RT60 project overview">
          <span className="brand-mark"><AudioLines size={19} strokeWidth={1.7} /></span>
          <span className="brand-name">ROOM / T<span>60</span></span>
        </Link>
        <div className="header-context"><span className="live-dot" /> DSP RESEARCH <span className="context-divider">/</span> B2</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`top-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`nav-link ${path === item.href ? 'nav-active' : ''}`}>
              <span>{item.label}</span><span className="nav-num">{item.number}</span>
            </Link>
          ))}
        </nav>
        <div className="header-meta">SPIT · MUMBAI <MoveUpRight size={13} /></div>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  return <footer className="footer"><Link href="/" className="footer-brand">ROOM / T60</Link><span>Digital Signal Processing · Batch B2</span><span className="font-mono">A MEASUREMENT, MADE LEGIBLE.</span></footer>;
}

function Eyebrow({ children }: { children: ReactNode }) { return <div className="eyebrow"><span className="eyebrow-line" />{children}</div>; }

function PageHeading({ index, label, title, intro }: { index: string; label: string; title: ReactNode; intro: string }) {
  return <section className="page-heading reveal"><Eyebrow>{index} / {label}</Eyebrow><h1 className="display-title">{title}</h1><p className="page-intro">{intro}</p></section>;
}

function DecayGraphic({ compact = false }: { compact?: boolean }) {
  const curve = 'M38 37 C64 40 72 49 88 57 C109 68 127 70 145 78 C167 88 186 91 207 99 C229 109 245 116 270 122 C296 131 314 134 341 143';
  return <div className={`decay-visual ${compact ? 'decay-compact' : ''}`} role="img" aria-label="Illustrative energy decay curve showing sound level dropping over time. Not experimental project data.">
    <div className="graph-topline"><span>ENERGY DECAY / SCHEMATIC</span><span>ILLUSTRATIVE ONLY</span></div>
    <svg viewBox="0 0 370 190" className="decay-svg" aria-hidden="true">
      <g className="grid-lines"><path d="M38 28H350M38 65H350M38 102H350M38 139H350M38 28V150M116 28V150M194 28V150M272 28V150M350 28V150" /></g>
      <text x="4" y="33">0 dB</text><text x="3" y="70">−20</text><text x="3" y="107">−40</text><text x="3" y="144">−60</text>
      <text x="38" y="168">0</text><text x="330" y="168">TIME →</text>
      <path className="fit-zone" d="M116 65H194V102H116z" />
      <path className="fit-line" d="M116 65L194 102" />
      <path className="decay-line" d={curve} />
      <circle className="decay-dot" cx="38" cy="37" r="3" />
      <text x="120" y="60" className="graph-note">T20 fit</text>
      <text x="211" y="42" className="curve-label">Schroeder EDC</text>
    </svg>
    <div className="graph-caption"><span>Decay slope → extrapolated RT60</span><span className="font-mono">T = −60 / a</span></div>
  </div>;
}

function StatusCallout() {
  return <div className="status-callout">
    <span className="status-icon"><CircleHelp size={17} /></span>
    <div><strong>Read the status carefully</strong><p>The report first frames its work as proposed objectives and hypotheses, then later includes completed Python simulation tables and a conclusion that describes findings. Values shown here are <b>reported simulation outputs</b>—not live-room measurements, independent validation, or claims we have verified.</p></div>
  </div>;
}

function Overview() {
  return <Shell>
    <section className="hero">
      <div className="hero-copy reveal">
        <Eyebrow>ROOM ACOUSTICS / EMBEDDED DSP</Eyebrow>
        <h1 className="hero-title">A room leaves<br />a <em>trace.</em></h1>
        <p className="hero-lede">Can a small embedded instrument read how long sound stays in a room—and show exactly where numerical precision shapes that answer?</p>
        <div className="hero-actions"><Link href="/method" className="button-primary">Follow the signal <ArrowRight size={16} /></Link><Link href="/research" className="text-link">Explore the research <ArrowDownRight size={16} /></Link></div>
        <div className="hero-footnote"><span className="tiny-rule" /> PROPOSED INSTRUMENT · SIMULATION RESULTS REPORTED</div>
      </div>
      <div className="hero-art reveal reveal-delay">
        <div className="hero-art-orbit orbit-one" /><div className="hero-art-orbit orbit-two" />
        <div className="hero-center"><span>ROOM</span><AudioLines size={42} strokeWidth={1} /><span>RESPONSE</span></div>
        <div className="hero-tag tag-top"><span className="tag-dot" /> EXCITATION <b>ESS</b></div>
        <div className="hero-tag tag-bottom"><span className="tag-dot rust" /> MEASUREMENT <b>RT60</b></div>
        <div className="hero-coordinate">19°07′ N<br />72°52′ E</div>
        <span className="hero-cross cross-a">+</span><span className="hero-cross cross-b">+</span>
      </div>
      <div className="hero-index"><span>01</span><span>THE QUESTION</span><span>↓</span></div>
    </section>

    <section className="intro-band">
      <div className="section-index"><span>01—A</span><span>WHAT IS RT60?</span></div>
      <div className="intro-body"><h2 className="display-subtitle">The time it takes for sound energy to fade by <em>60 decibels.</em></h2><p>That single number helps describe speech clarity in classrooms and offices. Our project follows its path from a frequency sweep, through a measured impulse response, to a standards-aware decay estimate—and asks whether finite memory and arithmetic can bend the result.</p><Link href="/method" className="inline-arrow">See how the measurement is made <ArrowRight size={15} /></Link></div>
      <div className="intro-side"><span className="side-mark">RT</span><span className="font-mono">ROOM RESPONSE<br />→ TIME DOMAIN</span></div>
    </section>

    <section className="overview-process">
      <div className="section-head"><div><Eyebrow>FROM EXCITATION TO ESTIMATE</Eyebrow><h2 className="display-subtitle">A measurement chain<br />you can inspect.</h2></div><Link href="/method" className="round-arrow" aria-label="Explore measurement method"><ArrowRight size={19} /></Link></div>
      <div className="mini-flow">
        {[
          ['01', 'Excite', 'Exponential sine sweep', '20 Hz → 20 kHz'],
          ['02', 'Recover', 'Overlap-add deconvolution', 'Finite block length'],
          ['03', 'Separate', 'Octave-band filtering', '4th-order Butterworth'],
          ['04', 'Estimate', 'Schroeder + linear fit', 'T20 / T30 → RT60'],
        ].map(([n, title, desc, meta]) => <Link key={n} href="/method" className="flow-step"><span className="flow-number">{n}</span><span className="flow-step-title">{title}</span><span className="flow-desc">{desc}</span><span className="flow-meta">{meta}</span><ArrowRight className="flow-arrow" size={15} /></Link>)}
      </div>
    </section>

    <section className="simulation-feature">
      <div className="simulation-copy"><Eyebrow>REPORTED SIMULATION / 01</Eyebrow><h2 className="display-subtitle">Precision is part<br />of the instrument.</h2><p>The report’s simulated 1.2 s reference case compares arithmetic word lengths. At 8-bit fixed point, it reports 5.55% error; at 12-bit, 0.09%. These are report values, not room measurements.</p><Link href="/research#reported-simulations" className="inline-arrow">Inspect reported results <ArrowRight size={15} /></Link></div>
      <div className="precision-panel">
        <div className="precision-panel-head"><span>WORD LENGTH / SIMULATION</span><span>1 kHz · T30</span></div>
        <div className="precision-row"><span className="precision-bits">08 bit</span><div className="precision-bar"><i style={{ width: '90%' }} /></div><strong>5.55%</strong><span className="fail-label">FAIL*</span></div>
        <div className="precision-row"><span className="precision-bits">12 bit</span><div className="precision-bar"><i style={{ width: '20%' }} /></div><strong>0.09%</strong><span className="pass-label">PASS*</span></div>
        <div className="precision-row"><span className="precision-bits">16 bit</span><div className="precision-bar"><i style={{ width: '3%' }} /></div><strong>~0.00%</strong><span className="pass-label">PASS*</span></div>
        <div className="precision-note">*Report applies a 5% criterion. Simulation-based values; not independently validated.</div>
      </div>
    </section>

    <section className="curve-section">
      <div className="curve-text"><Eyebrow>THE MEASURED QUANTITY</Eyebrow><h2 className="display-subtitle">Follow the tail,<br /><em>not the peak.</em></h2><p>The room’s impulse response is filtered into frequency bands. A backward integration turns each band’s energy into a decay curve; a linear regression estimates its slope over a selected interval.</p><div className="equation-chip">EDC(t) = ∫<sub>t</sub><sup>∞</sup> |h(τ)|² dτ</div></div>
      <DecayGraphic />
    </section>

    <section className="home-questions">
      <Eyebrow>THE WORK AHEAD</Eyebrow><h2 className="display-subtitle">Three variables. One honest question.</h2>
      <div className="question-list"><div><span>01</span><p>How short can the overlap-add block get before the recovered tail changes the estimate?</p><ArrowRight size={16} /></div><div><span>02</span><p>How much arithmetic precision does the decay actually need?</p><ArrowRight size={16} /></div><div><span>03</span><p>When does a filter’s own decay start to look like the room?</p><ArrowRight size={16} /></div></div>
      <div className="home-cta"><p>See the project’s aims, hypotheses, and reported simulations side by side.</p><Link href="/research" className="button-outline">Read the research <ArrowRight size={16} /></Link></div>
    </section>
  </Shell>;
}

const methodSteps = [
  { title: 'Configure', label: '01 · SET PARAMETERS', icon: CircuitBoard, detail: 'Set the sweep span and duration, sample rate, overlap-add block length, and numeric representation. In the report pseudocode: 20 Hz–20 kHz, 48 kHz sampling, and configurable block length.', spec: 'f₁ = 20 Hz  ·  f₂ = 20 kHz  ·  fₛ = 48 kHz', equation: 'R = ln(f₂ / f₁)' },
  { title: 'Excite & record', label: '02 · CAPTURE', icon: AudioLines, detail: 'Generate an exponential sine sweep whose instantaneous frequency rises logarithmically. A loudspeaker excites the room; a MEMS microphone and ADC capture the response y[n].', spec: 'ESS · logarithmic frequency trajectory', equation: 'x(t) = sin(2π f₁ T / R · (eᴿᵗ⁄ᵀ − 1))' },
  { title: 'Recover the impulse', label: '03 · DECONVOLVE', icon: Waves, detail: 'Convolve the recorded response with a time-reversed, amplitude-shaped inverse sweep. Fast convolution is processed in blocks with overlap-add: each block’s output is added into the shared output buffer.', spec: 'OLA · block length is a study variable', equation: 'h[n] = IFFT( FFT(yᵢ) · FFT(xᵢₙᵥ) )' },
  { title: 'Split into bands', label: '04 · FILTER BANK', icon: AudioLines, detail: 'Pass the recovered impulse response through octave or third-octave Butterworth IIR filters. The report pseudocode specifies a 4th-order Butterworth SOS filter bank; decimation between bands is proposed to reduce work.', spec: 'Butterworth · order 4 · octave / ⅓-octave', equation: 'hₖ[n] = SOSFilterₖ(h[n])' },
  { title: 'Integrate & fit', label: '05 · ESTIMATE RT', icon: Clock3, detail: 'Square each band response and reverse-cumulate its energy to form a Schroeder energy decay curve. Convert to normalized dB, then use linear regression over a defined window; extrapolate the fitted slope to 60 dB.', spec: 'T20: −5 to −25 dB  ·  T30: −5 to −35 dB', equation: 'T₆₀ = −60 / a     (a in dB/s)' },
];

function Method() {
  const [active, setActive] = useState(0);
  const StepIcon = methodSteps[active].icon;
  return <Shell><div className="page-wrap">
    <PageHeading index="02" label="METHOD" title={<>From a sweep<br />to a <em>decay time.</em></>} intro="A transparent signal path: excite the room, recover its impulse response, trace the energy decay, and estimate the slope. Each stage is a place where implementation choices matter." />
    <section className="method-interactive">
      <div className="method-sidebar"><Eyebrow>PIPELINE / SELECT A STAGE</Eyebrow>{methodSteps.map((s, i) => <button key={s.title} onClick={() => setActive(i)} className={`method-tab ${i === active ? 'method-tab-active' : ''}`} aria-pressed={i === active}><span>{String(i + 1).padStart(2, '0')}</span><b>{s.title}</b><ArrowRight size={14} /></button>)}
        <div className="pipeline-path"><div className="pipeline-node">ROOM</div><div className="pipeline-wire" /><div className="pipeline-node pipeline-node-active">DSP</div><div className="pipeline-wire" /><div className="pipeline-node">RT60</div></div>
      </div>
      <div className="method-detail" aria-live="polite"><div className="method-detail-top"><span>{methodSteps[active].label}</span><StepIcon size={20} /></div><h2 className="display-subtitle">{methodSteps[active].title}</h2><p>{methodSteps[active].detail}</p><div className="method-spec">{methodSteps[active].spec}</div><div className="method-equation">{methodSteps[active].equation}</div><div className="method-navigation"><button onClick={() => setActive((active + methodSteps.length - 1) % methodSteps.length)} aria-label="Previous stage"><ArrowLeft size={16} /></button><span>{String(active + 1).padStart(2, '0')} <i>/</i> 05</span><button onClick={() => setActive((active + 1) % methodSteps.length)} aria-label="Next stage"><ArrowRight size={16} /></button></div></div>
    </section>
    <section className="method-decay"><div><Eyebrow>READING THE DECAY</Eyebrow><h2 className="display-subtitle">A line through<br />a logarithmic fall.</h2><p>After band filtering, the Schroeder backward integral accumulates remaining energy from the end of the impulse response toward its start. Normalizing to 0 dB gives an energy decay curve (EDC); the fit range defines which portion contributes to the estimate.</p><div className="fit-range-chips"><span>T20 <b>−5 → −25 dB</b></span><span>T30 <b>−5 → −35 dB</b></span></div><p className="small-note">The report describes R² as a fit-quality indicator and lists R² &gt; 0.99 above 125 Hz as an evaluation target. This is not a general ISO pass/fail tolerance.</p></div><DecayGraphic /></section>
    <section className="method-precision"><div className="precision-icon"><Cpu size={24} /></div><div><Eyebrow>THE EMBEDDED CONSTRAINT</Eyebrow><h2 className="display-subtitle">The tail is quiet.<br />The arithmetic isn’t.</h2><p>The report notes impulse responses can span close to 100 dB. At small word lengths, the peak risks overflow while the late tail can disappear into quantization noise. Overlap-add length, scaling strategy, and precision are therefore measurement parameters—not merely implementation details.</p></div><div className="precision-aside"><span className="font-mono">POINTS OF SENSITIVITY</span><b>BLOCK LENGTH</b><b>WORD LENGTH</b><b>FILTER DECAY</b></div></section>
    <div className="next-page"><span>CONTINUE READING</span><Link href="/research">Research context <ArrowRight size={16} /></Link></div>
  </div></Shell>;
}

const literature = [
  { n: '01', title: 'Speech Dereverberation with Frequency Domain AR Modeling', authors: 'Purushothaman, Dutta, Kumar & Ganapathy', year: '2024', venue: 'IEEE/ACM TASLP', method: 'Frequency-domain autoregressive modelling of sub-band envelopes.', relevance: 'Models room decay explicitly for suppression; anchor paper from IISc, but estimates decay to remove it rather than report RT.' },
  { n: '02', title: 'Comprehensive Noise Analysis for Acousto-Optic Measurement', authors: 'Ishikawa, Shiraki & Moriya', year: '2024', venue: 'IEEE TIM', method: 'Source-by-source measurement noise-budget decomposition.', relevance: 'Methodological template for instrumentation error budgets; the reviewed budget does not include arithmetic precision.' },
  { n: '03', title: 'Full-Acoustic Assessment of Digital MEMS Microphones', authors: 'Campo-Valera, Saba & Corallo', year: '2026', venue: 'IEEE TIM', method: 'Full acoustic characterization against reference instruments.', relevance: 'Assesses MEMS microphones as candidates for measurement-grade instrumentation.' },
  { n: '04', title: '3D Interpolation in Wave-Based Acoustic Simulation', authors: 'Bilbao', year: '2022', venue: 'IEEE SPL', method: 'Interpolation methods in wave-based room simulation.', relevance: 'Bounds the fidelity of simulated impulse responses used in algorithm validation.' },
  { n: '05', title: 'Microphone Channel Frequency Response Calibration', authors: 'Zhao, Wang & Xu', year: '2023', venue: 'IEEE TIM', method: 'Circular shifting with spatio-temporal prediction.', relevance: 'Channel response calibration without controlled excitation.' },
  { n: '06', title: 'Frequency Response Analytical Calibration via Spectral Flatness', authors: 'Hu, Chen & Yin', year: '2021', venue: 'IEEE TIM', method: 'Analytical calibration without a reference source.', relevance: 'In-service verification for field instruments; closest in the survey to traceability.' },
  { n: '07', title: 'Directional Sound-Capture System on FPGA', authors: 'Xiang, Liu & Zhou', year: '2024', venue: 'IEEE TIM', method: 'Directional capture implemented on programmable logic hardware.', relevance: 'Demonstrates embedded acoustic-instrumentation feasibility; reports throughput rather than parameter conformity.' },
  { n: '08', title: 'Room Acoustic Parameter Estimation from RIRs', authors: 'Gotz, Tuna & Moonen', year: '2023', venue: 'IEEE Signal Processing Letters', method: 'Direct parameter estimation from measured impulse responses.', relevance: 'A parametric RT60 alternative that does not require full Schroeder integration.' },
  { n: '09', title: 'Deep Learning for Blind RT60 Estimation', authors: 'Xiong, Xu et al.', year: '2024', venue: 'IEEE/ACM TASLP', method: 'CNN regression from reverberant speech.', relevance: 'Avoids a sweep but is blind estimation rather than controlled measurement.' },
  { n: '10', title: 'Low-Cost Acoustic Measurement Using Smartphones', authors: 'Carre & Moreau', year: '2022', venue: 'Applied Acoustics', method: 'Smartphone-based RT60 measurement with calibration.', relevance: 'Consumer hardware and calibration methodology relevant to accessible acoustics.' },
];

const objectives = [
  'Determine the shortest overlap-add block length that recovers a sufficient impulse-response tail for estimates within the ISO 3382 repeatability limit, as a function of actual room reverberation time.',
  'Determine minimum arithmetic precision for deconvolution and backward integration, separating fixed-point from single-precision floating-point behaviour.',
  'Quantify octave-band filter-bank self-decay and specify filter order and realization at which its contribution becomes negligible for the shortest rooms of interest.',
  'Implement the complete measurement pipeline in Python and demonstrate it on synthetic and measured impulse responses.',
  'Build an uncertainty budget separating excitation and transducer contributions from arithmetic, with validation against public impulse-response databases of known RT.',
];
const hypotheses = [
  'A room-dependent block-length threshold exists below which tail truncation biases the decay slope beyond the ISO 3382 repeatability limit.',
  'Single-precision floating point is sufficient; fixed-point needs block-floating-point scaling to meet the same limit.',
  'The octave filter bank’s own decay creates a measurable, correctable bias for the shortest rooms; the proposed correction is a fixed offset per band.',
];

function Research() {
  return <Shell><div className="page-wrap">
    <PageHeading index="03" label="RESEARCH" title={<>Where the number<br />meets the <em>machine.</em></>} intro="A research question at the seam between room acoustics and embedded arithmetic. The report’s opening frames objectives and hypotheses; later sections report Python simulation results. Both stages matter—and they are not the same evidence." />
    <StatusCallout />
    <section className="research-gap"><div className="research-section-label"><Eyebrow>THE GAP / 03 ABSENCES</Eyebrow><h2 className="display-subtitle">What the literature<br />doesn’t measure.</h2></div><div className="gap-list">
      <article><span>01</span><div><h3>Block length & word length</h3><p>The survey identifies no paper that varies these digital implementation parameters while reporting their effect on a measured acoustic quantity.</p></div></article>
      <article><span>02</span><div><h3>Standards-aware evaluation</h3><p>Reviewed work uses speech-centric or instrumentation-centric metrics, but the report finds no evaluation against a published room-acoustics repeatability limit as its pass/fail condition.</p></div></article>
      <article><span>03</span><div><h3>Arithmetic in the error budget</h3><p>Physical contributions such as transducer and excitation appear in noise budgets; the digital arithmetic contribution is absent from the surveyed budgets.</p></div></article>
    </div></section>
    <section className="objectives-section"><div className="objectives-head"><Eyebrow>PROJECT OBJECTIVES / AIMS</Eyebrow><h2 className="display-subtitle">Five things the work set out to establish.</h2><p>These are the report’s stated objectives. Later simulation results address some of them; they should not be read as proof of physical-room performance.</p></div><div className="objective-list">{objectives.map((o, i) => <article key={o}><span className="objective-number">0{i + 1}</span><p>{o}</p><span className="objective-mark">↗</span></article>)}</div></section>
    <section className="hypotheses-section"><div className="hypotheses-intro"><Eyebrow>HYPOTHESES / TO BE TESTED</Eyebrow><h2 className="display-subtitle">Predictions, not findings.</h2><p>The report’s first-half framing states these as hypotheses. Its later results section reports simulation outcomes; no live-room measurement evidence is presented here.</p></div><div className="hypothesis-cards">{hypotheses.map((h, i) => <article key={h}><span>H{i + 1}</span><p>{h}</p></article>)}</div></section>
    <section id="reported-simulations" className="reported-section"><div className="reported-head"><div><Eyebrow>RESULTS REPORTED IN THE PDF / SIMULATION</Eyebrow><h2 className="display-subtitle">What the report says<br />its simulations found.</h2></div><div className="reported-label">PYTHON SIMULATION<br />NOT LIVE ROOM DATA</div></div><StatusCallout />
      <div className="reported-grid"><article className="reported-card reported-wide"><div className="reported-card-top"><span>01 / SYNTHETIC REFERENCE</span><span>1.2 s RT60</span></div><div className="reported-big">1.213 <small>s</small></div><p>The report narrative cites T30 = 1.213 s at 1 kHz against a 1.2 s reference and states a maximum error of 1.08%. However, its frequency-band table lists T30 = 1.126 s at 63 Hz, approximately 6.2% below that reference. These report statements conflict; the discrepancy needs clarification. Both values are simulation-reported, not live-room measurements.</p><div className="band-chips">{['63', '125', '250', '500', '1k', '2k', '4k', '8k'].map(b => <span key={b}>{b}<small>Hz</small></span>)}</div></article>
      <article className="reported-card"><div className="reported-card-top"><span>02 / BLOCK LENGTH</span><span>FLOATING POINT</span></div><div className="reported-big">0.00<small>%</small></div><p>All tested block lengths, 256–16,384 samples, are reported at 0.00% error for the 1 kHz T30 simulation.</p><div className="memory-range"><span>256 samples<br /><b>2,048 bytes</b></span><ArrowRight size={16} /><span>16,384 samples<br /><b>131,072 bytes</b></span></div></article>
      <article className="reported-card"><div className="reported-card-top"><span>03 / PRECISION</span><span>REPORTED 5% CRITERION</span></div><div className="precision-result"><span>8 bit</span><b>5.55%</b><i className="fail-label">FAIL</i></div><div className="precision-result"><span>12 bit</span><b>0.09%</b><i className="pass-label">PASS</i></div><div className="precision-result"><span>16 bit+</span><b>~0.00%</b><i className="pass-label">PASS</i></div><p>The report’s 8-bit result exceeds its explicitly stated 5% criterion; 12-bit and above are reported within it.</p></article>
      <article className="reported-card reported-wide"><div className="reported-card-top"><span>04 / MULTI-ROOM SIMULATION</span><span>0.3–3.0 s REFERENCE RT60</span></div><div className="room-results"><span>Small office <b>1.33%</b></span><span>Meeting room <b>1.00%</b></span><span>Classroom <b>1.20%</b></span><span>Lecture hall <b>0.67%</b></span><span>Auditorium <b>1.25%</b></span><span>Cathedral <b>0.43%</b></span></div><p>Maximum reported error: 1.33% (small office). These are synthetic, simulation-based room cases described by the report—not measured real-room results or independent validation.</p></article></div>
      <div className="status-callout results-discrepancy"><span className="status-icon"><CircleHelp size={17} /></span><div><strong>Frequency-band table and narrative do not agree</strong><p>The supplied report’s table gives 63 Hz T30 = 1.126 s for a 1.2 s reference (about 6.2% below it), while its narrative identifies 1.08% at 1 kHz as the maximum band error. If both use the same reference comparison, the 63 Hz difference is above the report’s stated 5% criterion. This is a report-level discrepancy requiring clarification—not a result we resolve by selecting one statement. Values remain simulation-based and unverified.</p></div></div>
      <p className="reported-footnote">Source: results tables and conclusion in the supplied project report. Values are transcribed as reported and have not been independently reproduced. The report’s first-half objectives/hypotheses and later completed-simulation framing are preserved here as a documented status inconsistency.</p>
    </section>
    <section className="literature-section"><div className="literature-heading"><div><Eyebrow>LITERATURE SURVEY / 10 ENTRIES</Eyebrow><h2 className="display-subtitle">The research around<br />the measurement.</h2></div><span className="font-mono">01—10 / COMPLETE SURVEY</span></div><div className="literature-list">{literature.map(p => <details className="paper-entry" key={p.n}><summary><span className="paper-number">{p.n}</span><span className="paper-title">{p.title}</span><span className="paper-meta">{p.year} <i>·</i> {p.venue}</span><ChevronDown className="paper-chevron" size={17} /></summary><div className="paper-details"><div><span>AUTHORS</span><p>{p.authors}</p></div><div><span>METHOD</span><p>{p.method}</p></div><div><span>WHY IT MATTERS HERE</span><p>{p.relevance}</p></div></div></details>)}</div></section>
    <div className="next-page"><span>CONTINUE READING</span><Link href="/contributions">Contributions & team <ArrowRight size={16} /></Link></div>
  </div></Shell>;
}

function Contributions() {
  const contributions = [
    ['01', 'A standards-aware measurement framing', 'Evaluate estimated reverberation time against a stated ISO 3382 repeatability criterion rather than an arbitrary error target. The report explicitly uses a 5% criterion in its reported simulation tables.'],
    ['02', 'A view into the digital error budget', 'Treat overlap-add block length, arithmetic precision, and filter self-decay as factors alongside excitation and transducer contributions.'],
    ['03', 'A modular embedded pipeline', 'Connect sweep generation, deconvolution, frequency-band filtering, Schroeder integration, linear regression, and reporting into an inspectable instrument concept.'],
    ['04', 'Simulation evidence—with boundaries', 'The report’s later section presents Python simulation tables for a synthetic reference and multiple room-like cases. The report also begins by defining aims and hypotheses. The website does not infer real-room performance from those simulations.'],
  ];
  return <Shell><div className="page-wrap">
    <PageHeading index="04" label="CONTRIBUTIONS" title={<>An instrument<br />for <em>looking closer.</em></>} intro="The project’s planned contribution is to make the numerical assumptions in room-acoustics measurement visible. The report also includes simulation-based outcomes; neither should be mistaken for live-room evidence." />
    <StatusCallout />
    <section className="contribution-layout"><div className="contribution-main"><Eyebrow>PLANNED CONTRIBUTIONS</Eyebrow><h2 className="display-subtitle">Make the invisible<br />part of the measurement visible.</h2><div className="contribution-list">{contributions.map(([n, title, copy]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div><aside className="scope-card"><div className="scope-top"><span>PROJECT STATUS</span><FileText size={18} /></div><h3>Two framings<br />in one report.</h3><p>Sections 1–5 introduce the research gap, objectives, proposed solution, and hypotheses. Later sections present implemented Python simulations, result tables, and a conclusion that describes findings.</p><p>This presentation keeps both visible. Simulation results are reported as such; live-room measurements and independent verification are not claimed.</p><div className="scope-divider" /><span className="font-mono">EVIDENCE TYPE</span><b>SIMULATED / REPORT-DERIVED</b></aside></section>
    <section className="team-section"><div className="team-heading"><Eyebrow>THE TEAM / BATCH B2</Eyebrow><h2 className="display-subtitle">Three names.<br />One research project.</h2><p>Students listed on the source report. No roles are assigned here because the report does not specify individual responsibilities.</p></div><div className="team-list">{['Nihira Pulliwar', 'Vishal Rathod', 'Pranav Sapkale'].map((name, i) => <div className="team-member" key={name}><span className="team-index">0{i + 1}</span><span className="team-avatar">{name.split(' ').map(part => part[0]).join('')}</span><span className="team-name">{name}</span><span className="team-note">STUDENT RESEARCHER</span></div>)}</div></section>
    <section className="closing-note"><div className="closing-symbol"><AudioLines size={30} /></div><div><Eyebrow>THE MEASUREMENT QUESTION</Eyebrow><h2 className="display-subtitle">What changes when the room is real?</h2><p>The reported simulations are a starting point, not a substitute for measurement in physical spaces. Independent room measurements, calibrated transducers, and reproducible validation remain important boundaries for interpreting the work.</p></div><Link href="/method" className="button-primary">Revisit the method <ArrowRight size={16} /></Link></section>
    <div className="next-page"><span>BACK TO THE BEGINNING</span><Link href="/">Project overview <ArrowRight size={16} /></Link></div>
  </div></Shell>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Overview} /><Route path="/method" component={Method} /><Route path="/research" component={Research} /><Route path="/contributions" component={Contributions} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) { const [location] = useLocation(); return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>; }
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
