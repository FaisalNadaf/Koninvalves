/** @format */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useMouseParallax } from "../../lib/useParallax";

/**
 * Background footage — an industrial plant, from Mixkit's free stock library
 * (Mixkit Stock Video Free License: commercial use, no attribution required).
 *
 * 8.4 MB, so it is loaded on strict terms: never before the page has settled,
 * never under `prefers-reduced-motion`, never on a narrow screen where the crop
 * shows almost nothing and the visitor is most likely on mobile data, and never
 * when the browser reports Save-Data.
 *
 * NOTE: there is no still behind it, so everyone excluded above gets the
 * graded gradient and the blueprint grid alone — no photograph. Re-adding an
 * <Img> as the first child of the plate would restore one for them.
 */
const VIDEO = "/video/plant-loop.mp4";

/** Published figures, kept short enough to sit on one line of the hero. */
const PROOF = [
	{ value: "100%", label: "Pressure tested" },
	{ value: "12+", label: "Quality checks" },
	{ value: "−101°C", label: "Impact tested" },
	{ value: "45+", label: "Products & systems" },
] as const;

export default function Hero() {
	const ref = useRef<HTMLElement>(null);
	const reduce = useReducedMotion();
	const mouse = useMouseParallax();
	const [showVideo, setShowVideo] = useState(false);
	const [videoReady, setVideoReady] = useState(false);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	// The plate sinks slower than the page; the copy rises out ahead of it.
	const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
	const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
	const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
	const copyFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

	useEffect(() => {
		if (reduce) return;
		if (!window.matchMedia("(min-width: 768px)").matches) return;
		const conn = (
			navigator as Navigator & { connection?: { saveData?: boolean } }
		).connection;
		if (conn?.saveData) return;
		// Well clear of the Largest Contentful Paint: the still is already on
		// screen, so nothing the video does can hold the first render back.
		const id = setTimeout(() => setShowVideo(true), 1400);
		return () => clearTimeout(id);
	}, [reduce]);

	const px = reduce ? 0 : mouse.x;

	return (
		<section
			ref={ref}
			aria-labelledby="hero-title"
			/* svh rather than vh: on a phone `100vh` is the address-bar-collapsed
         height, which leaves the foot of the hero cut off until the visitor
         scrolls. */
			className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-canvas">
			{/* ---------- Plane 0 · the plant ---------- */}
			<motion.div
				aria-hidden="true"
				style={{
					y: reduce ? 0 : plateY,
					scale: reduce ? 1 : plateScale,
					x: px * 18,
				}}
				className="absolute inset-0 -z-20">
				{showVideo && (
					<video
						className="absolute inset-0 size-full object-cover transition-opacity duration-1600 ease-out-expo"
						style={{ opacity: videoReady ? 1 : 0 }}
						autoPlay
						muted
						loop
						playsInline
						preload="none"
						onCanPlay={() => setVideoReady(true)}
						aria-hidden="true"
						tabIndex={-1}>
						<source
							src={VIDEO}
							type="video/mp4"
						/>
					</video>
				)}
			</motion.div>

			{/* ---------- Plane 1 · grading ----------
          The wash is focused on the copy rather than spread over the whole
          plate. A flat 45% white across the full frame was bleaching the
          footage to a milky still; instead the white is concentrated in an
          ellipse behind the headline — dense enough at the centre to carry a
          near-black headline and steel body copy — and falls away to nothing
          well before the edges, so the plant stays a visible, moving
          photograph on both sides of the column. */}
			<span
				aria-hidden="true"
				className="absolute inset-0 -z-10 bg-white/16 sm:bg-white/8"
			/>
			<span
				aria-hidden="true"
				className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_62%_62%_at_50%_45%,rgba(255,255,255,0.95),rgba(255,255,255,0.86)_30%,rgba(255,255,255,0.55)_55%,rgba(255,255,255,0.16)_74%,transparent_88%)]"
			/>
			{/* Nav legibility at the top, and a clean hand-off to the page below */}
			<span
				aria-hidden="true"
				className="absolute inset-x-0 top-0 -z-10 h-44 bg-linear-to-b from-white via-white/55 to-transparent"
			/>
			<span
				aria-hidden="true"
				className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-linear-to-t from-canvas via-canvas/70 to-transparent"
			/>
			{/* Brand wash — the corners the white no longer reaches are pulled a few
          degrees toward KONIN blue rather than left raw */}
			<span
				aria-hidden="true"
				className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_10%_14%,rgba(30,134,214,0.16),transparent_60%),radial-gradient(ellipse_55%_50%_at_90%_88%,rgba(23,171,223,0.18),transparent_58%)]"
			/>
			<span
				aria-hidden="true"
				className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40 mask-fade-radial"
			/>

			{/* ---------- Content ---------- */}
			<motion.div
				style={{ y: reduce ? 0 : copyY, opacity: reduce ? 1 : copyFade }}
				className="relative container-k flex flex-1 flex-col items-center justify-center pt-[calc(var(--nav-h)+2rem)] pb-24 text-center sm:pt-[calc(var(--nav-h)+3rem)] sm:pb-28">
				{/* Locator strip */}
				<div
					className="anim-fade flex flex-wrap items-center justify-center gap-2.5"
					style={{ animationDelay: "60ms" }}>
					<span className="eyebrow eyebrow-muted">
						{/* <ShieldCheck className="size-3.5" aria-hidden="true" /> */}
						ISO 9001:2015
					</span>
					<span className="eyebrow eyebrow-muted">
						Belagavi · Karnataka · India
					</span>
				</div>

				{/*
          The headline animates in CSS, not JavaScript: a JS-driven reveal
          renders opacity:0 into the pre-rendered HTML, which delays the
          Largest Contentful Paint until hydration.

          It also rises rather than being revealed from behind a clip. A line
          translated fully outside an overflow-hidden box paints nothing, so the
          LCP heuristic does not see the headline until the animation has
          played. Clipped line reveals are used everywhere below the fold, where
          they cost nothing.
        */}
				{/*
          Sized for a centred two-line headline rather than by the global
          `.h-hero` scale, which was cut for a left-aligned three-line block: at
          1440 that clamp resolved to ~94 px, which is wider than the column and
          broke every line in the wrong place. The utility wins over the
          component class, so `h-hero` still supplies the family and tracking.
        */}
				<h1
					id="hero-title"
					className="h-hero mx-auto mt-6 max-w-5xl text-[clamp(2.1rem,5vw,4.25rem)] leading-[0.96] text-balance text-ink-900 sm:mt-8">
					<span
						className="anim-fade-up block"
						style={{ animationDelay: "0ms" }}>
						Industrial valves, automation
					</span>
					<span
						className="anim-fade-up block"
						style={{ animationDelay: "110ms" }}>
						&amp; water treatment{" "}
						<span className="text-gradient">solutions</span>
						<span className="text-signal-500">.</span>
					</span>
				</h1>

				<p
					/* A step darker than the site's body colour: the wash behind it is no
             longer near-white, so steel-600 would sit under the contrast floor. */
					className="anim-fade-up mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-steel-700 sm:mt-7 sm:text-[1.0625rem] sm:leading-[1.68]"
					style={{ animationDelay: "340ms" }}>
					KONIN manufactures a complete industrial valve range and delivers
					electrical automation and water treatment solutions — engineered,
					built and supported under one roof in Belagavi, Karnataka.
				</p>

				<div
					className="anim-fade-up mt-8 flex flex-wrap justify-center gap-3 sm:mt-9"
					style={{ animationDelay: "440ms" }}>
					<Link
						to="/products/valves"
						className="btn btn-primary btn-lg group">
						Explore the range
						<ArrowRight
							className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-1"
							aria-hidden="true"
						/>
					</Link>
					<Link
						to="/contact"
						className="btn btn-outline-ink btn-lg group">
						Request a quote
						<ArrowUpRight
							className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							aria-hidden="true"
						/>
					</Link>
				</div>

				{/* Published proof — the figures close the composition on evidence and
            give the centred column a base to sit on. */}
				<dl
					className="anim-fade-up mx-auto mt-10 grid w-full max-w-3xl grid-cols-2 gap-y-6 rounded-2xl border border-white/70 bg-white/70 px-4 py-6 shadow-e2 backdrop-blur-md sm:mt-12 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-steel-200/70 sm:px-2"
					style={{ animationDelay: "540ms" }}>
					{PROOF.map((p) => (
						<div
							key={p.label}
							className="px-2 sm:px-4">
							<dt className="sr-only">{p.label}</dt>
							<dd>
								<span className="block font-display text-[1.5rem] leading-none font-bold text-brand-800 tabular-nums sm:text-[1.875rem]">
									{p.value}
								</span>
								<span className="mt-2 block text-[11px] leading-tight font-medium tracking-wide text-steel-600 sm:text-[11.5px]">
									{p.label}
								</span>
							</dd>
						</div>
					))}
				</dl>
			</motion.div>
		</section>
	);
}
