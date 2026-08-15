export const FORMATS = {
  story: {
    id: "story",
    w: 1080,
    h: 1920,
    label: "Historia",
    hint: "Instagram Stories · 9:16",
    pickerHint: "9:16",
    file: "aleph-san-jose-historia.png",
    ratio: "9 / 16",
  },
  square: {
    id: "square",
    w: 1080,
    h: 1080,
    label: "Cuadrado",
    hint: "Feed de Instagram · 1:1",
    pickerHint: "1:1",
    file: "aleph-san-jose-post.png",
    ratio: "1 / 1",
  },
  portrait: {
    id: "portrait",
    w: 1080,
    h: 1350,
    label: "Vertical",
    hint: "Feed de Instagram · 4:5",
    pickerHint: "4:5",
    file: "aleph-san-jose-post-vertical.png",
    ratio: "4 / 5",
  },
  twitter: {
    id: "twitter",
    w: 1600,
    h: 900,
    label: "X",
    hint: "X / Twitter · 16:9",
    pickerHint: "16:9",
    file: "aleph-san-jose-x.png",
    ratio: "16 / 9",
  },
} as const;

export type FormatId = keyof typeof FORMATS;
export type Format = (typeof FORMATS)[FormatId];

export const FORMAT_LIST = Object.values(FORMATS);

export const SPONSOR_LOGOS = [
  { src: "/logos/zeek.webp", round: true },
  { src: "/logos/sebastian.webp", round: true },
  { src: "/logos/mike-dev.webp", round: true },
  { src: "/logos/fabian.webp", round: true },
  { src: "/logos/emilio.webp", round: true },
  { src: "/logos/tamara.webp", round: true },
] as const;

export type SponsorMark = {
  img: CanvasImageSource;
  round?: boolean;
};

const NAVY = "#2E3852";
const INK = "#FAFAFA";
const GREEN = "#56F163";
const SURFACE = "#3A445C";
const MUTED = "#E2E3E6";

const DATE = "22–23 AGO 2026";
const EVENT = "ALEPH HACKATHON";
const CHAPTER = "SAN JOSÉ";
const SITE = "https://alephhackathon.crecimiento.build";

export type CredentialInput = {
  name: string;
  role: string;
  photo: CanvasImageSource | null;
  sun: CanvasImageSource;
  sponsors: readonly SponsorMark[];
};

const srcSize = (img: CanvasImageSource) => {
  if (img instanceof HTMLImageElement) {
    return { w: img.naturalWidth || img.width, h: img.naturalHeight || img.height };
  }
  if (typeof ImageBitmap !== "undefined" && img instanceof ImageBitmap) {
    return { w: img.width, h: img.height };
  }
  if (img instanceof HTMLCanvasElement) {
    return { w: img.width, h: img.height };
  }
  return { w: 1, h: 1 };
};

const setFont = (ctx: CanvasRenderingContext2D, weight: number, size: number) => {
  ctx.font = `${weight} ${size}px Geist, ui-sans-serif, system-ui, sans-serif`;
};

const wrap = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const lines: string[] = [];
  let line = words[0] ?? "";
  for (let i = 1; i < words.length; i++) {
    const trial = `${line} ${words[i]}`;
    if (ctx.measureText(trial).width <= maxWidth) line = trial;
    else {
      lines.push(line);
      line = words[i] ?? "";
    }
  }
  lines.push(line);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  let last = kept[maxLines - 1] ?? "";
  while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) {
    last = last.slice(0, -1);
  }
  kept[maxLines - 1] = `${last}…`;
  return kept;
};

const nameLayout = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxSize: number,
  minSize: number,
  maxLines: number,
  weight: number,
) => {
  let size = maxSize;
  let lines: string[] = [];
  while (size >= minSize) {
    setFont(ctx, weight, size);
    lines = wrap(ctx, text, maxWidth, 99);
    const widest = Math.max(0, ...lines.map((line) => ctx.measureText(line).width));
    if (lines.length <= maxLines && widest <= maxWidth) return { size, lines };
    size -= 2;
  }
  setFont(ctx, weight, minSize);
  return { size: minSize, lines: wrap(ctx, text, maxWidth, maxLines) };
};

const roundRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
};

const drawContain = (
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  x: number,
  y: number,
  w: number,
  h: number,
  radius = 0,
) => {
  const { w: iw, h: ih } = srcSize(img);
  if (!iw || !ih || w <= 0 || h <= 0) return;
  const scale = Math.min(w / iw, h / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = x + (w - dw) / 2;
  const dy = y + (h - dh) / 2;
  if (radius > 0) {
    ctx.save();
    roundRectPath(ctx, dx, dy, dw, dh, radius);
    ctx.clip();
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
    return;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
};

const SPONSOR_SCALE = 1.08;

const drawSponsorRow = (
  ctx: CanvasRenderingContext2D,
  logos: readonly SponsorMark[],
  x: number,
  y: number,
  width: number,
  height: number,
  align: "start" | "center" = "center",
) => {
  if (logos.length === 0 || width <= 0 || height <= 0) return;
  const gap = Math.max(8, Math.round(height * 0.22));
  const slot = Math.min(height, (width - gap * (logos.length - 1)) / logos.length);
  const used = slot * logos.length + gap * (logos.length - 1);
  let cursor = align === "start" ? x : x + Math.max(0, (width - used) / 2);
  logos.forEach((logo) => {
    const radius = logo.round ? slot * 0.22 : 0;
    drawContain(ctx, logo.img, cursor, y + (height - slot) / 2, slot, slot, radius);
    cursor += slot + gap;
  });
};

const drawSponsorsBesideSun = (
  ctx: CanvasRenderingContext2D,
  logos: readonly SponsorMark[],
  sunX: number,
  sunY: number,
  sunSize: number,
  rowWidth: number,
) => {
  const height = Math.round((sunSize - 8) * SPONSOR_SCALE);
  drawSponsorRow(
    ctx,
    logos,
    sunX + sunSize + 16,
    sunY + (sunSize - height) / 2,
    rowWidth - sunSize - 16,
    height,
    "start",
  );
};

const drawCover = (
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  x: number,
  y: number,
  w: number,
  h: number,
) => {
  const { w: iw, h: ih } = srcSize(img);
  if (!iw || !ih) return;
  const scale = Math.max(w / iw, h / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  ctx.restore();
};

const drawSun = (
  ctx: CanvasRenderingContext2D,
  sun: CanvasImageSource,
  x: number,
  y: number,
  size: number,
  alpha = 1,
) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(sun, x, y, size, size);
  ctx.restore();
};

const drawPhotoOrSlot = (
  ctx: CanvasRenderingContext2D,
  photo: CanvasImageSource | null,
  sun: CanvasImageSource,
  x: number,
  y: number,
  w: number,
  h: number,
) => {
  ctx.fillStyle = SURFACE;
  ctx.fillRect(x, y, w, h);
  if (photo) {
    drawCover(ctx, photo, x, y, w, h);
    return;
  }
  const size = Math.min(w, h) * 0.28;
  drawSun(ctx, sun, x + (w - size) / 2, y + (h - size) / 2, size, 0.28);
};

const drawLines = (
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  size: number,
  lineHeight: number,
  color: string,
  weight: number,
  tracking = 0,
) => {
  setFont(ctx, weight, size);
  ctx.fillStyle = color;
  ctx.letterSpacing = tracking ? `${tracking}em` : "0px";
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * size * lineHeight);
  });
  ctx.letterSpacing = "0px";
};

const labels = (name: string, role: string) => ({
  name: name.trim() || "Tu nombre",
  role: role.trim() || "Tu profesión",
  nameColor: name.trim() ? INK : MUTED,
  roleColor: GREEN,
});

const wordmark = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  setFont(ctx, 800, size);
  ctx.fillStyle = INK;
  ctx.letterSpacing = "-0.04em";
  ctx.fillText("ALEPH", x, y);
  ctx.fillText("HACKATHON", x, y + size * 0.92);
  ctx.letterSpacing = "0px";
};

const drawDateAndUrl = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dateSize: number,
  urlSize: number,
) => {
  setFont(ctx, 600, dateSize);
  ctx.fillStyle = MUTED;
  ctx.letterSpacing = "0.08em";
  ctx.fillText(DATE, x, y);
  ctx.letterSpacing = "0px";
  setFont(ctx, 500, urlSize);
  ctx.fillStyle = MUTED;
  ctx.globalAlpha = 0.78;
  ctx.fillText(SITE, x, y + dateSize + Math.round(dateSize * 0.35));
  ctx.globalAlpha = 1;
};

export const shareCaption = (name: string, role: string) => {
  const who = [name.trim(), role.trim()].filter(Boolean).join(" · ");
  const line = who || "Aleph Hackathon San José";
  return `${line}\nAleph Hackathon San José · 22–23 de agosto 2026\nhttps://alephhackathon.crecimiento.build/\n#AlephHackathon #CostaRica`;
};

export const drawCredential = (
  ctx: CanvasRenderingContext2D,
  format: FormatId,
  input: CredentialInput,
) => {
  const { w, h } = FORMATS[format];
  ctx.canvas.width = w;
  ctx.canvas.height = h;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, w, h);

  switch (format) {
    case "story":
      drawStory(ctx, input);
      break;
    case "square":
      drawSquare(ctx, input);
      break;
    case "portrait":
      drawPortrait(ctx, input);
      break;
    case "twitter":
      drawTwitter(ctx, input);
      break;
  }
};

const drawStory = (ctx: CanvasRenderingContext2D, input: CredentialInput) => {
  const { sun, photo } = input;
  const { name, role, nameColor, roleColor } = labels(input.name, input.role);
  const t = (n: number) => Math.round(n * 1.2);
  drawSun(ctx, sun, 430, 520, 820, 0.06);

  const pad = 72;
  const top = 280;
  const maxW = 1080 - pad * 2;
  const sunSize = 88;

  drawSun(ctx, sun, pad, top, sunSize);
  drawSponsorsBesideSun(ctx, input.sponsors, pad, top, sunSize, maxW);

  setFont(ctx, 600, t(22));
  ctx.fillStyle = GREEN;
  ctx.letterSpacing = "0.12em";
  ctx.fillText("CHAPTER SAN JOSÉ", pad, top + sunSize + t(20));
  ctx.letterSpacing = "0px";
  wordmark(ctx, pad, top + sunSize + t(52), t(52));

  setFont(ctx, 600, t(22));
  ctx.fillStyle = MUTED;
  ctx.letterSpacing = "0.08em";
  ctx.fillText(DATE, pad, top + sunSize + t(172));
  ctx.letterSpacing = "0px";

  const photoY = 620;
  const photoH = 700;
  drawPhotoOrSlot(ctx, photo, sun, pad, photoY, maxW, photoH);

  const textY = photoY + photoH + 40;
  const nameFit = nameLayout(ctx, name, maxW, t(64), t(36), 2, 800);
  drawLines(ctx, nameFit.lines, pad, textY, nameFit.size, 1.02, nameColor, 800, -0.04);
  const roleY = textY + nameFit.lines.length * nameFit.size * 1.02 + 14;
  const roleFit = nameLayout(ctx, role, maxW, t(28), t(20), 2, 600);
  drawLines(ctx, roleFit.lines, pad, roleY, roleFit.size, 1.15, roleColor, 600);

  const urlSize = t(18);
  setFont(ctx, 500, urlSize);
  ctx.fillStyle = MUTED;
  ctx.textAlign = "center";
  ctx.globalAlpha = 0.78;
  ctx.fillText(SITE, 540, 1920 - pad - urlSize);
  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
};

const drawSquare = (ctx: CanvasRenderingContext2D, input: CredentialInput) => {
  const { sun, photo } = input;
  const { name, role, nameColor, roleColor } = labels(input.name, input.role);
  const t = (n: number) => Math.round(n * 1.15);
  const photoW = 500;
  drawPhotoOrSlot(ctx, photo, sun, 0, 0, photoW, 1080);
  ctx.fillStyle = NAVY;
  ctx.fillRect(photoW, 0, 1080 - photoW, 1080);
  drawSun(ctx, sun, 620, 280, 520, 0.07);

  const x = photoW + 40;
  const maxW = 1080 - x - 40;
  const sunSize = 56;
  const rowY = 44;
  drawSun(ctx, sun, x, rowY, sunSize);
  drawSponsorsBesideSun(ctx, input.sponsors, x, rowY, sunSize, maxW);

  setFont(ctx, 600, t(16));
  ctx.fillStyle = GREEN;
  ctx.letterSpacing = "0.12em";
  ctx.fillText(CHAPTER, x, rowY + sunSize + t(18));
  ctx.letterSpacing = "0px";
  wordmark(ctx, x, rowY + sunSize + t(46), t(28));

  const nameFit = nameLayout(ctx, name, maxW, t(56), t(28), 3, 800);
  drawLines(ctx, nameFit.lines, x, 310, nameFit.size, 1.02, nameColor, 800, -0.04);
  const roleY = 310 + nameFit.lines.length * nameFit.size * 1.02 + 18;
  const roleFit = nameLayout(ctx, role, maxW, t(26), t(18), 2, 600);
  drawLines(ctx, roleFit.lines, x, roleY, roleFit.size, 1.15, roleColor, 600);

  drawDateAndUrl(ctx, x, 978, t(16), t(13));
};

const drawPortrait = (ctx: CanvasRenderingContext2D, input: CredentialInput) => {
  const { sun, photo } = input;
  const { name, role, nameColor, roleColor } = labels(input.name, input.role);
  const t = (n: number) => Math.round(n * 1.05);
  const photoH = 760;
  drawPhotoOrSlot(ctx, photo, sun, 0, 0, 1080, photoH);
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, photoH, 1080, 1350 - photoH);
  drawSun(ctx, sun, 700, 820, 480, 0.07);

  const pad = 56;
  const y = photoH + 40;
  const maxW = 1080 - pad * 2;
  const sunSize = 64;
  drawSun(ctx, sun, pad, y, sunSize);
  drawSponsorsBesideSun(ctx, input.sponsors, pad, y, sunSize, maxW);

  setFont(ctx, 600, t(18));
  ctx.fillStyle = GREEN;
  ctx.letterSpacing = "0.12em";
  ctx.fillText(`${EVENT} · ${CHAPTER}`, pad, y + sunSize + t(18));
  ctx.letterSpacing = "0px";

  const nameY = y + sunSize + t(48) + 10;
  const nameFit = nameLayout(ctx, name, maxW, t(64), t(32), 2, 800);
  drawLines(ctx, nameFit.lines, pad, nameY, nameFit.size, 1.02, nameColor, 800, -0.04);
  const roleY = nameY + nameFit.lines.length * nameFit.size * 1.02 + 14;
  const roleFit = nameLayout(ctx, role, maxW, t(28), t(18), 2, 600);
  drawLines(ctx, roleFit.lines, pad, roleY, roleFit.size, 1.15, roleColor, 600);

  drawDateAndUrl(ctx, pad, 1256, t(18), t(15));
};

const drawTwitter = (ctx: CanvasRenderingContext2D, input: CredentialInput) => {
  const { sun, photo } = input;
  const { name, role, nameColor, roleColor } = labels(input.name, input.role);
  const t = (n: number) => Math.round(n * 1.05);
  const photoW = 900;
  drawPhotoOrSlot(ctx, photo, sun, 0, 0, photoW, 900);
  ctx.fillStyle = NAVY;
  ctx.fillRect(photoW, 0, 1600 - photoW, 900);
  drawSun(ctx, sun, 1180, 200, 520, 0.07);

  const x = photoW + 48;
  const maxW = 1600 - x - 48;
  const sunSize = 56;
  const rowY = 48;
  drawSun(ctx, sun, x, rowY, sunSize);
  drawSponsorsBesideSun(ctx, input.sponsors, x, rowY, sunSize, maxW);

  setFont(ctx, 600, t(18));
  ctx.fillStyle = GREEN;
  ctx.letterSpacing = "0.12em";
  ctx.fillText("CHAPTER SAN JOSÉ", x, rowY + sunSize + t(18));
  ctx.letterSpacing = "0px";
  wordmark(ctx, x, rowY + sunSize + t(48), t(32));

  const nameFit = nameLayout(ctx, name, maxW, t(52), t(28), 3, 800);
  drawLines(ctx, nameFit.lines, x, 310, nameFit.size, 1.02, nameColor, 800, -0.04);
  const roleY = 310 + nameFit.lines.length * nameFit.size * 1.02 + 16;
  const roleFit = nameLayout(ctx, role, maxW, t(26), t(18), 2, 600);
  drawLines(ctx, roleFit.lines, x, roleY, roleFit.size, 1.15, roleColor, 600);

  drawDateAndUrl(ctx, x, 778, t(18), t(15));
};
