# Image Guide for AI Agents

How to add and optimize images in this portfolio (Create React App + Tailwind). Follow this so every image ships fast and looks right.

## 1. Inspect before you touch

- Always **look at the image first** (`ReadMediaFile`) and note its dimensions, orientation, and where the subject sits. Cropping decisions depend on it.
- HEIC sources (iPhone/Messages attachments) cannot go on the web as-is — convert (see below). Safari-only HEIC support is not acceptable; this site has a general audience.

## 2. Convert and resize with `sips` (built into macOS)

No extra tooling needed. One command does format + quality + max dimension:

```bash
sips -s format jpeg -s formatOptions 82 -Z 1600 <source>.heic --out src/assets/img/img_name.jpeg
```

Rules of thumb:

- **Target width ≈ 2× the image's maximum display width** (retina). Estimate display width from the layout — e.g. a half-width card in the main column renders ≤ ~750 px CSS, so 1600 px source is plenty. Don't ship the original 3000+ px photo.
- **JPEG q80–85** is the sweet spot for photos. Verify the result lands roughly in the **150–400 KB** range (check with `ls -lh` and `sips -g pixelWidth -g pixelHeight`). If it's bigger, lower quality or dimensions before reaching for other formats.
- **Format conventions in this repo:** JPEG for photos, PNG for graphics/logos/screenshots with flat color. Match the existing assets in `src/assets/img/` rather than introducing new formats.
- WebP/AVIF are nice-to-haves, not requirements — don't add build dependencies just for them.

## 3. File placement and naming

- Put files in `src/assets/img/` and import them (`import Foo from "../assets/img/img_foo.jpeg"`) — CRA handles hashing/caching. Don't use `public/` for content images.
- Follow the existing `img_name.jpeg` kebab-case convention.

## 4. Rendering practices (Tailwind components)

- **`loading="lazy"` for anything below the fold.** Only above-the-fold heroes load eagerly — when you do, add a comment saying why (see the About Me image in `Section1.jsx`).
- **Always write a descriptive `alt`.**
- **Full-bleed cards** (image fills a rounded container): position the image `absolute inset-0 w-full h-full object-cover` inside a `relative overflow-hidden rounded-xl` parent. This survives any container size.
- **Mind the crop.** When the container's aspect differs from the image's, `object-cover` centers vertically by default — which often cuts off heads. Set the focal point explicitly: `object-[center_32%]` (x-center, y-focal). Pick the y value from where the subject actually is in the image (step 1). For short/wide strips this matters a lot.
- Keep radii consistent with the design system: `rounded-lg` / `rounded-xl` for cards.
- Fixed-aspect alternatives (`aspect-[3/2]` with a plain `w-full h-full` img) are fine when the image should drive the container's height instead of matching a sibling.

## 5. Cleanup and verification

- When **replacing** an image, remove its import and any constants that reference it; ask before deleting the old asset file from `src/assets/img/` (it may be reused later).
- After changing assets or components, run `npm run build` and confirm it compiles.
- The dev server (`npm start`) hot-reloads assets — a quick browser check beats assumptions about how a crop landed.
