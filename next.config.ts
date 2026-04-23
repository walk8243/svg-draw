import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const createConfig = (phase: string, { defaultConfig }: { defaultConfig: NextConfig }): NextConfig => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...defaultConfig,
      experimental: {},
    };
  }

  return {
    ...defaultConfig,
    output: 'export',
    basePath: '/svg-draw',
    trailingSlash: true,
    distDir: 'docs',
    experimental: {},
  };
};

export default createConfig;
