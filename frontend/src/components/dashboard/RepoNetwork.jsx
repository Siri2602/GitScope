import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function RepoNetwork({ data }) {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const repos = (data.top_repos || []).slice(0, 8);
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) * 0.36;
    const maxStars = Math.max(...repos.map((r) => r.stars), 1);

    const center = { x: cx, y: cy, r: 28, label: data.username, isCenter: true };
    const nodes = repos.map((repo, i) => {
      const angle = (i / repos.length) * Math.PI * 2 - Math.PI / 2;
      const nodeR = 8 + (repo.stars / maxStars) * 18;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
        r: nodeR,
        label: repo.name,
        stars: repo.stars,
        angle,
        baseX: cx + radius * Math.cos(angle),
        baseY: cy + radius * Math.sin(angle),
        t: Math.random() * Math.PI * 2,
      };
    });

    nodesRef.current = [center, ...nodes];

    let animId;
    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      tick += 0.008;

      nodes.forEach((n, i) => {
        n.x = n.baseX + Math.cos(n.t + tick) * 4;
        n.y = n.baseY + Math.sin(n.t + tick * 0.7) * 4;
      });

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = 'rgba(34,197,94,0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      nodes.forEach((n) => {
        const isHov = hovered === n.label;
        const glowSize = isHov ? n.r * 2.5 : n.r * 1.8;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
        grad.addColorStop(0, isHov ? 'rgba(34,197,94,0.3)' : 'rgba(34,197,94,0.12)');
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = isHov ? 'rgba(34,197,94,0.25)' : 'rgba(34,197,94,0.1)';
        ctx.strokeStyle = isHov ? '#22C55E' : 'rgba(34,197,94,0.4)';
        ctx.lineWidth = isHov ? 2 : 1.5;
        ctx.fill();
        ctx.stroke();

        if (isHov || n.r > 16) {
          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          ctx.font = `${isHov ? 600 : 400} 10px Inter`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(n.label.length > 12 ? n.label.slice(0, 12) + '…' : n.label, n.x, n.y + n.r + 5);
        }
      });

      const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, center.r * 2);
      cGrad.addColorStop(0, 'rgba(34,197,94,0.35)');
      cGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, center.r * 2, 0, Math.PI * 2);
      ctx.fillStyle = cGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, center.r, 0, Math.PI * 2);
      ctx.fillStyle = '#1E293B';
      ctx.strokeStyle = '#22C55E';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = '600 11px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(data.username.slice(0, 8), cx, cy);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [data, hovered]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let found = null;
    nodesRef.current.forEach((n) => {
      if (!n.isCenter) {
        const dist = Math.hypot(mx - n.x, my - n.y);
        if (dist < n.r + 8) found = n.label;
      }
    });
    setHovered(found);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="card p-6"
    >
      <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Repository Network</h3>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(null)}
        className="w-full"
        style={{ height: 280, cursor: hovered ? 'pointer' : 'default' }}
      />
    </motion.div>
  );
}
