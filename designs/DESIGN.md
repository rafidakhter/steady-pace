# Kinetic Mono Design System

### 1. Overview & Creative North Star
**Creative North Star: "The Brutalist Performance Lab"**

Kinetic Mono is a high-performance design system built for clarity, speed, and athletic precision. It eschews the "bubbled" softness of modern SaaS in favor of a sharp, technical aesthetic inspired by digital stopwatches and editorial sports journals. The system prioritizes high-contrast typography and asymmetric layout structures to guide the eye through complex training data without visual clutter. It is "Digital Brutalism" refined for a premium, intentional user experience.

### 2. Colors
Kinetic Mono uses a high-contrast palette anchored by "High-Vis Green" and deep monochromatic tones.

- **Primary Role:** The #5ce33b (Primary) is reserved exclusively for action and progress. It is the "Active" state of the system.
- **The "No-Line" Rule:** Sectioning is achieved through color blocks (`surface_container`) or high-contrast structural markers (like the 2px left border for "Main Sets"). Avoid 1px borders; use a shift from `#ffffff` to `#f7f7f7` to define regions.
- **Surface Hierarchy:** 
    - `surface`: The base canvas (Pure White).
    - `surface_container`: Used for secondary information blocks (e.g., Warmup/Cooldown).
    - `surface_container_high`: Used for subtle dividers or UI accents (`accent`).
- **Signature Textures:** Utilize the `bg-gradient-to-t` from white to transparent on sticky footers to create a "floating" effect for CTAs without hard lines.

### 3. Typography
The system uses a dual-font strategy: **Space Grotesk** for structural technical data and **Satoshi (Inter-style)** for high-readability body text.

**Typography Scale:**
- **Display (32px / 2rem):** Space Grotesk Semibold. Used for primary page titles. Tight leading (1.1) for a condensed, impactful look.
- **Headline (1.125rem):** Space Grotesk Bold. Used for interval metrics and "Race Pace" highlights.
- **Body (1rem / 0.875rem):** Satoshi/Inter. Used for instructional text and descriptions.
- **Label (0.75rem):** Space Grotesk Bold, Uppercase, Tracking-widest. Used for category headers and meta-data (e.g., "WARMUP", "45 MIN").

### 4. Elevation & Depth
Depth is created through "Tonal Stacking" rather than elevation shadows.

- **The Layering Principle:** Layering `surface_container` on top of `surface` provides sufficient hierarchy.
- **Ambient Shadows:** The system uses a single, extremely subtle shadow (`shadow-sm`) specifically for the primary sticky CTA to ensure it clears the background content.
- **The "Structural Line":** When emphasis is needed, use a 2px solid vertical stroke (`on_surface`) to denote "Current" or "Focus" states, breaking the horizontal rhythm of the page.
- **Glassmorphism:** Use `backdrop-blur-md` with `white/90` for sticky headers to maintain a sense of place while scrolling.

### 5. Components
- **Buttons:** Sharp 0px or 2px (`rounded-sm`) corners. Primary buttons use the seed color with a heavy uppercase label.
- **Interval Blocks:** Large containers with `surface_container` background and `p-5` padding. No borders.
- **Status Markers:** Use uppercase labels with high letter-spacing (`tracking-widest`) to denote session types or phases.
- **Sticky Footer:** A full-width CTA anchored to the bottom, protected by a white-to-transparent gradient mask.

### 6. Do's and Don'ts
- **Do:** Use uppercase for technical data labels.
- **Do:** Maintain generous vertical spacing (`space-y-6` or `space-y-8`) to allow the high-contrast type to breathe.
- **Don't:** Use rounded pill shapes for buttons; keep them architectural and sharp.
- **Don't:** Use gray text for primary instructions. If it's the "Work," it must be `on_surface` (Black).
- **Do:** Use asymmetric accents (like left-borders) to highlight the most important part of a sequence.