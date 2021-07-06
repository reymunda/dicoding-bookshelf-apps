let edit;
const submitBook = () => {
	if(edit === undefined){
		addBook()
	}else{
		let id = document.getElementById(edit.id),
			title = id.querySelector('h4'),
			author = id.querySelectorAll('p')[0],
			year = id.querySelectorAll('p')[1],
			completeButton = id.querySelector('.completeButton'),
			cancelButton = id.querySelector('.cancelButton')

			title.innerText = document.getElementById('inputTitle').value
			author.innerText = document.getElementById('inputAuthor').value
			year.innerText = document.getElementById('inputYears').value

			console.log(id)
			edit = undefined

			// if(id.parentElement.parentElement.id === 'completedBookShelfArea'){
			// 	cancelButton.removeAttribute('disabled')
			// 	cancelButton.style.opacity = '100%'
			// }else{
			// 	completeButton.removeAttribute('disabled')
			// 	completeButton.style.opacity = '100%'
			// }
			document.getElementById('warning').remove()
	}
	
	document.getElementById('inputTitle').value = ""
	document.getElementById('inputAuthor').value = ""
	document.getElementById('inputYears').value = ""

	let completeCheckbox = document.getElementById('bookIsComplete')
	if(completeCheckbox.getAttribute('disabled') == 'disabled'){
			completeCheckbox.removeAttribute('disabled')
	}
	completeCheckbox.checked = false
}
const addBook = () => {
	let title = document.getElementById('inputTitle').value,
		author = document.getElementById('inputAuthor').value,
		year = document.getElementById('inputYears').value,
		bookIsComplete = document.getElementById('bookIsComplete'),
		objectBook = {
			id: +new Date(),
			title: title,
			author: author,
			year: year,
			isCompleted: false
		};
		if(bookIsComplete.checked){
			objectBook.isCompleted = true
		}
		console.log('Have Submitted',objectBook)
		makeBook(objectBook,objectBook.isCompleted)
}

const makeBook = (bookObject,isCompleted) => {
	let uncompletedArea = document.querySelector('#uncompletedBookShelfArea .bookList'),
		completedArea = document.querySelector('#completedBookShelfArea .bookList'),
		divBook = document.createElement('div'),
		divEdit = document.createElement('div'),
		divInfo = document.createElement('div'),
		divButton = document.createElement('div'),
		title = document.createElement('h4'),
		author = document.createElement('p'),
		year = document.createElement('p'),
		removeButton = document.createElement('button'),
		editIcon = document.createElement('div'),
		cancelButton = document.createElement('button'),
		completedButton = document.createElement('button');

	divBook.classList.add('book')
	divBook.id = bookObject.id
	divInfo.classList.add('bookInfo')
	divButton.classList.add('bookButton')
	
	divEdit.classList.add('editIcon')
	divEdit.addEventListener('click',(e) => {
		editBook(e.target.parentElement)
	})

	removeButton.classList.add('removeButton')
	removeButton.textContent = 'Hapus'
	removeButton.addEventListener('click',(e) =>{
		removeBook(e.target.parentElement.parentElement)
	})

	cancelButton.classList.add('cancelButton')
	cancelButton.textContent = 'Batal'
	cancelButton.addEventListener('click',(e) => {
		cancelBook(e.target.parentElement.parentElement)
	})

	completedButton.classList.add('completeButton')
	completedButton.textContent = 'Selesai'
	completedButton.addEventListener('click',(e) => {
		completeBook(e.target.parentElement.parentElement)
	})

	//Membuat book info
	title.textContent = bookObject.title
	author.textContent = bookObject.author
	year.textContent = bookObject.year
	divInfo.append(title,author,year)

	if(isCompleted){
		divButton.append(cancelButton,removeButton)
		divBook.append(divEdit,divInfo,divButton)
		completedArea.append(divBook)
	}else{
		divButton.append(completedButton,removeButton)
		divBook.append(divEdit,divInfo,divButton)
		uncompletedArea.append(divBook)
	}

}
const removeBook = (e) => {
	e.remove()
	if(edit !== undefined){
		if(e.id === edit.id){
		edit = undefined
		document.getElementById('inputTitle').value = ""
		document.getElementById('inputAuthor').value = ""
		document.getElementById('inputYears').value = ""
		document.getElementById('bookIsComplete').disabled = null
		document.getElementById('warning').remove()
		}
	}
	
}

const cancelBook = (e) => {
	let uncompletedArea = document.querySelector('#uncompletedBookShelfArea .bookList'),
		title = e.querySelector('h4').innerText,
		author = e.querySelectorAll('p')[0].innerText,
		year = e.querySelectorAll('p')[1].innerText,
		bookObject = {
			id: +new Date(),
			title : title,
			author: author,
			year: year
		}
	
	makeBook(bookObject,false)
	e.remove()
}

const completeBook = (e) => {
	let completedArea = document.querySelector('#completedBookShelfArea .bookList'),
		title = e.querySelector('h4').innerText,
		author = e.querySelectorAll('p')[0].innerText,
		year = e.querySelectorAll('p')[1].innerText,
		bookObject = {
			id: e.id,
			title : title,
			author: author,
			year: year
		}
	
	makeBook(bookObject,true)
	e.remove()

} 

const editBook = (e) => {
	let title = e.querySelector('h4').innerText,
		author = e.querySelectorAll('p')[0].innerText,
		year = e.querySelectorAll('p')[1].innerText,
		completedButton = e.querySelector('.completeButton'),
		cancelButton = e.querySelector('.cancelButton'),
		editButton,
		inputAreaH2 = document.querySelector('#inputArea form'),
		warning


		document.getElementById('inputTitle').value = title
		document.getElementById('inputAuthor').value = author
		document.getElementById('inputYears').value = year
		console.log(e)
		document.getElementById('bookIsComplete').setAttribute('disabled','disabled')
		// if(e.parentElement.parentElement.id === 'completedBookShelfArea'){
		// 	cancelButton.setAttribute('disabled','disabled')
		// 	cancelButton.style.opacity = '50%'
		// }else{
		// 	completedButton.setAttribute('disabled','disabled')
		// 	completedButton.style.opacity = '50%'
		// }
		warning = document.createElement('label')
		warning.textContent = 'Silakan selesaikan proses edit berikut!'
		warning.id = ('warning')
		warning.style.color = 'white'
		warning.style.textAlign = 'center'
		warning.style.backgroundColor = 'red'
		if(edit === undefined){
			inputAreaH2.insertBefore(warning,inputAreaH2.childNodes[0])
		}
		edit = {
			id: e.id,
			title : e.title,
			author: e.author,
			year: e.year
		}
		
		

		console.log(edit)
}
