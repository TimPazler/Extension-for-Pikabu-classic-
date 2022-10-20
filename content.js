// ctrl+Q
//Ctrl + Shift + K
										
			var i = 0;			
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
			var countSavesElement = document.getElementsByClassName("story__save hint ");
			var countSaves = countSavesElement[i].getAttribute("aria-label");						
			// эмоции
			var emotionElement = document.getElementsByClassName("story__emotions emotions");
		    // кол-во сохранений
			var idStoryElement = document.getElementsByClassName("story__save hint");
			var idStory = countSavesElement[i].getAttribute("data-story-id");				

			//Добавляет инфу каждые 600 мс		
			window.setInterval(function() {
				CreateFooterPost();
			}, 600);			
		//Оформление footer оболочки			
		function CreateFooterPost() {
						
			const footerElements = document.querySelectorAll("div.story__footer");
			footerElements.forEach(function(button) {
					    
		    var footerCode = '<div class="story__tools Edit-"></div>';
			var footerTdElement = document.getElementsByClassName("story__footer");
						
		     var contentWrapperTdElement = document.getElementsByClassName("story__footer")[i];
			contentWrapperTdElement.insertAdjacentHTML('afterBegin', footerCode);   

            CreateIconComments();
		    CreateIconViews();
		    CreateIconSave();	
		    CreateIconShare();		   
		    CreateIconEmotions();		   
  		    RescheduleDate();	
			i++;			
			
			});
		}
		
		//Создание иконки с комментариями		
		function CreateIconComments() {							
			// кол-во комментов
			 countComments = countCommentsElement[i].innerText;
			// ссылка на комменты
			 linkForComment = linkForCommentElement[i].getAttribute("href");
			
			var iconCommentsCode = '<a class="story__comments-link story__to-comments" target="_blank" href="'+ linkForComment +'">'
			+'<span class="story__comments-link-icon" aria-label="">'
			+'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon--ui__comments"><use xlink:href="#icon--ui__comments">'
			+'</use></svg></span> <span class="story__comments-link-count">'+ countComments +'</span></a>';			
			
			var footerTdElement = document.getElementsByClassName("story__comments-link story__to-comments");
            var footerTrElement = footerTdElement[i].parentNode;
			footerTrElement.removeChild(footerTdElement[i]);
			
			var storyToolsTdElement = document.getElementsByClassName("story__tools");
			storyToolsTdElement[i].insertAdjacentHTML("beforeEnd", iconCommentsCode);

			//изменение цвета и других параметров стиля
			document.getElementsByClassName('story__comments-link story__to-comments')[i].style.backgroundColor = "#ffffff";
			
            document.getElementsByClassName('story__comments-link-count')[i].style.marginLeft = "10px";
            document.getElementsByClassName('story__comments-link story__to-comments')[i].style.marginRight = "24px";

			document.getElementsByClassName('story__comments-link-count')[i].style.padding = "0";
            document.getElementsByClassName('story__comments-link story__to-comments')[i].style.padding = "1px";
		}			
		
		//Создание иконки с просмотрами		
		function CreateIconViews() {			
			countViewsElement = document.getElementsByClassName("story__views-count");
			//кол-во просмотров
			countViews = countViewsElement[i].innerText.split(" ");
			//окно с кол-вом просмотров
			countViewsLabel = countViewsLabelElement[i].getAttribute("aria-label");
			
			var iconViewsCode = '<div class="story__views hint" aria-label="'+ countViewsLabel +'"><span class="story__views-icon">'
			 +'<svg style="vertical-align: middle" xmlns="http://www.w3.org/2000/svg" class="icon icon--ui__eye"><use xlink:href="#icon--ui__eye">'
			 +'</use></svg></span><span class="story__views-count">'+ countViews[0] +'</span></div>';
			var viewsTdElement = document.getElementsByClassName("story__views hint");
			//Предварительо удаляем просмотры(сверху)
			var viewsTrElement = viewsTdElement[i].parentNode;
			viewsTrElement.removeChild(viewsTdElement[i]);
			//создаем новый значок в footer
			var viewsTdElement2 = document.getElementsByClassName("story__comments-link story__to-comments");
			viewsTdElement2[i].insertAdjacentHTML("afterEnd", iconViewsCode);

			//вместо удаления стиля height
            document.getElementsByClassName('story__views-icon')[i].style.height = "";
			//изменение цвета
			document.getElementsByClassName('story__share hint')[i].style.backgroundColor = "#ffffff";
			document.getElementsByClassName('story__footer')[i].style.height = "52px";
		}
		
		//Создание иконки сохранить		
		function CreateIconSave() {
			var iconSaveCode = '<div class="story__save hint " data-story-id="'+idStory+'" aria-label="'+ countSaves +'">'
			+'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon--ui__save icon--ui__save_tool">'
			+'<use xlink:href="#icon--ui__save"></use></svg></div>';
			
			var saveTdElement = document.getElementsByClassName("story__save hint ");
            var saveTrElement = saveTdElement[i].parentNode;
			saveTrElement.removeChild(saveTdElement[i]);
			
			var saveTdElement = document.getElementsByClassName("story__views hint");
		    saveTdElement[i].insertAdjacentHTML("afterEnd", iconSaveCode);		
			
		    //изменение цвета	
			document.getElementsByClassName('story__save hint ')[i].style.backgroundColor = "#ffffff";
            document.getElementsByClassName('story__save hint')[i].style.marginRight = "24px";
		}
		
		//Создание иконки поделиться		
		function CreateIconShare() {
			 var iconShareCode = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon--ui__share icon--ui__share_tool"><use xlink:href="#icon--ui__share"></use></svg>';
			 
			 var footerTdElement = document.getElementsByClassName("icon icon--ui__share2_20 icon--ui__share2_20_tool");
             for(let j = 0; j < footerTdElement.length; j++){
				var footerTrElement = footerTdElement[j].parentNode;
				footerTrElement.removeChild(footerTdElement[j]);
			 }
			 var shareTdElement = document.getElementsByClassName("story__share hint");
		     shareTdElement[i].insertAdjacentHTML("afterBegin", iconShareCode);

		     document.getElementsByClassName('story__share')[i].style.backgroundColor = "#ffffff";
             document.getElementsByClassName('story__share')[i].style.marginRight = "24px";  
			 document.getElementsByClassName('story__save hint ')[i].style.padding = "0";  
			 document.getElementsByClassName('story__share')[i].style.padding = "0";
		}
		
		//Создание иконки донаты		
		function CreateIconDonate() {			 			 
     		document.getElementsByClassName('story__donate')[i].style.backgroundColor = "#ffffff";
		}
		
		//Создание иконки эмоций		
		function CreateIconEmotions() {
			 // var iconEmotionsCode = '<div class="story__emotions emotions" data-story-id="'+storyId+'" '
			 // +'data-emotions="{&quot;is_loaded&quot;:false,&quot;emotions&quot;:[]}">'
			 // +'<div class="emotions__items "><span data-type="1" class="emotions__item">'
			 // +'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon--emotions__smile"><use xlink:href="#icon--emotions__smile"></use></svg>'
			 // +'</span></div>Эмоции</div>';
			  var emotionsTrElement = document.getElementsByClassName("story__emotions emotions");
			 // Предварительо удаляем просмотры(сверху)
			 // var emotionsTrElement = emotionsTdElement[i].parentNode;
			 // emotionsTrElement.removeChild(emotionsTdElement[i]);
			 	
			 var emotionsTdElement = document.getElementsByClassName("story__footer");
		     emotionsTdElement[i].insertAdjacentHTML("beforeEnd", emotionsTrElement[i].outerHTML);
		}
		
		//Перенос даты		
		function RescheduleDate() {			
			var iconDateCode = '<div class="story__sub-info story__sub-info_after-community">'
			+ '<time datetime="'+ dateTime +'" class="caption story__datetime hint">' + date +'</time></div>';
			var dateTdElement = document.getElementsByClassName("story__sub-info");
			//Предварительо удаляем просмотры(сверху)
			var dateTrElement = dateTdElement[i].parentNode;
			dateTrElement.removeChild(dateTdElement[i]);
			
			var dateTdElement = document.getElementsByClassName("story__user-link user__nick");
		    dateTdElement[i].insertAdjacentHTML("afterEnd", iconDateCode);
			
		    document.getElementsByClassName('story__sub-info story__sub-info_after-community')[i].style.marginBottom = "0px";
		    document.getElementsByClassName('story__user-link')[i].style.marginRight = "8px";
		    document.getElementsByClassName('story__sub-info story__sub-info_after-community')[i].style.paddingTop = "2px";					
		}			
			
