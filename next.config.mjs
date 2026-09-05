import path from 'path';

/** @type {import('next').NextOpenConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
