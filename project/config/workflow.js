/** @type {import('@availity/workflow-vite').WorkflowViteConfigFunction} */
export default (config) => {
  // Dev server opens to the configured space
  config.development.open = '#/?spaceId=48C607A70B5A46A3864A34E2BDDDEA04';

  // Proxy API requests to a local mock server or remote environment
  // config.proxies = [
  //   {
  //     context: ['/api'],
  //     target: 'http://localhost:9999',
  //     changeOrigin: true,
  //   },
  // ];

  // Define global constants available in your app code
  // config.globals = {
  //   MY_APP_VERSION: '1.0.0',
  // };

  // Vitest configuration
  config.development.vitestOverrides = {
    ...config.development.vitestOverrides,
    setupFiles: ['project/app/vitest.setup.ts'],
  };

  if (process.argv.includes('--coverage')) {
    config.development.vitestOverrides = {
      ...config.development.vitestOverrides,
      coverage: { enabled: true },
    };
  }

  return config;
};
