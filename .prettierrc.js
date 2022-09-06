module.exports = {
  overrides: [
    {
      files: "website/articles/**/*.{md,mdx}",
      options: {
        printWidth: 60,
      },
    },
    {
      files: "website/i18n/**/*.{md,mdx}",
      options: {
        printWidth: 60,
      },
    },
  ],
};
