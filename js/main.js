var successQuote = false
var onlineQuoteUrl = "http://anyway-web.b0.upaiyun.com/anyway.quote/anyway.quote.json"
var onlineRSSUrl = "http://anyway-web.b0.upaiyun.com/anyway.quote/config.json"

updateQuote = function(quote, author, source, url) {
	$("p.quote").text(quote)
	$("span.author").text(author)
	if ( source != "") {
		$("span.source").css('display','inline')
		$("a.source-link").text(source)
		$("a.source-link").attr('href',url)
	}
}

var localQuote = function() {
	$.getJSON('./json/quotes.json', function(data) {
		var x = Math.round(Math.random()*(data.length-1))
		var author = data[x][0]
		var quote = data[x][1]
		var source = data[x][2]
		var url = data[x][3]
		updateQuote(quote, author, source, url)
	})
}

var liveCheck = function() {
	$.getJSON(onlineQuoteUrl, function(data) {
		successQuote = true
		var x = Math.round(Math.random()*(data.length-1))
		var author = data[x][0]
		var quote = data[x][1]
		var source = data[x][2]
		var url = data[x][3]
		updateQuote(quote, author, source, url)
	})
	
	$.getJSON(onlineRSSUrl, function(data) {
		$("footer").css('display','block')
		$(".latest-link").attr('href',data[0][2])
		$(".latest-episode").text(data[0][0])
		$(".latest-title").text(data[0][1])
		var now = new Date()
//		now = $.format.date(now, "yyyy-mm-dd")
		daysBetween = now - data[0][3]
		console.log(now)
	})
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