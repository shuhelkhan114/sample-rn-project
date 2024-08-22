module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: '.',
          alias: {
            '~/assets': './src/assets',
            '~/components': './src/components',
            '~/context': './src/context',
            '~/core': './src/core',
            '~/hooks': './src/hooks',
            '~/navigation': './src/navigation',
            '~/screens': './src/screens',
            '~/modules': './src/modules',
            '~/typings': './src/typings',
            '~/models': './src/models',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
