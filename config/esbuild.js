import esbuild from 'esbuild'

esbuild.build({
    entryPoints: ['src/sw.js', 'src/scripts/scrapper.js', 'src/scripts/scrapeProfile.js'],
    watch: true,
    bundle: true,
    outdir: 'dist',
    minify: true,
    allowOverwrite: true
})
    .then(response => console.log(JSON.stringify(response)))
    .catch(err => console.log(err))