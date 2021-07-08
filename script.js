document.addEventListener('DOMContentLoaded',function(){
	let bookForm = document.getElementById('bookForm');

	bookForm.addEventListener('submit',(e) => {
		e.preventDefault()
		submitBook()
	})
})