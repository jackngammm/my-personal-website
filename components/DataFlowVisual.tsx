"use client";

import { useEffect, useRef } from "react";

export default function DataFlowVisual({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;

    const nodeGlow = {
      l1: [0, 0, 0, 0],
      l2: [0, 0, 0],
      l3: [0, 0],
    };

    interface DataParticle {
      x: number; y: number; vx: number; vy: number;
      alpha: number; label?: string;
    }
    const DATA_LABELS = ["0.94", "null", "x²", "[...]", "NaN", "1.2", "0.07", "∞", "?"];
    const dataParticles: DataParticle[] = [];

    interface StreamParticle {
      x0: number; y0: number; x1: number; y1: number;
      cx: number; cy: number; t: number; speed: number;
      targetNode: number;
    }
    const stream12: StreamParticle[] = [];

    interface Pulse {
      x0: number; y0: number; x1: number; y1: number;
      t: number; speed: number; toL: number; toN: number;
    }
    const pulses: Pulse[] = [];
    let lastPulseWave = -9999;

    interface OutputParticle { x0: number; y0: number; x1: number; y1: number; t: number; }
    const outputParticles: OutputParticle[] = [];
    let lastOutputSpawn = -9999;

    let decisionProgress = 0;
    const sonarRings: Array<{ r: number; alpha: number }> = [];
    let lastSonar = -9999;
    let prevTime: number | null = null;

    const getNodePos = () => {
      const s2L = W / 3;
      const s2R = (2 * W) / 3;
      const pad = Math.min(H * 0.16, 65);

      const l1x = s2L + (s2R - s2L) * 0.18;
      const l2x = s2L + (s2R - s2L) * 0.50;
      const l3x = s2L + (s2R - s2L) * 0.82;

      const ySpread4 = (H - pad * 2) / 3;
      const ySpread3 = (H - pad * 2) / 2;
      const yBase2 = H / 2 - (H - pad * 2) * 0.18;

      const l1 = [0, 1, 2, 3].map((i) => ({ x: l1x, y: pad + i * ySpread4 }));
      const l2 = [0, 1, 2].map((i) => ({ x: l2x, y: pad + i * ySpread3 }));
      const l3 = [0, 1].map((i) => ({ x: l3x, y: yBase2 + i * (H - pad * 2) * 0.36 }));
      return { l1, l2, l3 };
    };

    const getDecisionPoints = () => {
      const s3L = (2 * W) / 3;
      const s3W = W / 3;
      const baseY = H * 0.68;
      return [
        { x: s3L + s3W * 0.06, y: baseY },
        { x: s3L + s3W * 0.25, y: baseY - H * 0.10 },
        { x: s3L + s3W * 0.44, y: baseY - H * 0.07 },
        { x: s3L + s3W * 0.63, y: baseY - H * 0.22 },
        { x: s3L + s3W * 0.88, y: baseY - H * 0.36 },
      ];
    };

    const getConvergePoint = () => {
      const net = getNodePos();
      const cx = net.l3.reduce((s, n) => s + n.x, 0) / net.l3.length;
      const cy = net.l3.reduce((s, n) => s + n.y, 0) / net.l3.length;
      return { x: cx + (W / 3) * 0.05, y: cy };
    };

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      dataParticles.length = 0;
      stream12.length = 0;
      pulses.length = 0;
      outputParticles.length = 0;
      sonarRings.length = 0;
      decisionProgress = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const spawnPulseWave = (net: ReturnType<typeof getNodePos>, now: number) => {
      if (now - lastPulseWave < 1800) return;
      lastPulseWave = now;
      for (let i = 0; i < net.l1.length; i++) {
        for (let j = 0; j < net.l2.length; j++) {
          pulses.push({
            x0: net.l1[i].x, y0: net.l1[i].y,
            x1: net.l2[j].x, y1: net.l2[j].y,
            t: -(i * 0.07 + j * 0.03),
            speed: 0.5 + Math.random() * 0.2,
            toL: 2, toN: j,
          });
        }
      }
      for (let i = 0; i < net.l2.length; i++) {
        for (let j = 0; j < net.l3.length; j++) {
          pulses.push({
            x0: net.l2[i].x, y0: net.l2[i].y,
            x1: net.l3[j].x, y1: net.l3[j].y,
            t: -(0.32 + i * 0.07 + j * 0.04),
            speed: 0.5 + Math.random() * 0.2,
            toL: 3, toN: j,
          });
        }
      }
    };

    const draw = (now: number) => {
      const dt = prevTime !== null ? Math.min((now - prevTime) / 1000, 0.05) : 0.016;
      prevTime = now;
      if (W === 0 || H === 0) { animId = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, W, H);

      // Per-stage radial glows — warm terracotta tint
      const stageGlows = [
        { cx: W / 6,       cy: H / 2, r: H * 0.7 },
        { cx: W / 2,       cy: H / 2, r: H * 0.75 },
        { cx: (5 * W) / 6, cy: H / 2, r: H * 0.7 },
      ];
      for (const g of stageGlows) {
        const grad = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.r);
        grad.addColorStop(0, "rgba(196,98,45,0.05)");
        grad.addColorStop(1, "rgba(196,98,45,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      // Horizontal grid lines
      ctx.strokeStyle = "rgba(240,237,232,0.035)";
      ctx.lineWidth = 1;
      for (let y = 0; y < H; y += 38) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Stage dividers
      ctx.setLineDash([3, 10]);
      ctx.strokeStyle = "rgba(240,237,232,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(W / 3, 0); ctx.lineTo(W / 3, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo((2 * W) / 3, 0); ctx.lineTo((2 * W) / 3, H); ctx.stroke();
      ctx.setLineDash([]);

      const net = getNodePos();

      // ════ STAGE 1 — DATA ════

      if (dataParticles.length < 40 && Math.random() < 0.14) {
        dataParticles.push({
          x: Math.random() * (W / 3 - 30) + 8,
          y: Math.random() * (H - 40) + 20,
          vx: 0.15 + Math.random() * 0.28,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: 0.45 + Math.random() * 0.25,
          label: Math.random() < 0.35
            ? DATA_LABELS[Math.floor(Math.random() * DATA_LABELS.length)]
            : undefined,
        });
      }

      for (let i = dataParticles.length - 1; i >= 0; i--) {
        const p = dataParticles[i];
        const pull = Math.max(0, (p.x - W / 9) / (W / 5)) * 0.028;
        p.vx += pull;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 8 || p.y > H - 8) p.vy *= -1;

        if (p.x > W / 3 - 18) {
          const tn = Math.floor(Math.random() * net.l1.length);
          const tgt = net.l1[tn];
          stream12.push({
            x0: p.x, y0: p.y,
            x1: tgt.x, y1: tgt.y,
            cx: (p.x + tgt.x) / 2 + (Math.random() - 0.5) * 35,
            cy: (p.y + tgt.y) / 2 - 25,
            t: 0, speed: 0.8 + Math.random() * 0.5,
            targetNode: tn,
          });
          dataParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,237,232,${p.alpha})`;
        ctx.fill();

        if (p.label) {
          ctx.font = "9px monospace";
          ctx.fillStyle = `rgba(240,237,232,${p.alpha * 0.7})`;
          ctx.fillText(p.label, p.x + 6, p.y - 3);
        }
      }

      // Stream: Stage 1 → Stage 2
      for (let i = stream12.length - 1; i >= 0; i--) {
        const sp = stream12[i];
        sp.t += dt * sp.speed;
        if (sp.t >= 1) {
          nodeGlow.l1[sp.targetNode] = Math.min(1, nodeGlow.l1[sp.targetNode] + 1.0);
          stream12.splice(i, 1);
          continue;
        }
        const t = sp.t;
        const x = (1 - t) * (1 - t) * sp.x0 + 2 * (1 - t) * t * sp.cx + t * t * sp.x1;
        const y = (1 - t) * (1 - t) * sp.y0 + 2 * (1 - t) * t * sp.cy + t * t * sp.y1;
        const a = t < 0.15 ? (t / 0.15) * 0.75 : t > 0.85 ? ((1 - t) / 0.15) * 0.75 : 0.75;
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,237,232,${a})`; ctx.fill();
      }

      // ════ STAGE 2 — NEURAL NETWORK ════

      const drawConns = (
        from: Array<{ x: number; y: number }>,
        to: Array<{ x: number; y: number }>
      ) => {
        for (const f of from) {
          for (const t of to) {
            ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(t.x, t.y);
            ctx.strokeStyle = "rgba(240,237,232,0.22)";
            ctx.lineWidth = 1.5; ctx.stroke();
          }
        }
      };
      drawConns(net.l1, net.l2);
      drawConns(net.l2, net.l3);

      spawnPulseWave(net, now);

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += dt * p.speed;
        if (p.t < 0) continue;
        if (p.t >= 1) {
          const arr = p.toL === 2 ? nodeGlow.l2 : nodeGlow.l3;
          arr[p.toN] = Math.min(1, (arr[p.toN] ?? 0) + 1.0);
          pulses.splice(i, 1);
          continue;
        }
        const t = p.t;
        const px = p.x0 + (p.x1 - p.x0) * t;
        const py = p.y0 + (p.y1 - p.y0) * t;

        for (let tr = 6; tr >= 1; tr--) {
          const tt = Math.max(0, t - tr * 0.04);
          const tx = p.x0 + (p.x1 - p.x0) * tt;
          const ty = p.y0 + (p.y1 - p.y0) * tt;
          ctx.beginPath(); ctx.arc(tx, ty, 2.5 - tr * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,237,232,${0.35 - tr * 0.05})`; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(240,237,232,1)"; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(240,237,232,0.12)"; ctx.fill();
      }

      const drawLayer = (
        nodes: Array<{ x: number; y: number }>,
        glows: number[],
        r: number,
        baseAlpha: number
      ) => {
        for (let i = 0; i < nodes.length; i++) {
          const g = glows[i] ?? 0;
          glows[i] = Math.max(0, g - dt * 1.6);

          if (g > 0.05) {
            ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, r + 14, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(240,237,232,${g * 0.15})`; ctx.fill();
            ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, r + 6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(240,237,232,${g * 0.18})`; ctx.fill();
          }
          ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, r, 0, Math.PI * 2);
          ctx.fillStyle = "#0d1117"; ctx.fill();
          ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(240,237,232,${baseAlpha + g * 0.7})`;
          ctx.lineWidth = 2; ctx.stroke();
        }
      };
      drawLayer(net.l1, nodeGlow.l1, 8,  0.35);
      drawLayer(net.l2, nodeGlow.l2, 10, 0.40);
      drawLayer(net.l3, nodeGlow.l3, 9,  0.45);

      // ════ OUTPUT STREAM: Stage 2 → Stage 3 ════
      const conv = getConvergePoint();

      if (now - lastOutputSpawn > 450) {
        lastOutputSpawn = now;
        for (const node of net.l3) {
          outputParticles.push({ x0: node.x, y0: node.y, x1: conv.x, y1: conv.y, t: 0 });
        }
      }

      for (let i = outputParticles.length - 1; i >= 0; i--) {
        const op = outputParticles[i];
        op.t += dt * 1.0;
        if (op.t >= 1) { outputParticles.splice(i, 1); continue; }
        const x = op.x0 + (op.x1 - op.x0) * op.t;
        const y = op.y0 + (op.y1 - op.y0) * op.t;
        const a = op.t < 0.2 ? op.t * 5 * 0.8 : op.t > 0.8 ? (1 - op.t) * 5 * 0.8 : 0.8;
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,237,232,${a})`; ctx.fill();
      }

      ctx.beginPath(); ctx.arc(conv.x, conv.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(240,237,232,0.6)"; ctx.fill();
      ctx.beginPath(); ctx.arc(conv.x, conv.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(240,237,232,0.1)"; ctx.fill();

      // ════ STAGE 3 — DECISIONS ════

      decisionProgress += dt * 0.22;
      if (decisionProgress >= 1.5) decisionProgress = 0;

      const pts = getDecisionPoints();

      if (pts.length > 1) {
        const drawProg = Math.min(1, decisionProgress / 0.9);
        const totalSegs = pts.length - 1;
        const progInSegs = drawProg * totalSegs;

        const drawnPts: Array<{ x: number; y: number }> = [{ x: pts[0].x, y: pts[0].y }];
        let tipX = pts[0].x;
        let tipY = pts[0].y;

        for (let s = 0; s < totalSegs; s++) {
          const segP = Math.min(1, Math.max(0, progInSegs - s));
          if (segP <= 0) break;
          const x = pts[s].x + (pts[s + 1].x - pts[s].x) * segP;
          const y = pts[s].y + (pts[s + 1].y - pts[s].y) * segP;
          drawnPts.push({ x, y });
          tipX = x; tipY = y;
          if (segP < 1) break;
        }

        const lineAlpha = decisionProgress > 1.2
          ? Math.max(0, (1.5 - decisionProgress) / 0.3)
          : 1.0;

        if (drawnPts.length > 1) {
          ctx.beginPath();
          ctx.moveTo(drawnPts[0].x, H);
          for (const pt of drawnPts) ctx.lineTo(pt.x, pt.y);
          ctx.lineTo(tipX, H);
          ctx.closePath();
          const fillGrad = ctx.createLinearGradient(0, 0, 0, H);
          fillGrad.addColorStop(0, `rgba(240,237,232,${0.08 * lineAlpha})`);
          fillGrad.addColorStop(1, "rgba(240,237,232,0)");
          ctx.fillStyle = fillGrad;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(drawnPts[0].x, drawnPts[0].y);
          for (let pi = 1; pi < drawnPts.length; pi++) ctx.lineTo(drawnPts[pi].x, drawnPts[pi].y);
          ctx.strokeStyle = `rgba(240,237,232,${0.12 * lineAlpha})`;
          ctx.lineWidth = 14; ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(drawnPts[0].x, drawnPts[0].y);
          for (let pi = 1; pi < drawnPts.length; pi++) ctx.lineTo(drawnPts[pi].x, drawnPts[pi].y);
          ctx.strokeStyle = `rgba(240,237,232,${lineAlpha})`;
          ctx.lineWidth = 3; ctx.stroke();
        }

        if (drawProg > 0.02) {
          ctx.beginPath(); ctx.arc(tipX, tipY, 12, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,237,232,${0.1 * lineAlpha})`; ctx.fill();
          ctx.beginPath(); ctx.arc(tipX, tipY, 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,237,232,${lineAlpha})`; ctx.fill();

          if (now - lastSonar > 550 && decisionProgress > 0.08 && decisionProgress < 1.3) {
            lastSonar = now;
            sonarRings.push({ r: 5, alpha: 0.75 });
          }
          for (let i = sonarRings.length - 1; i >= 0; i--) {
            sonarRings[i].r += dt * 35;
            sonarRings[i].alpha -= dt * 0.9;
            if (sonarRings[i].alpha <= 0) { sonarRings.splice(i, 1); continue; }
            ctx.beginPath(); ctx.arc(tipX, tipY, sonarRings[i].r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(240,237,232,${sonarRings[i].alpha})`;
            ctx.lineWidth = 1.2; ctx.stroke();
          }

          if (decisionProgress > 0.55 && decisionProgress < 1.45) {
            const fadeIn = Math.min(1, (decisionProgress - 0.55) / 0.15);
            const fadeOut = decisionProgress > 1.2
              ? Math.max(0, (1.45 - decisionProgress) / 0.25) : 1;
            const labelAlpha = fadeIn * fadeOut * 0.65;
            const lastPt = pts[pts.length - 1];
            ctx.font = "11px monospace";
            ctx.fillStyle = `rgba(240,237,232,${labelAlpha})`;
            ctx.fillText("confidence: 94%", lastPt.x - 60, lastPt.y - 14);
          }
        }
      }

      // Stage labels
      ctx.font = "11px monospace";
      ctx.fillStyle = "rgba(240,237,232,0.40)";
      ctx.textAlign = "center";
      ctx.fillText("DATA",      W / 6,       H - 14);
      ctx.fillText("SYSTEMS",   W / 2,       H - 14);
      ctx.fillText("DECISIONS", (5 * W) / 6, H - 14);
      ctx.textAlign = "left";

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
