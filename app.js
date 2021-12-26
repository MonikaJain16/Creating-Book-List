//BOOK CONSTRUCTOR
 function Book(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
 }

 
 //UI CONSTRUCTOR
function UI(){

}


UI.prototype.showAlert=function(msg,className){
    //CREATE DIV
    const div=document.createElement('div');
    //ADD CLASS NAME
    div.className='alert '+className;
    //ADD TEXT 
    div.appendChild(document.createTextNode(msg));
    //GET PARENT
    const container=document.querySelector('.container');
    //GET FORM
    const form=document.querySelector('#book-form');
    //INSERT ALERT
    container.insertBefore(div,form);
    //TIMEOUT AFTER 3 SECONDS
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}


UI.prototype.addBookToList=function(book){
   const list=document.getElementById('book-list');

   //CREATE TR ELEMENT
      const row=document.createElement('tr');
    //INSERT COLS
    row.innerHTML='<td>'+book.title+'</td> <td>'+book.author+'</td><td>'+book.isbn+'</td><td><a href="#" class="delete">X</a></td>';
    list.appendChild(row);
}


UI.prototype.clearFields=function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}


//DELETE BOOK
UI.prototype.deletebook=function(target){
    if(target.className==='delete'){
        target.parentElement.parentElement.remove();
    }
}


//EVENT LISTENERS
document.getElementById('book-form').addEventListener('submit',function(e){
    //GET FORM VALUES
    const title=(document.getElementById('title').value).toUpperCase();
    const author=(document.getElementById('author').value).toUpperCase();
    const isbn=document.getElementById('isbn').value;
    
    //CREATING INSTANCE OF BOOK 
    const book=new Book(title,author,isbn);
    //CREATING INSTANCE OF UI
    const ui=new UI();
    if(title===''||author===''||isbn===''){
        //ERROR ALERT
        ui.showAlert('Please Enter Values for all Fields','error');
    }else{
        //ADD BOOK TO LIST
        ui.addBookToList(book);

        //CLEAR FIELDS
        ui.clearFields();

        //SUCCESS ALERT
        ui.showAlert('Book Added Successfully!!!!','success');
    }    
    e.preventDefault();
});
 

//EVENT LISTENER FOR DELETING BOOKS FROM  LIST
document.getElementById('book-list').addEventListener('click',function(e){
    const ui=new UI;
    ui.deletebook(e.target);
    ui.showAlert('Book Removed Successfully!!!', 'success');
    e.preventDefault();
});