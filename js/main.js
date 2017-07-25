var successQuote = false
var onlineQuoteUrl = "./json/anyway.tab.json"

var forceReload = Math.random()
if (forceReload < 0.08) {
	$.ajaxSetup({
	  cache:false
	});
}

updateQuote = function(quote, author, episode, source, url) {
	$("p.quote").html(quote)
	$("span.author").text(author)
	if ( source != "") {
		$("span.source").css('opacity','1')
		$("a.source-link").text(source)
		$(".source-episode").text(episode)
		$("a.source-link").attr('href',url)
	}
}


var localQuote = function() {
	$.getJSON('./json/local.json', function(data) {
		var x = Math.round(Math.random()*(data['quotes'].length-1))
		var author = data['quotes'][x][0]
		var quote = data['quotes'][x][1]
		var episode = data['quotes'][x][2]
		var source = data['episodes'][episode][0]
		var url = data['episodes'][episode][1] + "#title"
		updateQuote(quote, author, episode, source, url)
	})
}

var liveCheck = function() {
	$.getJSON(onlineQuoteUrl, function(data) {
		successQuote = true
		var now = new Date()
		nowDays = countDays($.format.date( now, "yyyy"),$.format.date( now, "M"),$.format.date( now, "d"))
		latestDays = countDays(data['settings']['latest'][1],data['settings']['latest'][2],data['settings']['latest'][3])
		var daysBetween =  nowDays - latestDays
		
		if (
			data['settings']['notifications'][0] 
			&&
			(nowDays - countDays(data['settings']['notifications'][1],data['settings']['notifications'][2],data['settings']['notifications'][3]) <= data['settings']['notifications'][4])
			&&
			Math.random() <= data['settings']['notifications'][5]
		) {
			$("p.quote").html(data['settings']['notifications'][0])
			$("cite.meta").html("")
		}
		else {
			var x = Math.round(Math.random()*(data['quotes'].length-1))
			var author = data['quotes'][x][0]
			var quote = data['quotes'][x][1]
			var episode = data['quotes'][x][2]
			console.log(episode)
			var source = data['episodes'][episode][0]
			var url = data['episodes'][episode][1] + "#title"
			updateQuote(quote, author, episode, source, url)
		}
		
		
		$("footer").css('opacity','1')
		var latestEpisode = data['settings']['latest'][0]
		$(".latest-link").attr('href',data['episodes'][latestEpisode][1] + "#title")
		$(".latest-episode").text(latestEpisode)
		$(".latest-title").text(data['episodes'][latestEpisode][0])
		
		
		if (daysBetween < 2) {
			displayDays = "更了！更了！终于更了！"
		}
		else if ( daysBetween < 3) {
			displayDays = "前两天刚上新！该满意了吧！"
		}
		else if ( daysBetween < 6) {
			displayDays = "Anyway.FM 最新一期是 "+ daysBetween + " 天前更新的哟"
		}
		else if ( daysBetween < 9) {
			displayDays = "下面这期已经发布一周了，我们的<a href='http://anyway.fm/post/'>安妮薇邮报</a>应该快发行新一期了哟"
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
			displayDays = "这都快三个礼拜了，等不及了可以<a href='mailto:hello@anyway.fm'>发邮件</a>给他们问问看"
		}
		else if ( daysBetween < 60) {
			displayDays = "距离上次更新整整 " + daysBetween + " 天了，JJ 和 Leon 难道已经挂了"
		}
		else {
			displayDays = "如果你能看到这条……很有可能天网已经占领地球了……祝你好运吧"
		}
		$(".days-between").html( displayDays )
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
	return days
}

setTimeout(function() {
    if ( !successQuote ){
    	localQuote()
    }
}, 600)

$(window).load(function() {
	liveCheck()
})