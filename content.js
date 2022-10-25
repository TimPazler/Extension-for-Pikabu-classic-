// ctrl+Q
//Ctrl + Shift + K
										
			var i = 0;
			var j = 0;
			var d = 0;
			var g = 0;
			var h = 0;
			var postNumber = 0;
			var noViews = false;
			var wereEdit = false; 
			var views_edit = 0, date_edit = 0;
			var intervalId = 0;
			//Предварительное получение значений
     		//дата
			var dateElement = document.getElementsByClassName("caption story__datetime hint");
			let date = dateElement[i].innerText;
			// дата-время
			var dateTimeElement = document.getElementsByClassName("caption story__datetime hint");
     		let dateTime = dateTimeElement[i].getAttribute("datetime");

			// кол-во комментов
			var countCommentsElement = document.getElementsByClassName("story__comments-link-count");
			let countComments = "";
			// ссылка на комменты
			var linkForCommentElement = document.getElementsByClassName("story__comments-link story__to-comments");
			var linkForComment = "";
			//кол-во просмотров
			var countViewsElement = document.getElementsByClassName("story__views-count");
			var countViews = countViewsElement[i].innerText.split(" ");
			//окно с кол-вом просмотров
			var countViewsLabelElement = document.getElementsByClassName("story__views hint");
			var countViewsLabel = countViewsLabelElement[i].getAttribute("aria-label");
			// кол-во сохранений
			// id Поста
			var idStoryElement = document.getElementsByClassName("story__save hint");

			CreateFooterPost();			
			
	//Оформление footer оболочки			
	function CreateFooterPost() {
	const footerElements = document.querySelectorAll("div.story__footer:not(.story__footer.Fixed)");
	//цикл
	footerElements.forEach(function(refNode) {
			refNode.className += " Fixed"; //последние рабочие элементы 23, 28
			
			if(document.querySelectorAll("button.stories-feed__load-before.button_width_100").length > 0){
			if(document.querySelector("button.stories-feed__load-before.button_width_100").getAttribute("style") != "display: none" && (wereEdit == false || i > 23 || i > 28)){
				
				i = 13;
				if(i > 23)
					i = 22;
				else if(i>28)
					i = 27;
				// wereEdit = true;
				console.log("Итерация изменилась на " + i);
			}
			}
			
			console.log("Итерация:" + i);
			
		    var footerCode = '<div class="story__tools"></div>';						
		    var contentWrapperTdElement = document.querySelectorAll("div.story__footer");					
			contentWrapperTdElement[i].insertAdjacentHTML('afterBegin', footerCode);   

            CreateIconComments();
		    if(document.querySelectorAll("span.story__views-count:not(.story__views-count.Edit)")[i])
			{
				noViews = false;
				CreateIconViews();
				CreateIconSave();	
				CreateIconShare();		   
				CreateIconEmotions();		   
				RescheduleDate();	
			}
			else
			{
				noViews = true;
				CreateIconSave();	
				CreateIconShare();		   
				CreateIconEmotions();		   
				RescheduleDate();
			}
			i++;
			//0 = 0 && 0 = 0 где 0 = 0 - 1 пост
			//1 = 2 && 1 = 1 где 1 = 1 - 2 пост	 
			//2 = 3 && 2 = 2 где 2 = 2 - 3 пост			
			//обновление кол-ва просмотров
			 window.setInterval(() => {						
			if(date_edit == 0 && views_edit == 0)
				UpdateViews();
			else if((date_edit == postNumber && date_edit == views_edit) || (date_edit + 1 == postNumber && date_edit == views_edit)){
				UpdateViews();
			}
			else if(date_edit != views_edit){
			UpdateDate();
			postNumber++;
			}			
			}, 500);				
	});
}

		//Обновление просмотров
		function UpdateViews() {						
			countViewsElement = document.querySelectorAll("span.story__views-count:not(.story__views-count.Edit)");
			countViewsLabelElement = document.querySelectorAll("div.story__views.hint:not(.story__views.hint.Edit)");
			
			//здесь j просматривает значение кол-ва
			if(j != countViewsElement.length){
			// кол-во просмотров
			countViews = countViewsElement[j].innerText.split(" ");			
			// окно с кол-вом просмотров
			countViewsLabel = countViewsLabelElement[j].getAttribute("aria-label");						
			
						//здесь postNumber указывает на сам пост
						if(countViews[0] != "" && countViews[0] != "0" && countViewsLabel != "Загружаем количество просмотров"){
						// меняем кол-во просмотров значка
						var viewsTdElement = document.querySelectorAll("span.story__views-count.Edit");
						viewsTdElement[postNumber].innerText = countViews[0];
						// меняем кол-во просмотров в окне
						var viewsTdElement2 = document.querySelectorAll("div.story__views.hint.Edit");
						viewsTdElement2[postNumber].setAttribute("aria-label", countViewsLabel);	
						
						if(viewsTdElement2[postNumber].getAttribute("aria-label") != "0" && viewsTdElement2[postNumber].getAttribute("aria-label") == countViewsLabel){
						var dateTdElement = document.querySelectorAll("div.story__views.hint:not(.story__views.hint.Edit)");			
						var dateTrElement = dateTdElement[j].parentNode;
						dateTrElement.removeChild(dateTdElement[j]);
						j--;
						date_edit++;
						}						
						j++;						
					}
			}
			
		}	

		//Обновление даты
		function UpdateDate() {			
		var dateElement = document.querySelectorAll("time.caption.story__datetime.hint:not(.caption.story__datetime.hint.Edit)");
				
				if(d != dateElement.length){
				// дата
				let date = dateElement[d].innerText;
				// дата-время
				let dateTime = dateElement[d].getAttribute("datetime");					
				var dateTdElement = document.querySelectorAll("time.caption.story__datetime.hint.Edit");

				if(dateTime != "" && countViewsLabel != ""){
				// меняем дату
				dateTdElement[postNumber].innerText = date;
				// меняем дату время
				dateTdElement[postNumber].setAttribute("aria-label", dateTime);	
				
				if(dateTdElement[postNumber].getAttribute("aria-label") == dateTime){
						var dateTdElement2 = document.querySelectorAll("time.caption.story__datetime.hint:not(.caption.story__datetime.hint.Edit)");			
						var dateTrElement2 = dateTdElement2[d].parentNode;
						dateTrElement2.removeChild(dateTdElement2[d]);
				d--;
				views_edit++;
				}

					d++;	
				}	
				}
			
				
		}
		
		
		//Создание иконки с комментариями		
		function CreateIconComments() {							
			// кол-во комментов

			 countComments = countCommentsElement[i].innerText;
			// ссылка на комменты
			 linkForComment = linkForCommentElement[i].getAttribute("href");
			
			var iconCommentsCode = '<a class="story__comments-link story__to-comments Edit" target="_blank" href="'+ linkForComment +'">'
			+'<span class="story__comments-link-icon" aria-label="">'
			+'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon--ui__comments"><use xlink:href="#icon--ui__comments">'
			+'</use></svg></span> <span class="story__comments-link-count">'+ countComments +'</span></a>';			
			
			var footerElements = document.querySelectorAll('a.story__comments-link.story__to-comments');
            var footerTrElement = footerElements[i].parentNode;
			footerTrElement.removeChild(footerElements[i]);
			
			var storyToolsTdElement = document.querySelectorAll("div.story__tools");
			if(i == 13)
				console.log("Кол-во отсеков коментов:" + storyToolsTdElement.length);
			
			storyToolsTdElement[i].insertAdjacentHTML("beforeEnd", iconCommentsCode);


			//изменение цвета и других параметров стиля
			document.querySelectorAll('a.story__comments-link.story__to-comments')[i].style.backgroundColor = "#ffffff";
			
            document.querySelectorAll('span.story__comments-link-count')[i].style.marginLeft = "10px";
            document.querySelectorAll('a.story__comments-link.story__to-comments')[i].style.marginRight = "24px";

			document.querySelectorAll('span.story__comments-link-count')[i].style.padding = "0";
            document.querySelectorAll('a.story__comments-link.story__to-comments')[i].style.padding = "1px";
		}			
		
		//Создание иконки с просмотрами		
		function CreateIconViews() {						
			var iconViewsCode = '<div class="story__views hint Edit" aria-label=""><span class="story__views-icon Edit">'
			 +'<svg style="vertical-align: middle" xmlns="http://www.w3.org/2000/svg" class="icon icon--ui__eye"><use xlink:href="#icon--ui__eye">'
			 +'</use></svg></span><span class="story__views-count Edit">0</span></div>';
			//создаем новый значок в footer
			var viewsTdElement2 = document.getElementsByClassName("story__comments-link story__to-comments Edit");
			viewsTdElement2[i].insertAdjacentHTML("afterEnd", iconViewsCode);

			//вместо удаления стиля height
            document.getElementsByClassName('story__views-icon')[i].style.height = "";
			// изменение цвета
			document.getElementsByClassName('story__share hint')[i].style.backgroundColor = "#ffffff";
			document.getElementsByClassName('story__footer')[i].style.height = "52px";
			
			//Изменение цвета для даты и времени
			document.querySelectorAll('time.caption.story__datetime.hint:not(.caption.story__datetime.hint.Edit)')[i].style.color = "white";
			document.querySelectorAll('div.story__views.hint:not(.story__views.hint.Edit)')[i].style.color = "white";
		}
				
		//Создание иконки сохранить		
		function CreateIconSave() {
			var countSavesElement = document.querySelectorAll("div.story__save.hint:not(.story__save.hint .Edit)");
			var countSaves = countSavesElement[i].getAttribute("aria-label");
			
			var idStory = countSavesElement[i].getAttribute("data-story-id");

			var iconSaveCode = '<div class="story__save hint Edit" data-story-id="'+ idStory +'" aria-label="'+ countSaves +'">'
			+'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon--ui__save icon--ui__save_tool">'
			+'<use xlink:href="#icon--ui__save"></use></svg></div>';
			
			if(noViews == false){
				var saveTdElement = document.querySelectorAll('div.story__save.hint ');
				var saveTrElement = saveTdElement[i].parentNode;
				saveTrElement.removeChild(saveTdElement[i]);
				
				var saveTdElement = document.querySelectorAll("div.story__views.hint.Edit");
				saveTdElement[i].insertAdjacentHTML("afterEnd", iconSaveCode);		
				
				//изменение цвета	
				document.querySelectorAll('div.story__save.hint.Edit')[i].style.backgroundColor = "#ffffff";
				document.querySelectorAll('div.story__save.hint.Edit')[i].style.marginRight = "24px";
			}
			else if(noViews = true)
			{
				var saveTdElement = document.querySelectorAll('div.story__save.hint ');
				var saveTrElement = saveTdElement[i].parentNode;
				saveTrElement.removeChild(saveTdElement[i]);
				
				var saveTdElement = document.querySelectorAll("a.story__comments-link.story__to-comments.Edit");
				saveTdElement[i].insertAdjacentHTML("afterEnd", iconSaveCode);		
				
				// изменение цвета	
				document.querySelectorAll('div.story__save.hint.Edit')[i].style.backgroundColor = "#ffffff";
				document.querySelectorAll('div.story__save.hint.Edit')[i].style.marginRight = "24px";
			}				
		}
		
		//Создание иконки поделиться		
		function CreateIconShare() {
			 var iconShareCode = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon--ui__share icon--ui__share_tool Edit"><use xlink:href="#icon--ui__share"></use></svg>';
			 
			 var footerElements = document.querySelectorAll("svg.icon.icon--ui__share2_20.icon--ui__share2_20_tool");
             for(let j = 0; j < footerElements.length; j++){
				var footerTrElement = footerElements[j].parentNode;
				footerTrElement.removeChild(footerElements[j]);
			 }
			 var shareTdElement = document.querySelectorAll("div.story__share.hint");
		     shareTdElement[i].insertAdjacentHTML("afterBegin", iconShareCode);

		     document.querySelectorAll('div.story__share')[i].style.backgroundColor = "#ffffff";
             document.querySelectorAll('div.story__share')[i].style.marginRight = "24px";  
			 document.querySelectorAll('div.story__save.hint ')[i].style.padding = "0";  
			 document.querySelectorAll('div.story__share')[i].style.padding = "0";
		}
		
		//Создание иконки донаты		
		function CreateIconDonate() {			 			 
     		document.querySelectorAll('div.story__donate')[i].style.backgroundColor = "#ffffff";
		}
		
		//Создание иконки эмоций		
		function CreateIconEmotions() {			 			
			
			var source = document.querySelectorAll("div.story__sub-info");			 
			var destination = document.querySelectorAll("div.story__footer.Fixed");
			destination[h].appendChild(source[h]);	
			h++;
			// Предварительо удаляем эмоции(сверху)
			// var emotionsTdElement2 = document.querySelectorAll("div.story__emotions.emotions");
			// var emotionsTrElement2 = emotionsTdElement2[i].parentNode;
			// emotionsTrElement2.removeChild(emotionsTdElement2[i]);		
		}
		
		//Перенос даты		
		function RescheduleDate() {			
			var iconDateCode = '<time datetime="'+ dateTime +'" class="caption story__datetime hint Edit">' + date +'</time></div>';
			var dateTdElement = document.querySelectorAll("div.story__sub-info");
						
			var dateTdElement = document.querySelectorAll("a.story__user-link.user__nick");
		    dateTdElement[i].insertAdjacentHTML("afterEnd", iconDateCode);
			
		    document.querySelectorAll('time.caption.story__datetime.hint.Edit')[i].style.marginBottom = "0px";
			document.querySelectorAll('time.caption.story__datetime.hint.Edit')[i].style.marginRight = "0px";
		    document.querySelectorAll('a.story__user-link')[i].style.marginRight = "8px";
		    document.querySelectorAll('time.caption.story__datetime.hint.Edit')[i].style.paddingTop = "2px";					
		}		