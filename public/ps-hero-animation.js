/**
 * Preisser Tech — Hero Canvas Animation
 * A flowing liquid-light gradient mesh with organic noise.
 *
 * Drop-in usage:
 *   <canvas id="ps-hero-canvas"></canvas>
 *   <script src="ps-hero-animation.js"></script>
 *
 * Brand palette:
 *   #0D95E8 (blue)  #635BFF (purple)  #80E9FF (cyan)  #00D4AA (green)
 */
(function () {
  "use strict";

  // ── Configuration ──────────────────────────────────────────────────
  var COLORS = [
    [13, 149, 232],   // #0D95E8  blue
    [99, 91, 255],    // #635BFF  purple
    [128, 233, 255],  // #80E9FF  cyan
    [0, 212, 170],    // #00D4AA  green
    [40, 60, 180],    // deep indigo accent
    [10, 200, 220],   // teal accent
  ];

  var BLOB_COUNT = 6;
  var BASE_SPEED = 0.00018;       // global time multiplier
  var BLOB_RADIUS_MIN = 0.28;     // fraction of canvas diagonal
  var BLOB_RADIUS_MAX = 0.52;
  var EDGE_SOFTNESS = 0.45;       // how soft the blob edges are (0-1)

  // ── Simplex-like 2D noise (compact implementation) ─────────────────
  // Attempt a fast gradient noise without a large library.
  // Uses a permutation table and gradient vectors.

  var PERM = new Uint8Array(512);
  var GRAD = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];

  function initNoise() {
    var p = new Uint8Array(256);
    for (var i = 0; i < 256; i++) p[i] = i;
    // Fisher-Yates shuffle with a fixed seed for determinism
    var seed = 42;
    for (var i = 255; i > 0; i--) {
      seed = (seed * 16807 + 0) % 2147483647;
      var j = seed % (i + 1);
      var tmp = p[i]; p[i] = p[j]; p[j] = tmp;
    }
    for (var i = 0; i < 512; i++) PERM[i] = p[i & 255];
  }

  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function noise2D(x, y) {
    var X = Math.floor(x) & 255;
    var Y = Math.floor(y) & 255;
    var xf = x - Math.floor(x);
    var yf = y - Math.floor(y);
    var u = fade(xf);
    var v = fade(yf);

    var aa = PERM[PERM[X] + Y];
    var ab = PERM[PERM[X] + Y + 1];
    var ba = PERM[PERM[X + 1] + Y];
    var bb = PERM[PERM[X + 1] + Y + 1];

    var ga = GRAD[aa & 7], gb = GRAD[ba & 7];
    var gc = GRAD[ab & 7], gd = GRAD[bb & 7];

    var n00 = ga[0] * xf + ga[1] * yf;
    var n10 = gb[0] * (xf - 1) + gb[1] * yf;
    var n01 = gc[0] * xf + gc[1] * (yf - 1);
    var n11 = gd[0] * (xf - 1) + gd[1] * (yf - 1);

    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), v);
  }

  // Fractal Brownian Motion — layered noise for organic detail
  function fbm(x, y, octaves) {
    var value = 0;
    var amplitude = 1;
    var frequency = 1;
    var max = 0;
    for (var i = 0; i < octaves; i++) {
      value += noise2D(x * frequency, y * frequency) * amplitude;
      max += amplitude;
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value / max; // normalised to roughly -1..1
  }

  // ── Blob definition ────────────────────────────────────────────────

  function createBlob(index) {
    var angle = (index / BLOB_COUNT) * Math.PI * 2;
    return {
      cx: 0.5 + Math.cos(angle) * 0.2,
      cy: 0.5 + Math.sin(angle) * 0.2,
      radius: BLOB_RADIUS_MIN + Math.random() * (BLOB_RADIUS_MAX - BLOB_RADIUS_MIN),
      color: COLORS[index % COLORS.length],
      // motion parameters — each blob orbits differently
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      speedX: 0.3 + Math.random() * 0.5,
      speedY: 0.3 + Math.random() * 0.5,
      orbitX: 0.12 + Math.random() * 0.18,
      orbitY: 0.10 + Math.random() * 0.16,
      noiseOffsetX: Math.random() * 100,
      noiseOffsetY: Math.random() * 100,
      alpha: 0.35 + Math.random() * 0.25,
    };
  }

  // ── Main renderer ──────────────────────────────────────────────────

  function PSHeroAnimation() {
    var canvas = document.getElementById("ps-hero-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    initNoise();

    // Respect prefers-reduced-motion
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var blobs = [];
    for (var i = 0; i < BLOB_COUNT; i++) {
      blobs.push(createBlob(i));
    }

    var width = 0;
    var height = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var animationId = null;
    var isVisible = true;
    var time = 0;

    // Off-screen canvas for compositing individual blobs
    var offCanvas = document.createElement("canvas");
    var offCtx = offCanvas.getContext("2d");

    function resize() {
      var parent = canvas.parentElement || document.body;
      var rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ── Draw a single soft blob with noise-distorted edges ───────

    function drawBlob(blob, t) {
      // Compute animated center
      var cx = blob.cx + Math.sin(t * blob.speedX + blob.phaseX) * blob.orbitX;
      var cy = blob.cy + Math.cos(t * blob.speedY + blob.phaseY) * blob.orbitY;

      // Add subtle noise drift
      var nDrift = fbm(blob.noiseOffsetX + t * 0.1, blob.noiseOffsetY + t * 0.1, 2);
      cx += nDrift * 0.04;
      cy += nDrift * 0.03;

      // Convert to pixel coordinates
      var px = cx * width;
      var py = cy * height;

      var diagonal = Math.sqrt(width * width + height * height);
      var r = blob.radius * diagonal;

      // Noise-modulated radius for organic shape
      var noiseScale = 0.8;
      var rVariation = 1.0 + fbm(
        blob.noiseOffsetX + Math.cos(t * 0.15) * 2,
        blob.noiseOffsetY + Math.sin(t * 0.12) * 2,
        3
      ) * 0.15;
      r *= rVariation;

      var col = blob.color;
      // Subtle color shift over time
      var hueShift = Math.sin(t * 0.08 + blob.phaseX) * 15;
      var r1 = Math.max(0, Math.min(255, col[0] + hueShift));
      var g1 = Math.max(0, Math.min(255, col[1] + hueShift * 0.5));
      var b1 = Math.max(0, Math.min(255, col[2] - hueShift * 0.3));

      var alpha = blob.alpha * (0.85 + Math.sin(t * 0.2 + blob.phaseY) * 0.15);

      var grad = ctx.createRadialGradient(px, py, 0, px, py, r);
      grad.addColorStop(0, "rgba(" + Math.round(r1) + "," + Math.round(g1) + "," + Math.round(b1) + "," + alpha + ")");
      grad.addColorStop(EDGE_SOFTNESS, "rgba(" + Math.round(r1) + "," + Math.round(g1) + "," + Math.round(b1) + "," + (alpha * 0.4) + ")");
      grad.addColorStop(1, "rgba(" + Math.round(r1) + "," + Math.round(g1) + "," + Math.round(b1) + ",0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    // ── Particle spark layer (subtle floating motes) ─────────────

    var SPARK_COUNT = 40;
    var sparks = [];

    function initSparks() {
      sparks = [];
      for (var i = 0; i < SPARK_COUNT; i++) {
        sparks.push({
          x: Math.random(),
          y: Math.random(),
          size: 0.5 + Math.random() * 1.5,
          speed: 0.0001 + Math.random() * 0.0003,
          drift: Math.random() * Math.PI * 2,
          alpha: 0.1 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
          color: COLORS[Math.floor(Math.random() * 4)],
        });
      }
    }

    function drawSparks(t) {
      for (var i = 0; i < sparks.length; i++) {
        var s = sparks[i];
        // Slow upward drift with horizontal wobble
        s.y -= s.speed;
        s.x += Math.sin(t * 0.5 + s.drift) * 0.0001;

        if (s.y < -0.02) {
          s.y = 1.02;
          s.x = Math.random();
        }

        var px = s.x * width;
        var py = s.y * height;
        var pulseAlpha = s.alpha * (0.5 + Math.sin(t * 0.6 + s.phase) * 0.5);

        ctx.beginPath();
        ctx.arc(px, py, s.size * dpr * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + s.color[0] + "," + s.color[1] + "," + s.color[2] + "," + pulseAlpha + ")";
        ctx.fill();
      }
    }

    // ── Render loop ──────────────────────────────────────────────

    function render() {
      if (!isVisible) {
        animationId = null;
        return;
      }

      time += 1;
      var t = time * BASE_SPEED * 60; // normalise to ~60fps base

      // Clear with dark base
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#0a0b1a";
      ctx.fillRect(0, 0, width, height);

      // Draw blobs with screen blending for that luminous overlap
      ctx.globalCompositeOperation = "screen";
      for (var i = 0; i < blobs.length; i++) {
        drawBlob(blobs[i], t);
      }

      // Additional lighter pass with additive blending for glow peaks
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.12;
      for (var i = 0; i < blobs.length; i++) {
        drawBlob(blobs[i], t + 0.5);
      }
      ctx.globalAlpha = 1.0;

      // Sparks on top
      ctx.globalCompositeOperation = "lighter";
      drawSparks(t);

      // Subtle vignette
      ctx.globalCompositeOperation = "source-over";
      var vignette = ctx.createRadialGradient(
        width * 0.5, height * 0.5, width * 0.2,
        width * 0.5, height * 0.5, width * 0.85
      );
      vignette.addColorStop(0, "rgba(10,11,26,0)");
      vignette.addColorStop(1, "rgba(10,11,26,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Subtle horizontal noise grain overlay (very light)
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = 0.025;
      for (var row = 0; row < height; row += 4) {
        var grainAlpha = (noise2D(row * 0.1, time * 0.001) + 1) * 0.5;
        ctx.fillStyle = "rgba(255,255,255," + grainAlpha + ")";
        ctx.fillRect(0, row, width, 2);
      }
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";

      animationId = requestAnimationFrame(render);
    }

    function start() {
      if (animationId) return;
      animationId = requestAnimationFrame(render);
    }

    function stop() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }

    // ── Reduced motion: render one frame, then stop ──────────────

    if (reducedMotion) {
      resize();
      initSparks();
      time = 300; // start partway in so it looks interesting
      isVisible = true;

      // Draw a single static frame
      var t = time * BASE_SPEED * 60;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#0a0b1a";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";
      for (var i = 0; i < blobs.length; i++) {
        drawBlob(blobs[i], t);
      }
      // Vignette
      ctx.globalCompositeOperation = "source-over";
      var vignette = ctx.createRadialGradient(
        width * 0.5, height * 0.5, width * 0.2,
        width * 0.5, height * 0.5, width * 0.85
      );
      vignette.addColorStop(0, "rgba(10,11,26,0)");
      vignette.addColorStop(1, "rgba(10,11,26,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Still handle resize
      window.addEventListener("resize", function () {
        resize();
        // Redraw static frame
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#0a0b1a";
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "screen";
        for (var i = 0; i < blobs.length; i++) {
          drawBlob(blobs[i], t);
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
      });

      return; // No animation loop
    }

    // ── Visibility observer ──────────────────────────────────────

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        var entry = entries[0];
        if (entry.isIntersecting) {
          isVisible = true;
          start();
        } else {
          isVisible = false;
          stop();
        }
      }, { threshold: 0.05 });
      observer.observe(canvas);
    }

    // ── Resize handler ───────────────────────────────────────────

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        resize();
      }, 100);
    });

    // ── Kickoff ──────────────────────────────────────────────────
    resize();
    initSparks();
    start();
  }

  // ── Boot ─────────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", PSHeroAnimation);
  } else {
    PSHeroAnimation();
  }
})();
