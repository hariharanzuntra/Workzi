import { useState, useEffect, useCallback, useRef } from "react";

export function useResizableSidebar() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  const [width, setWidth] = useState<number>(() => {
    if (typeof window === "undefined") return 250;
    const saved = localStorage.getItem("sidebar-width");
    const parsed = saved ? parseInt(saved, 10) : 250;
    return Math.max(72, Math.min(340, parsed));
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const lastWidthRef = useRef<number>(width > 72 ? width : 250);

  // Keep track of the last non-collapsed width
  useEffect(() => {
    if (width > 72 && !isHidden) {
      lastWidthRef.current = width;
    }
  }, [width, isHidden]);

  // Persist width when modified (only if not hidden/collapsed below bounds)
  useEffect(() => {
    if (width > 0) {
      localStorage.setItem("sidebar-width", width.toString());
    }
  }, [width]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDesktop || isHidden) return;
      e.preventDefault();
      setIsDragging(true);

      const target = e.currentTarget;
      if (target && typeof target.setPointerCapture === "function") {
        target.setPointerCapture(e.pointerId);
      }
    },
    [isDesktop, isHidden]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();

      // requestAnimationFrame for smooth resizing
      window.requestAnimationFrame(() => {
        const clientX = e.clientX;
        const newWidth = Math.max(72, Math.min(340, clientX));
        setWidth(newWidth);
      });
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      setIsDragging(false);

      const target = e.currentTarget;
      if (target && typeof target.releasePointerCapture === "function") {
        target.releasePointerCapture(e.pointerId);
      }
    },
    [isDragging]
  );

  const toggleSidebar = useCallback(() => {
    setIsHidden((prev) => !prev);
  }, []);

  const toggleCollapse = useCallback(() => {
    setWidth((prev) => {
      if (prev <= 72) {
        return lastWidthRef.current > 72 ? lastWidthRef.current : 250;
      } else {
        return 72;
      }
    });
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + [ -> Collapse to 72px
      if (e.ctrlKey && e.key === "[") {
        e.preventDefault();
        setIsHidden(false);
        setWidth(72);
      }
      // Ctrl + ] -> Expand to 250px (or last non-collapsed width)
      if (e.ctrlKey && e.key === "]") {
        e.preventDefault();
        setIsHidden(false);
        setWidth(lastWidthRef.current > 72 ? lastWidthRef.current : 250);
      }
      // Ctrl + B -> Hide/Show Sidebar
      if (e.ctrlKey && (e.key === "b" || e.key === "B")) {
        e.preventDefault();
        setIsHidden((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Determine current active width based on responsive state
  let currentWidth = width;
  if (isMobile) {
    currentWidth = isHidden ? 0 : 250;
  } else if (isTablet) {
    currentWidth = width <= 160 ? 72 : 250;
  } else {
    currentWidth = isHidden ? 0 : width;
  }

  return {
    width: currentWidth,
    isDragging,
    isCollapsed: isMobile ? isHidden : currentWidth <= 72,
    isHidden: isHidden,
    isMobile,
    isTablet,
    isDesktop,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    toggleSidebar,
    toggleCollapse,
    setWidth,
  };
}
