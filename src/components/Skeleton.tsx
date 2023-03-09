import React, { CSSProperties, ReactElement, useMemo } from "react";

export interface SkeletonProps {
  maskColor: string;
  animationColorBackground: string;
  animationColorHighlight: string;
  children: (color: string) => ReactElement;
  wrapperStyle?: CSSProperties;
  backgroundStyle?: CSSProperties;
  isDarkMode?: boolean;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = (props: SkeletonProps) => {
  const {
    maskColor,
    animationColorBackground,
    animationColorHighlight,
    children,
    wrapperStyle,
    backgroundStyle,
    isDarkMode,
    className,
  } = props;

  const colorStyle = useMemo(
    () => ({
      "--sr-mask-color": maskColor,
      "--sr-animation-background": animationColorBackground,
      "--sr-animation-highlight": animationColorHighlight,
      "--sr-highlight-filter-bg": isDarkMode ? "#000" : "#fff",
      "--sr-highlight-filter-blend-mode": isDarkMode ? "darken" : "lighten",
      "--sr-background-filter-blend-mode": isDarkMode ? "lighten" : "darken",
    }),
    [maskColor, animationColorBackground, animationColorHighlight, isDarkMode]
  );

  return (
    <div
      className={`sr-skeleton-wrapper ${className ?? ''}`}
      style={{ ...colorStyle, ...wrapperStyle }}
    >
      <div className="sr-skeleton-background" style={backgroundStyle}></div>
      <div className="sr-skeleton-highlight-filter">
        {children(isDarkMode ? "#fff" : "#000")}
      </div>
      <div className="sr-skeleton-background-filter">
        {children(isDarkMode ? "#000" : "#fff")}
      </div>
    </div>
  );
};
