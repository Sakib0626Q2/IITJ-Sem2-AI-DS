import { useState } from "react";

const PSEUDOCODE = `ALGORITHM: Gradient Descent on f(x) = x²

INPUT:
  x       ← 7          // starting point
  α       ← 0.05       // learning rate
  steps   ← 20         // iterations

DEFINE:
  f(x)    = x²
  ∇f(x)   = 2x         // derivative / gradient

INITIALIZE:
  history ← [x]

──────────────────────────────────────────
LOOP i from 1 to steps:

  slope ← ∇f(x)        // compute gradient at x
  
  x ← x − α × slope   // move opposite to gradient
  
  history.append(x)    // record position
  
END LOOP
──────────────────────────────────────────

OUTPUT:
  history               // all x positions visited
  plot f(x) with steps`;

const nodes = [
  { id: "start",    label: "START",              sub: "",                        shape: "pill",    color: "#22d3ee" },
  { id: "init",     label: "Initialise",          sub: "x=7, α=0.05, steps=20",   shape: "rect",    color: "#818cf8" },
  { id: "define",   label: "Define f & ∇f",       sub: "f(x)=x²  ∇f(x)=2x",      shape: "rect",    color: "#818cf8" },
  { id: "loop",     label: "i < steps?",          sub: "(loop counter check)",    shape: "diamond", color: "#fb923c" },
  { id: "grad",     label: "slope ← ∇f(x)",       sub: "slope = 2 × x",           shape: "rect",    color: "#34d399" },
  { id: "update",   label: "x ← x − α × slope",  sub: "gradient descent step",   shape: "rect",    color: "#34d399" },
  { id: "record",   label: "history.append(x)",   sub: "save position",           shape: "rect",    color: "#34d399" },
  { id: "incr",     label: "i ← i + 1",           sub: "",                        shape: "rect",    color: "#818cf8" },
  { id: "output",   label: "Output history",       sub: "print & prepare plot",    shape: "rect",    color: "#818cf8" },
  { id: "end",      label: "END",                 sub: "",                        shape: "pill",    color: "#22d3ee" },
];

const W = 220, H = 56, DH = 72, GAP = 78;

function Node({ node, y }) {
  const cx = 300;
  if (node.shape === "diamond") {
    const w = W * 0.56, h = DH;
    return (
      <g transform={`translate(${cx}, ${y})`}>
        <polygon
          points={`0,${-h/2} ${w/2},0 0,${h/2} ${-w/2},0`}
          fill={node.color + "22"} stroke={node.color} strokeWidth="1.8"
        />
        <text textAnchor="middle" dominantBaseline="middle" fill={node.color}
              fontSize="13" fontWeight="700" fontFamily="'JetBrains Mono', monospace">{node.label}</text>
        {node.sub && <text y="26" textAnchor="middle" fill="#94a3b8" fontSize="9.5"
              fontFamily="'JetBrains Mono', monospace">{node.sub}</text>}
      </g>
    );
  }
  if (node.shape === "pill") {
    const rx = H / 2;
    return (
      <g transform={`translate(${cx - W/2}, ${y - H/2})`}>
        <rect width={W} height={H} rx={rx} fill={node.color + "33"} stroke={node.color} strokeWidth="1.8"/>
        <text x={W/2} y={H/2} textAnchor="middle" dominantBaseline="middle"
              fill={node.color} fontSize="14" fontWeight="800"
              fontFamily="'JetBrains Mono', monospace">{node.label}</text>
      </g>
    );
  }
  return (
    <g transform={`translate(${cx - W/2}, ${y - H/2})`}>
      <rect width={W} height={H} rx="6" fill={node.color + "18"} stroke={node.color} strokeWidth="1.5"/>
      <text x={W/2} y={node.sub ? H/2 - 8 : H/2} textAnchor="middle" dominantBaseline="middle"
            fill={node.color} fontSize="12.5" fontWeight="700"
            fontFamily="'JetBrains Mono', monospace">{node.label}</text>
      {node.sub && <text x={W/2} y={H/2 + 10} textAnchor="middle"
            fill="#64748b" fontSize="9.5"
            fontFamily="'JetBrains Mono', monospace">{node.sub}</text>}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, label, color = "#475569" }) {
  return (
    <g>
      <defs>
        <marker id={`ah-${x1}-${y1}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={color}/>
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.6"
            markerEnd={`url(#ah-${x1}-${y1})`}/>
      {label && <text x={(x1+x2)/2 + 8} y={(y1+y2)/2} fill={color} fontSize="10"
                      fontFamily="'JetBrains Mono', monospace">{label}</text>}
    </g>
  );
}

export default function GradientFlowchart() {
  const [tab, setTab] = useState("flowchart");

  // y positions for each node
  const ys = [50, 128, 206, 296, 376, 454, 532, 610, 688, 766];
  const cx = 300;

  // "Yes" loop-back arc: from loop node back to grad
  const loopY = ys[3], loopX = cx;
  const exitY = ys[7]; // incr node

  const svgH = 820;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f1a",
      fontFamily: "'JetBrains Mono', monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 16px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap" rel="stylesheet"/>

      <div style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 800, letterSpacing: 2, marginBottom: 6 }}>
        GRADIENT DESCENT
      </div>
      <div style={{ color: "#475569", fontSize: 11, marginBottom: 28, letterSpacing: 3 }}>
        f(x) = x²  ·  logic trace
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 28, border: "1px solid #1e293b", borderRadius: 8, overflow: "hidden" }}>
        {["flowchart", "pseudocode"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "8px 26px", fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
            fontFamily: "inherit", cursor: "pointer", border: "none",
            background: tab === t ? "#818cf8" : "transparent",
            color: tab === t ? "#0a0f1a" : "#64748b",
            textTransform: "uppercase", transition: "all 0.15s"
          }}>{t}</button>
        ))}
      </div>

      {tab === "flowchart" ? (
        <div style={{ background: "#0d1525", border: "1px solid #1e293b", borderRadius: 14, padding: "16px 8px", width: "100%", maxWidth: 620 }}>
          <svg width="100%" viewBox={`0 0 600 ${svgH}`}>
            {/* Straight arrows between sequential nodes */}
            {[0,1,2,4,5,6,7,8].map(i => {
              const y1 = ys[i] + (nodes[i].shape === "pill" ? H/2 : nodes[i].shape === "diamond" ? DH/2 : H/2);
              const y2 = ys[i+1] - (nodes[i+1].shape === "pill" ? H/2 : nodes[i+1].shape === "diamond" ? DH/2 : H/2);
              return <Arrow key={i} x1={cx} y1={y1} x2={cx} y2={y2} color="#334155"/>;
            })}

            {/* Loop "Yes" arrow from diamond down to grad */}
            <Arrow x1={cx} y1={ys[3] + DH/2} x2={cx} y2={ys[4] - H/2} label="YES" color="#34d399"/>

            {/* Loop "No" arrow from diamond right → down → to output */}
            {/* exit right from diamond to output */}
            <g>
              <defs>
                <marker id="ah-no" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#fb923c"/>
                </marker>
              </defs>
              {/* line from right of diamond, across, down to output level, then left to output */}
              <polyline
                points={`${cx + W*0.28},${ys[3]}  500,${ys[3]}  500,${ys[8]}  ${cx + W/2},${ys[8]}`}
                fill="none" stroke="#fb923c" strokeWidth="1.6"
                markerEnd="url(#ah-no)"
              />
              <text x="510" y={ys[3] - 6} fill="#fb923c" fontSize="10"
                    fontFamily="'JetBrains Mono', monospace">NO</text>
            </g>

            {/* Loop-back arrow from incr back up to loop check */}
            <g>
              <defs>
                <marker id="ah-back" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#818cf8"/>
                </marker>
              </defs>
              <polyline
                points={`${cx - W/2},${ys[7]}  100,${ys[7]}  100,${ys[3]}  ${cx - W*0.28},${ys[3]}`}
                fill="none" stroke="#818cf8" strokeWidth="1.6"
                markerEnd="url(#ah-back)"
              />
              <text x="52" y={(ys[7]+ys[3])/2} fill="#818cf8" fontSize="9"
                    fontFamily="'JetBrains Mono', monospace" textAnchor="middle">loop</text>
            </g>

            {/* Render all nodes */}
            {nodes.map((n, i) => <Node key={n.id} node={n} y={ys[i]}/>)}

            {/* Legend */}
            {[
              { color: "#22d3ee", label: "Terminal" },
              { color: "#818cf8", label: "Process" },
              { color: "#fb923c", label: "Decision" },
              { color: "#34d399", label: "Core loop body" },
            ].map((l, i) => (
              <g key={i} transform={`translate(${20 + i * 138}, ${svgH - 22})`}>
                <rect width="10" height="10" rx="2" fill={l.color + "44"} stroke={l.color} strokeWidth="1.2"/>
                <text x="14" y="9" fill="#64748b" fontSize="9" fontFamily="'JetBrains Mono', monospace">{l.label}</text>
              </g>
            ))}
          </svg>
        </div>
      ) : (
        <div style={{
          background: "#0d1525", border: "1px solid #1e293b", borderRadius: 14,
          padding: "28px 32px", width: "100%", maxWidth: 620,
          overflowX: "auto"
        }}>
          <pre style={{
            color: "#cbd5e1", fontSize: 13, lineHeight: 1.9, margin: 0,
            fontFamily: "'JetBrains Mono', monospace",
            whiteSpace: "pre-wrap"
          }}>
            {PSEUDOCODE.split('\n').map((line, i) => {
              let color = "#cbd5e1";
              if (line.startsWith("ALGORITHM") || line.startsWith("INPUT") || line.startsWith("DEFINE") || line.startsWith("INITIALIZE") || line.startsWith("OUTPUT")) color = "#22d3ee";
              else if (line.trim().startsWith("//")) color = "#475569";
              else if (line.includes("←") || line.includes("=")) color = "#34d399";
              else if (line.includes("LOOP") || line.includes("END LOOP")) color = "#fb923c";
              else if (line.startsWith("─")) color = "#1e293b";
              return <span key={i} style={{ color, display: "block" }}>{line || " "}</span>;
            })}
          </pre>
        </div>
      )}
    </div>
  );
}