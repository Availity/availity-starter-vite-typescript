/** @type {import('@availity/workflow-vite').WorkflowViteConfigFunction} */
export default (config) => {
  config.development.open = '#/?spaceId=48C607A70B5A46A3864A34E2BDDDEA04';

  if (process.argv.includes('--coverage')) {
    config.development.vitestOverrides = {
      ...config.development.vitestOverrides,
      coverage: { enabled: true },
    };
  }

  return config;
};
