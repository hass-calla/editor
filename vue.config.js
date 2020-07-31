module.exports = {
  "devServer": {
    "proxy": "http://127.0.0.1:3333"
  },
  "outputDir": "../CallaServer/public",
  "indexPath": process.env.NODE_ENV === 'production' ? '../resources/views/index.edge' : 'index.html',
  "transpileDependencies": [
    "vuetify"
  ]
}
