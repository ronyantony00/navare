'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Script from 'next/script';
import type { SolutionCard } from '@/components/molecules/LandingPageServiceSection/LandingPageServiceSection';
import NavarePlatformCard from '@/components/molecules/NavarePlatformCard/NavarePlatformCard';
import { buildPlatformCards } from '@/components/organisms/NavarePlatformAnimation/buildPlatformCards';
import './NavarePlatformAnimation.css';

interface NavarePlatformAnimationProps {
  solutionSectionCard?: SolutionCard[];
}

export default function NavarePlatformAnimation({ solutionSectionCard }: NavarePlatformAnimationProps) {
  const cards = useMemo(
    () => buildPlatformCards(solutionSectionCard),
    [solutionSectionCard],
  );
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(0);

  useEffect(() => {
    const DESIGN_W = 1185;
    const DESIGN_H = 600;
    const viewport = viewportRef.current;
    const stage = stageRef.current;

    if (!viewport || !stage) return;

    function fitStage() {
      if (!viewport || !stage) return;
      const width = viewport.clientWidth || window.innerWidth;
      const scale = width / DESIGN_W;
      stage.style.transform = `scale(${scale})`;
      viewport.style.height = `${DESIGN_H * scale}px`;
    }
    fitStage();
    window.addEventListener('resize', fitStage, { passive: true });

    // GSAP logic
    let timelineAnimations: any[] = [];
    const w = window as any;
    if (scriptsLoaded === 2 && w.gsap && w.MotionPathPlugin && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const gsap = w.gsap;
      const MotionPathPlugin = w.MotionPathPlugin;
      gsap.registerPlugin(MotionPathPlugin);
      const REFERENCE_ROUTE_SECONDS = 5;
      const referencePath = document.querySelector("#circuit-navbridge-quote") as SVGGeometryElement;
      const referenceSpeed = referencePath ? referencePath.getTotalLength() / REFERENCE_ROUTE_SECONDS : 0;
      const dots = Array.from(document.querySelectorAll('.flow-dot'));

      dots.forEach((dot: any) => {
        const pathSelector = dot.dataset.motionPath;
        const path = pathSelector ? document.querySelector(pathSelector) as SVGGeometryElement : null;
        if (!path) return;

        const delay = Number(dot.dataset.delay || 0);
        const duration = referenceSpeed > 0 ? path.getTotalLength() / referenceSpeed : REFERENCE_ROUTE_SECONDS;
        const tl = gsap.timeline({ repeat: -1, delay })
          .set(dot, { autoAlpha: 1 })
          .to(dot, {
            duration,
            ease: 'none',
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 0,
              end: 1
            }
          })
          .set(dot, { autoAlpha: 0 });
        timelineAnimations.push(tl);
      });
    }

    return () => {
      window.removeEventListener('resize', fitStage);
      timelineAnimations.forEach(tl => tl.kill());
    };
  }, [scriptsLoaded]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"
        onLoad={() => setScriptsLoaded(prev => prev + 1)}
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MotionPathPlugin.min.js"
        onLoad={() => setScriptsLoaded(prev => prev + 1)}
        strategy="lazyOnload"
      />
      <div className="viewport" id="viewport" ref={viewportRef}>
        <div aria-label="Navare platform products" className="stage" id="stage" ref={stageRef}>
          <div className="design" id="design">
            <svg aria-hidden="true" className="circuit" preserveAspectRatio="none" viewBox="0 0 872 387">
              <path d="M49 330 H-10 V230.5 H433.5" id="circuit-navscan-middle" />
              <path d="M161 161.8 H50 V230.5" id="circuit-cms-junction" />
              <path d="M475 230 V137 H920 V42 H795" id="circuit-top-wave-tms" />
              <path d="M564 200 H509.5 V81" id="circuit-navbridge-quote" />
              <polygon className="diamond" points="509.5,126.5 520,137 509.5,147.5 499,137" />
              <circle className="flow-dot" cx="0" cy="0" data-motion-path="#circuit-navscan-middle" data-delay="0" r="2.2" />
              <circle className="flow-dot" cx="0" cy="0" data-motion-path="#circuit-navscan-middle" data-delay="2.5" r="2.2" />
              <circle className="flow-dot" cx="0" cy="0" data-motion-path="#circuit-cms-junction" data-delay="0" r="2.2" />
              <circle className="flow-dot" cx="0" cy="0" data-motion-path="#circuit-top-wave-tms" data-delay="0" r="2.2" />
              <circle className="flow-dot" cx="0" cy="0" data-motion-path="#circuit-top-wave-tms" data-delay="1.666667" r="2.2" />
              <circle className="flow-dot" cx="0" cy="0" data-motion-path="#circuit-top-wave-tms" data-delay="3.333333" r="2.2" />
              <circle className="flow-dot" cx="0" cy="0" data-motion-path="#circuit-navbridge-quote" data-delay="0" r="2.2" />
            </svg>
            <img alt="" className="decor quote" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTkwIiB2aWV3Qm94PSIwIDAgODAgMTkwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjY1IiByPSIzNC41IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTYyMF8xNzY0KSIgc3Ryb2tlPSIjMEQzMTI0Ii8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNjUiIHI9IjM5LjUiIHN0cm9rZT0iIzBBMUUxOCIvPgo8cGF0aCBkPSJNNDguNSA3Ny43NUM0Ni45MTY3IDc3Ljc1IDQ1LjUgNzcuMjcwOCA0NC4yNSA3Ni4zMTI1QzQzIDc1LjM1NDIgNDIuMjUgNzQuMzU0MiA0MiA3My4zMTI1QzQxLjc5MTcgNzIuMjcwOCA0MS42ODc1IDcxLjI3MDggNDEuNjg3NSA3MC4zMTI1QzQxLjY4NzUgNjkuMjI5MiA0MS44MzMzIDY3Ljg5NTggNDIuMTI1IDY2LjMxMjVDNDIuNDU4MyA2NC43MjkyIDQyLjg1NDIgNjMuMzEyNSA0My4zMTI1IDYyLjA2MjVDNDMuNzI5MiA2MC45Mzc1IDQ0LjI3MDggNTkuNzI5MiA0NC45Mzc1IDU4LjQzNzVDNDUuNjA0MiA1Ny4xNDU4IDQ2LjIwODMgNTYuMDgzMyA0Ni43NSA1NS4yNUM0Ni43OTE3IDU1LjIwODMgNDcuMzEyNSA1NC4zOTU4IDQ4LjMxMjUgNTIuODEyNUw0OS4zNzUgNTEuMzEyNUw1Mi44NzUgNTMuMjVDNDkuODc1IDU3LjU0MTcgNDguMzc1IDYxLjI1IDQ4LjM3NSA2NC4zNzVDNDkuNSA2NC4zNzUgNTAuNTgzMyA2NC42NDU4IDUxLjYyNSA2NS4xODc1QzUyLjY2NjcgNjUuNzI5MiA1My41IDY2LjUgNTQuMTI1IDY3LjVDNTQuNzkxNyA2OC40NTgzIDU1LjEyNSA2OS41ODMzIDU1LjEyNSA3MC44NzVDNTUuMTI1IDcyLjc5MTcgNTQuNDU4MyA3NC40MTY3IDUzLjEyNSA3NS43NUM1MS44MzMzIDc3LjA4MzMgNTAuMjkxNyA3Ny43NSA0OC41IDc3Ljc1Wk0yNy44NzUgNzcuNjI1QzI2LjI5MTcgNzcuNjI1IDI0Ljg3NSA3Ny4xNDU4IDIzLjYyNSA3Ni4xODc1QzIyLjM3NSA3NS4yMjkyIDIxLjYyNSA3NC4yMjkyIDIxLjM3NSA3My4xODc1QzIxLjE2NjcgNzIuMTQ1OCAyMS4wNjI1IDcxLjE0NTggMjEuMDYyNSA3MC4xODc1QzIxLjA2MjUgNjkuMTA0MiAyMS4yMDgzIDY3Ljc3MDggMjEuNSA2Ni4xODc1QzIxLjgzMzMgNjQuNjA0MiAyMi4yMjkyIDYzLjE4NzUgMjIuNjg3NSA2MS45Mzc1QzIzLjEwNDIgNjAuODEyNSAyMy42NDU4IDU5LjYwNDIgMjQuMzEyNSA1OC4zMTI1QzI0Ljk3OTIgNTcuMDIwOCAyNS41ODMzIDU1Ljk1ODMgMjYuMTI1IDU1LjEyNUMyNi4xNjY3IDU1LjA4MzMgMjYuNjg3NSA1NC4yNzA4IDI3LjY4NzUgNTIuNjg3NUwyOC43NSA1MS4xODc1TDMyLjI1IDUzLjEyNUMyOS4yNSA1Ny40MTY3IDI3Ljc1IDYxLjEyNSAyNy43NSA2NC4yNUMyOC44NzUgNjQuMjUgMjkuOTU4MyA2NC41MjA4IDMxIDY1LjA2MjVDMzIuMDQxNyA2NS42MDQyIDMyLjg3NSA2Ni4zNzUgMzMuNSA2Ny4zNzVDMzQuMTY2NyA2OC4zMzMzIDM0LjUgNjkuNDU4MyAzNC41IDcwLjc1QzM0LjUgNzIuNjY2NyAzMy44MzMzIDc0LjI5MTcgMzIuNSA3NS42MjVDMzEuMjA4MyA3Ni45NTgzIDI5LjY2NjcgNzcuNjI1IDI3Ljg3NSA3Ny42MjVaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMTYyMF8xNzY0KSIvPgo8cGF0aCBkPSJNMzkuNSA5MEM0Ni41MjgyIDkwIDUzLjI2ODYgODcuMjA4IDU4LjIzODMgODIuMjM4M0M2My4yMDggNzcuMjY4NiA2NiA3MC41MjgyIDY2IDYzLjVDNjYgNTYuNDcxOCA2My4yMDggNDkuNzMxNCA1OC4yMzgzIDQ0Ljc2MTdDNTMuMjY4NiAzOS43OTIgNDYuNTI4MiAzNyAzOS41IDM3TDM5LjUgMzguNTc4NUM0Ni4xMDk2IDM4LjU3ODUgNTIuNDQ4NSA0MS4yMDQyIDU3LjEyMjEgNDUuODc3OUM2MS43OTU4IDUwLjU1MTYgNjQuNDIxNSA1Ni44OTA0IDY0LjQyMTUgNjMuNUM2NC40MjE1IDcwLjEwOTYgNjEuNzk1OCA3Ni40NDg1IDU3LjEyMjEgODEuMTIyMUM1Mi40NDg1IDg1Ljc5NTggNDYuMTA5NiA4OC40MjE1IDM5LjUgODguNDIxNUwzOS41IDkwWiIgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzE2MjBfMTc2NCkiLz4KPHBhdGggZD0iTTM5LjUgMzdDMzIuNDcxOCAzNyAyNS43MzE0IDM5Ljc5MiAyMC43NjE3IDQ0Ljc2MTdDMTUuNzkyIDQ5LjczMTQgMTMgNTYuNDcxOCAxMyA2My41QzEzIDcwLjUyODIgMTUuNzkyIDc3LjI2ODYgMjAuNzYxNyA4Mi4yMzgzQzI1LjczMTQgODcuMjA4IDMyLjQ3MTggOTAgMzkuNSA5MEwzOS41IDg4LjQyMTVDMzIuODkwNCA4OC40MjE1IDI2LjU1MTUgODUuNzk1OCAyMS44Nzc5IDgxLjEyMjFDMTcuMjA0MiA3Ni40NDg0IDE0LjU3ODUgNzAuMTA5NiAxNC41Nzg1IDYzLjVDMTQuNTc4NSA1Ni44OTA0IDE3LjIwNDIgNTAuNTUxNSAyMS44Nzc5IDQ1Ljg3NzlDMjYuNTUxNSA0MS4yMDQyIDMyLjg5MDQgMzguNTc4NSAzOS41IDM4LjU3ODVMMzkuNSAzN1oiIGZpbGw9InVybCgjcGFpbnQzX2xpbmVhcl8xNjIwXzE3NjQpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTYyMF8xNzY0IiB4MT0iNDAiIHkxPSIzMCIgeDI9IjQwIiB5Mj0iMTAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMxMjMxMjgiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDYxODEyIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8xNjIwXzE3NjQiIHgxPSIzOCIgeTE9IjU0IiB4Mj0iMzgiIHkyPSI4MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMkVEOTYwIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzBGNTQyMyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfMTYyMF8xNzY0IiB4MT0iNTMuMDIwNCIgeTE9Ijg3LjgzNjciIHgyPSI0MS4xMjI0IiB5Mj0iNDAuMjQ0OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMkVEOTYwIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzBCMzcxOCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50M19saW5lYXJfMTYyMF8xNzY0IiB4MT0iMjUuOTc5NiIgeTE9IjM5LjE2MzMiIHgyPSIzNy44Nzc2IiB5Mj0iODYuNzU1MSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMkVEOTYwIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzBCMzcxOCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=" />
            <img alt="" className="decor waves" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjM4IiBoZWlnaHQ9IjI2NSIgdmlld0JveD0iMCAwIDIzOCAyNjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02MS4xOTIzIDE5MC41MzZDNzMuNTkyMyAxOTcuNzM2IDg3LjM1OSAxODYuMjAzIDkyLjY5MjMgMTc5LjUzNkMxMDAuNDk5IDE3MS41IDEyMy44OTIgMTY2LjMzNSAxNDIuNjkyIDE3OS41MzZDMTY2LjE5MiAxOTYuMDM3IDE2OC45OTkgMTg5LjY1NyAxNzguMTkyIDE4Ny41MzVDMTgzLjk5OSAxODYuMTk1IDE5My42OTIgMTY5LjAzNiAxODUuMTkyIDE1Ni41MzZDMTc2LjY5MiAxNDQuMDM2IDE1OS4xOTIgMTQzLjAzNiAxNTAuMTkyIDE1MS41MzZDMTQyLjk5MiAxNTguMzM2IDEzMy4xOTIgMTYzLjAzNiAxMjkuMTkyIDE2NC41MzZDMTE4Ljk5OSAxNjguMzU4IDEwMS45OTkgMTY2IDkyLjY5MjMgMTU4LjUzNkM4NS41MDgzIDE1Mi43NzUgNzkuNTI1NiAxNDcuNzAzIDc2LjE5MjMgMTQ3LjAzNkM1Ny4zOTIzIDE0My40MzYgNDkuNjkyMyAxNTcuMjAzIDQ4LjE5MjMgMTY0LjUzNkM0Ny4zNTkgMTcwLjIwMyA0OC43OTIzIDE4My4zMzYgNjEuMTkyMyAxOTAuNTM2WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzE2MjBfMTc2MykiIHN0cm9rZT0iIzI5NTAzNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMDkuMTkyIDE0My41MzZDMTIxLjU5MiAxNTAuNzM2IDEzNS4zNTkgMTM5LjIwMyAxNDAuNjkyIDEzMi41MzZDMTQ4LjQ5OSAxMjQuNSAxNzEuODkyIDExOS4zMzUgMTkwLjY5MiAxMzIuNTM2QzIxNC4xOTIgMTQ5LjAzNyAyMTYuOTk5IDE0Mi42NTcgMjI2LjE5MiAxNDAuNTM1QzIzMS45OTkgMTM5LjE5NSAyNDEuNjkyIDEyMi4wMzYgMjMzLjE5MiAxMDkuNTM2QzIyNC42OTIgOTcuMDM2NSAyMDcuMTkyIDk2LjAzNjUgMTk4LjE5MiAxMDQuNTM2QzE5MC45OTIgMTExLjMzNiAxODEuMTkyIDExNi4wMzYgMTc3LjE5MiAxMTcuNTM2QzE2Ni45OTkgMTIxLjM1OCAxNDkuOTk5IDExOSAxNDAuNjkyIDExMS41MzZDMTMzLjUwOCAxMDUuNzc1IDEyNy41MjYgMTAwLjcwMyAxMjQuMTkyIDEwMC4wMzZDMTA1LjM5MiA5Ni40MzYxIDk3LjY5MjMgMTEwLjIwMyA5Ni4xOTIzIDExNy41MzZDOTUuMzU5IDEyMy4yMDMgOTYuNzkyMyAxMzYuMzM2IDEwOS4xOTIgMTQzLjUzNloiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl8xNjIwXzE3NjMpIiBzdHJva2U9IiMyOTUwMzQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9kXzE2MjBfMTc2MykiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMzIDE0OCkiPgo8cGF0aCBkPSJNNzYuMTkyMyA4OS41MzYxQzg4LjU5MjMgOTYuNzM2MSAxMDIuMzU5IDg1LjIwMjggMTA3LjY5MiA3OC41MzYxQzExNS40OTkgNzAuNSAxMzguODkyIDY1LjMzNTMgMTU3LjY5MiA3OC41MzYxQzE4MS4xOTIgOTUuMDM3IDE4NC40OTkgODkgMTkzLjE5MiA4Ni41MzUyQzE5OC45MjYgODQuOTA5NCAyMDguNjkyIDY4LjAzNjQgMjAwLjE5MiA1NS41MzY1QzE5MS42OTIgNDMuMDM2NSAxNzQuMTkyIDQyLjAzNjUgMTY1LjE5MiA1MC41MzY1QzE1Ny45OTIgNTcuMzM2NSAxNDguMTkyIDYyLjAzNjIgMTQ0LjE5MiA2My41MzYxQzEzMy45OTkgNjcuMzU4MiAxMTYuOTk5IDY1IDEwNy42OTIgNTcuNTM2NUMxMDAuNTA4IDUxLjc3NTQgOTQuNTI1NiA0Ni43MDI5IDkxLjE5MjMgNDYuMDM2MUM3Mi4zOTIzIDQyLjQzNjEgNjQuNjkyMyA1Ni4yMDI4IDYzLjE5MjMgNjMuNTM2MUM2Mi4zNTkgNjkuMjAyOCA2My43OTIzIDgyLjMzNjEgNzYuMTkyMyA4OS41MzYxWiIgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzE2MjBfMTc2MykiLz4KPHBhdGggZD0iTTc2LjE5MjMgODkuNTM2MUM4OC41OTIzIDk2LjczNjEgMTAyLjM1OSA4NS4yMDI4IDEwNy42OTIgNzguNTM2MUMxMTUuNDk5IDcwLjUgMTM4Ljg5MiA2NS4zMzUzIDE1Ny42OTIgNzguNTM2MUMxODEuMTkyIDk1LjAzNyAxODQuNDk5IDg5IDE5My4xOTIgODYuNTM1MkMxOTguOTI2IDg0LjkwOTQgMjA4LjY5MiA2OC4wMzY0IDIwMC4xOTIgNTUuNTM2NUMxOTEuNjkyIDQzLjAzNjUgMTc0LjE5MiA0Mi4wMzY1IDE2NS4xOTIgNTAuNTM2NUMxNTcuOTkyIDU3LjMzNjUgMTQ4LjE5MiA2Mi4wMzYyIDE0NC4xOTIgNjMuNTM2MUMxMzMuOTk5IDY3LjM1ODIgMTE2Ljk5OSA2NSAxMDcuNjkyIDU3LjUzNjVDMTAwLjUwOCA1MS43NzU0IDk0LjUyNTYgNDYuNzAyOSA5MS4xOTIzIDQ2LjAzNjFDNzIuMzkyMyA0Mi40MzYxIDY0LjY5MjMgNTYuMjAyOCA2My4xOTIzIDYzLjUzNjFDNjIuMzU5IDY5LjIwMjggNjMuNzkyMyA4Mi4zMzYxIDc2LjE5MjMgODkuNTM2MVoiIHN0cm9rZT0iIzI5NTAzNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8xNjIwXzE3NjMiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMTAuNTI1IiBoZWlnaHQ9IjExNi44MiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR4PSItMjgiIGR5PSItMTAiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTcuMjUiLz4KPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0ib3V0Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTYyMF8xNzYzIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzE2MjBfMTc2MyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzE2MjBfMTc2MyIgeDE9IjEzMS42OTIiIHkxPSIxODAuMDM1IiB4Mj0iMTM0LjE5MiIgeTI9IjE1Ni4wMzUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzJDNkYzMiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxNTNCMkIiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzE2MjBfMTc2MyIgeDE9IjE3OS42OTIiIHkxPSIxMzMuMDM1IiB4Mj0iMTgyLjE5MiIgeTI9IjEwOS4wMzUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzJDNkYzMiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxNTNCMkIiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzE2MjBfMTc2MyIgeDE9IjE0Ni42OTIiIHkxPSI3OS4wMzUyIiB4Mj0iMTQ5LjE5MiIgeTI9IjU1LjAzNTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzJDNkYzMiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxNTNCMkIiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K" />

            {cards.map((card) => (
              <NavarePlatformCard
                key={card.variant}
                ariaLabel={card.ariaLabel}
                description={card.description}
                href={card.href}
                logo={card.logo}
                logoAlt={card.logoAlt}
                title={card.title}
                variant={card.variant}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
