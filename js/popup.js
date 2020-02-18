// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

document.addEventListener('DOMContentLoaded', function () {
	var data,dataLength,current = 0;
	function display(data){
		let uploadDate,user;
		document.getElementById("video").src = data['contentUrl'];
		user = data['url'].split("/")[3];
	    document.getElementById("name").innerHTML = user;
// 	    uploadDate = new Date(data['uploadDate']);
// 	    document.getElementById("uploadDate").innerHTML = ('0' + uploadDate.getDate()).slice(-2)  + "-" + ('0' + (uploadDate.getMonth()+1)).slice(-2) + "-" + uploadDate.getFullYear() + " " +
// ('0' + uploadDate.getHours()).slice(-2) + ":" + ('0' + uploadDate.getMinutes()).slice(-2);
	    document.getElementById("description").innerHTML = data['name'];
	    document.getElementById("music").innerHTML = data['audio']['name'];
	}
	function getJsonTikTok(index){
		if(index != 0){
			display(data[index]);
		}
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://www.tiktok.com/node/share/trending", true);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
		  	data = JSON.parse(xhr.responseText)['body']['itemList'];
		  	dataLength = data.length;
		    display(data[index]);
		  }
		}
		xhr.send();
	};
	getJsonTikTok(0);

	//Next to new video
	var scrollStatus = {
	    wheeling: false,
	    functionCall: false
	  };
	var scrollTimer = false;
	window.addEventListener('wheel', function (event) {
		if (event.deltaY < 0)
		{

		}
		else if (event.deltaY > 0)
		{
			scrollStatus.wheeling = true;
		    if (!scrollStatus.functionCall) {
		    	if(current < dataLength){
		    		current += 1;
		    		getJsonTikTok(current);
		    	}
		    	else{
		    		getJsonTikTok(0);
		    	}
		      	scrollStatus.functionCall = true;
		    }
		    window.clearInterval(scrollTimer);
		    scrollTimer = window.setTimeout(function() {
		      scrollStatus.wheeling = false;
		      scrollStatus.functionCall = false;
		    }, 400);
		}
	});
});

