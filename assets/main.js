const currentDate = new Date()

// var urlToLoad = "http://localhost:7888/anyway/temp/anyway-tab.json"
var urlToLoad = "https://s.anw.red/anyway.tab/anyway-tab.json"
var thisCycleDisplays = localStorage.getItem('thisCycleDisplays')
var lastFetchTime = localStorage.getItem('lastFetchTime')

//第一次使用初始化初始化
if(localStorage.getItem('totalDisplays') === null){
  document.body.classList.add("first-use")
  localStorage.setItem('totalDisplays', 0)
  localStorage.setItem('thisCycleDisplays', 0)
}

if (lastFetchTime === null || (currentDate.getTime() - lastFetchTime) > (1 * 60 * 60 * 1000 ) ){ //拉数据
  getJSON(urlToLoad + "?v=" + currentDate.getTime(), function(err, data){
    if (err !== null){}
    else{
      storeData(data, 'news')
      storeData(data, 'latestEp')
      localStorage.setItem('lastFetchTime', currentDate.getTime())
      localStorage.setItem('thisCycleDisplays', 0)
    }
  })
  if ((currentDate.getTime() - lastFetchTime) > (3 * 60 * 60 * 1000)) {
    renderNews()
    renderLatestEp()
    document.body.classList.add("prepared")
  }
}
else{ //数据不为空时展示数据
  renderNews()
  renderLatestEp()
  document.body.classList.add("prepared")
}

//计数
localStorage.setItem('totalDisplays', parseInt(localStorage.getItem('totalDisplays')) + 1)
localStorage.setItem('thisCycleDisplays', parseInt(localStorage.getItem('thisCycleDisplays')) + 1)

function getJSON(url, callback){
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.onload = function() {
    var status = xhr.status
    if (status === 200) {
      callback(null, xhr.response)
    } else {
      callback(status, xhr.response)
    }
  }
  xhr.send()
}

function storeData(data, name){
  serverData = data[name]
  localStorage.setItem(name, JSON.stringify(serverData))
}

function renderNews(){
  var title = document.querySelector('.news-title')
  var desc = document.querySelector('.desc')
  data = JSON.parse(localStorage.getItem("news"))
  item = data[thisCycleDisplays % data.length]
	document.querySelector('.content').classList.add("news")
	title.innerHTML = item.title
  title.href = item.link
  desc.innerHTML = item.description
}

function renderLatestEp() {
  var latestEpData = JSON.parse(localStorage.getItem("latestEp"))
  var days = (currentDate.getTime() / 1000 - latestEpData.pubtime) / 60 / 60 / 24
  document.querySelector('footer').classList.add("show")
  document.querySelector('.latest-episode').innerHTML = latestEpData.epNumber
  document.querySelector('.latest-title').innerHTML = latestEpData.title
  document.querySelector('.latest-link').href = "https://anyway.fm/" + latestEpData.alias + "/"
  document.querySelector('.days-between').innerHTML = footerWording( days )

  if ( days < 3 ) {
    document.querySelector('.new-badge').classList.add("show")
  }
}

function renderImage(){
  var item = JSON.parse(localStorage.getItem("images"))
}

function footerWording(days){
  var showDays = Math.floor(days)
  var output = ""
  if (days < 2) {
    output = "更了！更了！终于更了！"
  }
  else if (days < 3) {
    output = "前两天刚上新！该满意了吧！"
  }
  else if (days < 6) {
    output = "Anyway.FM 最新一期是 " + showDays + " 天前更新的"
  }
  else if (days < 9) {
    output = "下面这期已经发布一周了，还是看看上面这些链接推荐吧"
  }
  else if (days < 11) {
    output = "我也知道有快十天没更新了，求别催了！这上一期再随便听听吧！"
  }
  else if (days < 12) {
    output = "再等等……再等等……应该快更了……"
  }
  else if (days < 16) {
    output = "我知道你等不及了……这次他俩肯定又偷懒了，唉……"
  }
  else if (days < 21) {
    output = "这都快三个礼拜了，等不及了可以<a href='mailto:hello@anyway.fm'>发邮件</a>给他们问问看"
  }
  else if (days < 60) {
    output = "距离上次更新整整 " + showDays + " 天了，JJ 和 Leon 难道已经挂了……"
  }
  else {
    output = "如果你能看到这条……很有可能天网已经占领地球了……祝你好运吧……"
  }
  return output
}
