//2 + 1 classes --> Book & UI & Store
class Book {
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
 addBookToList(book){
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
  Store.addBooktoLS(book);
  
 }
 showAlert(msg,className){
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
 deleteBook(targetBook){
  if (targetBook.className === 'delete'){
    targetBook.parentElement.parentElement.remove();
  }
 }
 clearFeilds(book){
  document.querySelector("#title").value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}
}

class Store{
  //display book
static displayBookAfterReload(){

  //we took the already stored data(if any) from the LS
  const bookArr = Store.getBookFromLS();
  //loop through bookArr to add them to ui (we already have a function for it in UI class)
  bookArr.forEach(function(bookToBeAdded){
    //Instantiate UI
    const ui = new UI()
    ui.addBookToList(bookToBeAdded)
  })
}
  //add book to LS
static addBooktoLS(bookToBeAdded){

  const bookArr = Store.getBookFromLS(); 
   //push book to be added into bookArr
   bookArr.push(bookToBeAdded);
   //set LS again
   localStorage.setItem('bookArr', JSON.stringify(bookArr));
}
  //get book from LS
static getBookFromLS(){

  let bookArr //an array of objects of books
  if (localStorage.getItem('bookArr') === null){
    bookArr = [] //an empty array
  }else{
    bookArr = JSON.parse(localStorage.getItem('bookArr'))
  }
  return bookArr;

}

  //remove book from LS
static removeBookFromLS(isbn){
  //isbn is unique value for each book-entry
  const bookArr = Store.getBookFromLS(); //an array of book-objects 
  //loop throught each book, see whose isbn value matches isbn parameter, remove that book 
  bookArr.forEach(function(bookToBeRemovedFromLS, index){
     if (bookToBeRemovedFromLS.isbn === isbn){
       bookArr.splice(index,1)
     }
  //set the LS again
  localStorage.setItem('bookArr',JSON.stringify(bookArr))
  })
}
}




//Event listener for display of books --> this function loads the stored data (if present) from LS
document.addEventListener('DOMContentloaded',Store.displayBookAfterReload);


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
  //to remove book from LS
    Store.removeBookFromLS();
    e.preventDefault();
  })
  
