var successQuote = false
var onlineQuoteUrl = "./json/anyway.quote.json"

updateQuote = function(quote, author, episode, source, url) {
	$("p.quote").text(quote)
	$("span.author").text(author)
	if ( source != "") {
		$("span.source").css('display','inline')
		$("a.source-link").text(source)
		$(".source-episode").text(episode)
		$("a.source-link").attr('href',url)
	}
}

var localQuote = function() {
	$.getJSON('./json/local-quotes.json', function(data) {
		var x = Math.round(Math.random()*(data.length-2)) + 1
		var author = data[x][0]
		var quote = data[x][1]
		var episode = data[x][2]
		var source = data[x][3]
		var url = data[x][4]
		updateQuote(quote, author, episode, source, url)
	})
}

var liveCheck = function() {
	$.getJSON(onlineQuoteUrl, function(data) {
		successQuote = true
		var x = Math.round(Math.random()*(data.length-2)) + 1
		var author = data[x][0]
		var quote = data[x][1]
		var episode = data[x][2]
		var source = data[x][3]
		var url = data[x][4]
		updateQuote(quote, author, episode, source, url)
		
		$("footer").css('display','block')
		$(".latest-link").attr('href',data[0][2])
		$(".latest-episode").text(data[0][0])
		$(".latest-title").text(data[0][1])
		var now = new Date()
		nowDays = countDays($.format.date( now, "yyyy"),$.format.date( now, "M"),$.format.date( now, "d"))
		latestDays = countDays(data[0][3],data[0][4],data[0][5])
		var daysBetween =  nowDays - latestDays
		if (daysBetween < 3) {
			displayDays = "就这两天更新的！满意了吧！"
		}
		else if ( daysBetween < 6) {
			displayDays = "Anyway.FM  最新一期是 "+ daysBetween + " 天前更新的："
		}
		else if ( daysBetween < 9) {
			displayDays = "下面这期已经发布一周了，我们的安妮薇邮报应该快发行新一期了哟~"
		}
		else if ( daysBetween < 11) {
			displayDays = "我也知道有快十天没更新了，求别催了！这上一期再随便听听吧！"
		}
		else if ( daysBetween < 12) {
			displayDays = "再等等……再等等，应该快更了……"
		}
		else if ( daysBetween < 16) {
			displayDays = "我知道你等不及了……这次他俩肯定又偷懒了"
		}
		else if ( daysBetween < 21) {
			displayDays = "这都快三个礼拜了，等不及了可以发邮件给他们问问看"
		}
		else {
			displayDays = "距离上次更新整整 " + daysBetween + " 天了，JJ 和 Leon 难道挂了"
		}
		$(".days-between").text( displayDays )
		if ( daysBetween < 4 ) {
			$(".new-badge").css('display','inline')
		}
	})
}

countDays = function(y,m,d) {
	var days = (parseInt(y) - 1) * 365
	switch(parseInt(m)){
		case 1: days += 0
		break
		case 2: days += 31
		break
		case 3: days +=59
		break
		case 4: days += 90
		break
		case 5: days += 120
		break
		case 6: days += 151
		break
		case 7: days += 181
		break
		case 8: days += 212
		break
		case 9: days += 243
		break
		case 10: days += 273
		break
		case 11: days += 304
		break
		case 12: days += 334
		break
	}
	days += parseInt(d)
	console.log(days)
	return days
}

setTimeout(function() {
    if ( !successQuote ){
    	localQuote()
        console.log("Load Local Quote")
    }
}, 700)

$(window).load(function() {
	liveCheck()
})