//Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


//UI constrctor --> prototype methods 
function UI(){}

//prototype func which adds book to list 
UI.prototype.addBookToList = function (book){
  const list = document.getElementById('book-list')
//create a row 
  const row = document.createElement('tr');
//create column 
  row.innerHTML = 
 `<td>${book.title}</td> 
  <td>${book.author}</td> 
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>` 
  list.appendChild(row);
}

//prototype func which show alert on empty input 
UI.prototype.showAlert = function(msg,className){
  //create div
  const alertDiv = document.createElement('div');
  //add class name
  alertDiv.classList.add('alert')
  //add class name
  alertDiv.classList.add(`${className}`)
  //add text node
  alertDiv.appendChild(document.createTextNode(`${msg}`))
  //get parent 
  const container = document.querySelector('.container')
  //get form
  const form = document.querySelector('#book-form')
  container.insertBefore(alertDiv,form);
  //remove alertDiv after 3 sec 
  setTimeout(function(){
    document.querySelector(".alert").remove();
  }, 3000)
}

//prototype func which clear feilds 
UI.prototype.clearFeilds = function(book){
  document.querySelector("#title").value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

//prototype func which delete book 
UI.prototype.deleteBook = function(targetBook){
  if (targetBook.className === 'delete'){
    targetBook.parentElement.parentElement.remove();
  }
}


//Event listener for add
document.querySelector("#book-form").addEventListener('submit',function(e){

//get input vars
 const title = document.querySelector("#title").value
 const author = document.querySelector('#author').value
 const isbn = document.querySelector('#isbn').value

//Instantiate book 
  const newBook = new Book(title, author, isbn)
//Instantiate UI
  const ui = new UI()

if (title == ''||author == ''||isbn ==''){
  ui.showAlert('please fill in all of your feilds','error');
 }else{
  //add book to list
  ui.addBookToList(newBook);
  ui.showAlert('book added!','success');
//clear feilds after submit 
  ui.clearFeilds();
 }
 e.preventDefault();
})

//Event Listener for delete --> EVENT DELEGATION 
document.querySelector("#book-list").addEventListener('click', function(e){
 //Instantiate UI
  const ui = new UI()
 //delete book row
  ui.deleteBook(e.target);
  ui.showAlert('Book deleted!','success');
  e.preventDefault();
})
