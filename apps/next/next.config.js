/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
};

const { withExpo } = require('@expo/next-adapter');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'solito',
  'app',
  '@expo/vector-icons',
]);

const withFonts = require('next-fonts');

module.exports = withPlugins(
  [withTM, withFonts, [withExpo, { projectRoot: __dirname }]],
  nextConfig,
);
