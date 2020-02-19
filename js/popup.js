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
	    document.getElementById("description").innerHTML = data['name'];
	    document.getElementById("music").innerHTML = data['audio']['name'];
	}
	function getJsonTikTok(index){
		if(index != 0){
			display(data[index]);
		}
		else{
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
		}
	};
	getJsonTikTok(0);



	window.addEventListener('click',function(event){
		let video = document.getElementById("video");
		let continueBtn = document.getElementById("continueBtn");
		if(video.paused){
			video.play();
			continueBtn.style.display = "none";
		}
		else{
			continueBtn.style.display = "block";
			video.pause();
		}
	});



	//Next to new video
	var scrollStatus = {
	    wheeling: false
	  };
	var scrollTimer = false;
	window.addEventListener('wheel', function (event) {
		if (event.deltaY > 0)
		{
		    if (!scrollStatus.wheeling) {
		    	if(current < dataLength){
		    		current++;
		    		getJsonTikTok(current);
		    	}
		    	else{
		    		getJsonTikTok(0);
		    	}
		      	scrollStatus.wheeling = true;
		    }
		    window.clearTimeout(scrollTimer);
		    window.setTimeout(function() {
		      scrollStatus.wheeling = false;
		    }, 800);
		}
	});
	var scrollStatus = {
	    wheeling: false,
	  };
	var scrollTimer = false;

	window.addEventListener('keydown', function(event) {
	    const key = event.key; 
	    switch (event.key) {
	    	case "ArrowRight":
		    case "ArrowDown":
			    if (!scrollStatus.wheeling) {
			    	if(current < dataLength){
			    		current += 1;
			    		getJsonTikTok(current);
			    	}
			    	else{
			    		getJsonTikTok(0);
			    	}
			      	scrollStatus.wheeling = true;
			    }
		    	window.clearInterval(scrollTimer);
			    scrollTimer = window.setTimeout(function() {
			      scrollStatus.wheeling = false;
			    }, 500);
		        break;
		    // case "ArrowLeft":
		    // case "ArrowUp":
		    //     break;
		}

	});
});

