let edit,
	searchField = document.querySelector('#bookDataSearch'),
	searchKeyword,
	searchButton = document.querySelector('#searchSubmit'),
	uncompleteBooks = [],
	completeBooks = []
	
const localUncompleteBooks = "UNCOMPLETE_BOOKS",
	  localCompleteBooks = "COMPLETE_BOOKS"

window.addEventListener('load',() =>{
	if(typeof(Storage) !== "undefined"){
		if(localStorage.getItem(localUncompleteBooks) === null){
			localStorage.setItem(localUncompleteBooks,"")
		}else{
			uncompleteBooks = JSON.parse(localStorage.getItem(localUncompleteBooks))
		}
		if(localStorage.getItem(localCompleteBooks) === null){
			localStorage.setItem(localCompleteBooks,"")
		}else{
			completeBooks = JSON.parse(localStorage.getItem(localCompleteBooks))
		}
	}else{
		alert("You're using a browser that isn't support web storage")
	}
	renderBook()
})

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

		uncompleteBooks.forEach(book => {
			let index = 0
			if(edit.id == book.id){
				uncompleteBooks[index] = {
					id: edit.id,
					title: title.innerText,
					author: author.innerText,
					year: year.innerText,
					isCompleted: edit.isCompleted
				}
				localStorage.setItem(localUncompleteBooks,JSON.stringify(uncompleteBooks))
			}else{
				index++
			}
		})
		completeBooks.forEach(book => {
			let index = 0
			if(edit.id == book.id){
				completeBooks[index] =  {
					id: edit.id,
					title: title.innerText,
					author: author.innerText,
					year: year.innerText,
					isCompleted: edit.isCompleted
				}
				localStorage.setItem(localCompleteBooks,JSON.stringify(completeBooks))
			}else{
				index++
			}
		})
		edit = undefined
		document.getElementById('warning').remove()
		console.log(uncompleteBooks[0])
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
			completeBooks.push(objectBook)
			localStorage.setItem(localCompleteBooks,JSON.stringify(completeBooks))
		}else{
			uncompleteBooks.push(objectBook)
			localStorage.setItem(localUncompleteBooks,JSON.stringify(uncompleteBooks))
		}
		console.log('Have Submitted',objectBook)
		makeBook(objectBook)		
}

const makeBook = (bookObject) => {
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

	title.textContent = bookObject.title
	author.textContent = bookObject.author
	year.textContent = bookObject.year
	divInfo.append(title,author,year)

	if(bookObject.isCompleted){
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
		edit = undefined
		document.getElementById('inputTitle').value = ""
		document.getElementById('inputAuthor').value = ""
		document.getElementById('inputYears').value = ""
		document.getElementById('bookIsComplete').disabled = null
		document.getElementById('warning').remove()
	}

	uncompleteBooks.forEach(book => {
		let index = 0
		if(e.id == book.id){
			uncompleteBooks.splice(index,1)
		}else{
			index++
		}
	})
	
	completeBooks.forEach(book => {
		let index = 0
		if(e.id == book.id){
			completeBooks.splice(index,1)
		}else{
			index++
		}
	})

	localStorage.setItem(localCompleteBooks,JSON.stringify(completeBooks))
	localStorage.setItem(localUncompleteBooks,JSON.stringify(uncompleteBooks))

}

const cancelBook = (e) => {
	let uncompletedArea = document.querySelector('#uncompletedBookShelfArea .bookList'),
		title = e.querySelector('h4').innerText,
		author = e.querySelectorAll('p')[0].innerText,
		year = e.querySelectorAll('p')[1].innerText,
		bookObject = {
			id: e.id,
			title : title,
			author: author,
			year: year,
			isCompleted: false
		}
	makeBook(bookObject)
	uncompleteBooks.push(bookObject)

	localStorage.setItem(localUncompleteBooks,JSON.stringify(uncompleteBooks))

	completeBooks.forEach(book => {
		let index = 0
		if(e.id == book.id){
			completeBooks.splice(index,1)
		}else{
			index++
		}
	})
	e.remove()
	localStorage.setItem(localCompleteBooks,JSON.stringify(completeBooks))

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
			year: year,
			isCompleted: true
		}
	
	makeBook(bookObject)
	completeBooks.push(bookObject)

	localStorage.setItem(localCompleteBooks,JSON.stringify(completeBooks))

	uncompleteBooks.forEach(book => {
		let index = 0
		if(e.id == book.id){
			uncompleteBooks.splice(index,1)
		}else{
			index++
		}
	})
	e.remove()
	localStorage.setItem(localUncompleteBooks,JSON.stringify(uncompleteBooks))
} 

const editBook = (e) => {
	let title = e.querySelector('h4').innerText,
		author = e.querySelectorAll('p')[0].innerText,
		year = e.querySelectorAll('p')[1].innerText,
		inputAreaH2 = document.querySelector('#inputArea form'),
		warning

	document.getElementById('inputTitle').value = title
	document.getElementById('inputAuthor').value = author
	document.getElementById('inputYears').value = year
	document.getElementById('bookIsComplete').setAttribute('disabled','disabled')

	warning = document.createElement('label')
	warning.textContent = 'Silakan selesaikan proses edit berikut!'
	warning.id = ('warning')
	warning.style.color = 'white'
	warning.style.textAlign = 'center'
	warning.style.backgroundColor = 'red'

	if(edit === undefined){
		inputAreaH2.insertBefore(warning,inputAreaH2.childNodes[0])
	}

	uncompleteBooks.forEach(book => {
		if(e.id == book.id){
			edit = book
		}
	})
	
	completeBooks.forEach(book => {
		if(e.id == book.id){
			edit = book
		}
	})
}

const filterBook = () => {
	let bookS = document.querySelectorAll('.book')
	bookS.forEach((e,i) => {
		if(e.childNodes[1].childNodes[0].innerText == searchKeyword){
			bookS[i].style.display = null
		}else{
			bookS[i].style.display = 'none'
		}
	})		
}

searchField.addEventListener('input',() => {
	let bookS = document.querySelectorAll('.book')
	searchKeyword = searchField.value
	if(searchKeyword == ""){
		bookS.forEach((e) => {
			e.style.display = null
		})
	}
})


searchButton.addEventListener('click',() => {
	filterBook()
})

const renderBook = () => {
	const uncompletedArea = document.querySelector('#uncompletedBookShelfArea'),
	      completedArea = document.querySelector('#completedBookShelfArea')

	uncompleteBooks.forEach(book => {
		makeBook(book)
	})
	completeBooks.forEach(book => {
		makeBook(book)
	})
}
