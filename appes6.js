class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}


class UI{
    addBookToList(book){
        const list=document.getElementById('book-list');
        //create tr element
        const row=document.createElement('tr');
        //insert column
        row.innerHTML='<td>'+book.title+'</td> <td>'+book.author+'</td><td>'+book.isbn+'</td><td><a href="#" class="delete">X</a></td>';
        list.appendChild(row);
    }

    deletebook(target){
        if(target.className==='delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }

    showAlert(msg,className){
        //create div
        const div=document.createElement('div');
        //add class
        div.className='alert '+className;
        //add text
        div.appendChild(document.createTextNode(msg));
        //get parent
        const container=document.querySelector('.container');
        //get form
        const form=document.querySelector('#book-form');
        //insert alert
        container.insertBefore(div,form);
        //timeout after 3sec
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);
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