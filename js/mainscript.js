function saveTaskToLocalStorage(task,date){

	var tasks;
	var uniqueID = Math.random().toString(36).substr(2, 16);
	var task = {
						'id' : uniqueID,
				   'description' : task,
				   'date'    : date,
				 };

	if (!GetTasksFromLocalStorage()){

		tasks =
			 [
				 task
			 ]
		 ;

		localStorage.setItem("tasks", JSON.stringify(tasks));

	}else{

		tasks = GetTasksFromLocalStorage();

		tasks.unshift(task);

		localStorage.setItem("tasks", JSON.stringify(tasks));

	}

	addTaskDiv(task, uniqueID);

}

function removeTaskFromLocalStorage(taskid){

	var tasks = GetTasksFromLocalStorage();

	for(i=0; i < tasks.length; i++){

		if( tasks[i].id == taskid){

			tasks.splice(i,1);
			break;

		}

	}

	localStorage.setItem("tasks", JSON.stringify(tasks));

	removeTaskDiv(taskid);

}

function removeTaskDiv(taskid){

	var task = document.getElementById("noteBox"+taskid);
	var listFlex_el = document.getElementById('task_listFlex');

	task.className = task.className + " fadeout";


setTimeout(function(){ listFlex_el.removeChild(task); }, 2000);



}

function GetTasksFromLocalStorage(){

	if (!localStorage.getItem('tasks')){return false;}

	return JSON.parse(localStorage.getItem('tasks'));


}

function reloadTasks(){

		var tasks = GetTasksFromLocalStorage();
		var listFlex_el = document.getElementById('task_listFlex');

		if(listFlex_el){

			listFlex_el.innerHTML = "";

		}

		if(tasks){

			for(i=0;i < tasks.length;i++){

				addTaskDiv(tasks[i],tasks[i].id,true);

			}

		}

	}

function addTaskDiv(task,i,reload){

		if(!i){

			var i = GetTasksFromLocalStorage().length -1;

		}

		var div_el = document.createElement("div");
			div_el.id = "noteBox"+i;
			div_el.className = "noteBoxPanels";
			div_el.style.backgroundImage = "url('./images/notebg.png')";
			div_el.style.backgroundRepeat = "no-repeat";

			var textArea = document.createElement("div");
				textArea.innerHTML = task.description;
				textArea.id = "noteBoxTextArea"+i;
				textArea.className = "noteBoxDescription";
				textArea.rows = 15;
				textArea.cols = 30;
				textArea.readOnly = true;

			div_el.appendChild(textArea);

			var dateArea = document.createElement("p");
				dateArea.innerHTML = task.date;
				dateArea.id = "noteBoxDateArea"+i;
				dateArea.className = "noteBoxDate";
				dateArea.readOnly = true;

			div_el.appendChild(dateArea);

			var removeButtonAncor = document.createElement("a");
				removeButtonAncor.id = "removeButton"+i;
				removeButtonAncor.className = "removeButtons";
				removeButtonAncor.href = "#";
				removeButtonAncor.dataset.tID = i;

				var removeButtonSpan = document.createElement("span");
					removeButtonSpan.className = "glyphicon glyphicon-trash";

				removeButtonAncor.appendChild(removeButtonSpan);

			div_el.appendChild(removeButtonAncor);

			if(reload){

				document.getElementById("task_listFlex").appendChild(div_el);

			}else{

					document.getElementById("task_listFlex").prepend(div_el);

			}


		document.getElementById("removeButton"+i).addEventListener("click", function(){

			// Remove function
				removeTaskFromLocalStorage(i);
				console.log("test696");
		});

	}

function isValidDate(date){

	var pattern = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/
	//var pattern = /05\d[-]{0,1}\d{7}/;

	if(pattern.test(date)){return true;}

	return false;


}

function addErrorMessage(message,id){

	var errorsBox_el = document.getElementById("errorsBox");

	if(!document.getElementById("haveErrors")){

		var p_el_errorsFound = document.createElement("h2");
		p_el_errorsFound.id = "haveErrors";
		p_el_errorsFound.className = "formErrors";
		p_el_errorsFound.style.color = "black";
		p_el_errorsFound.style.fontWeight = "bold";
		p_el_errorsFound.style.fontSize = "22px";
		p_el_errorsFound.style.textDecoration = "underline";
		p_el_errorsFound.innerHTML = "We have errors !";

		errorsBox_el.prepend(p_el_errorsFound);

	}

	var p_el_error = document.createElement("p");
	p_el_error.id = id;
	p_el_error.className = "formErrors";
	p_el_error.style.color = "red";
	p_el_error.style.fontWeight = "bold";
	p_el_error.style.fontSize = "16px";
	p_el_error.style.backgroundColor = "yellow";
	p_el_error.innerHTML = message;

	errorsBox_el.appendChild(p_el_error);

}

document.getElementById("saveButton").addEventListener("click", function(){

	var task_el = document.getElementById("taskTextAreaInput");
	var errorsBox_el = document.getElementById("errorsBox");
	var date_el = document.getElementById("dateInput");
	var formErrors = false;

	// Clears the div element of errorsBox

	errorsBox_el.innerHTML = "";

	if(task_el.value == ""){

		addErrorMessage("Please add conent to the task!","errorNoValueTask");

		formErrors = formErrors + 1;

	}

	if(date_el.value == ""){

		addErrorMessage("Please add date to the task!","errorNoValueDate");

		formErrors = formErrors + 1;

	}else {

		if(!isValidDate(date_el.value)){

			addErrorMessage("Please add valid date with valid pattern(dd/mm/yyyy).","errorInvalidDate");

			formErrors = formErrors + 1;

		}

	}

	if(formErrors > 0){

		return

	}

		var task = document.getElementById("taskTextAreaInput").value
		var date = document.getElementById("dateInput").value

		saveTaskToLocalStorage(task,date);


});

document.addEventListener("DOMContentLoaded", function(){
	// Load tasks from LocalStorage and create the divs inside the flex box.

		reloadTasks()

});
