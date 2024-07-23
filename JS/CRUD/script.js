import User from './Modules/users.js';

//------- DEFINES
let fName = document.querySelector('.fname');
let lName = document.querySelector('.lname');
let eMail = document.querySelector('.email');
let password = document.querySelector('.password');
let submit = document.querySelector('.submit');
let userTableBody = document.querySelector('.userTableBody');
let registerForm = document.querySelector('.register-form');

let loginForm = document.querySelector('.login-form');
let loginClick = document.querySelector('.login-switch');
let loginButton = document.querySelector('.login-button');
let loginEmail = document.querySelector('.login-email');
let loginPassword = document.querySelector('.login-password');

let loginSwitch = false;
let users = JSON.parse(localStorage.getItem('users')) || [];

//------- EVENTS
loginClick.addEventListener('click', (e) => {
    switchLogin();
});
submit.addEventListener('click', (e) => {
    e.preventDefault();

    const newUser = new User(fName.value, lName.value, eMail.value, password.value, false);
    users.push(newUser);
    
    addUserToTable(newUser, users.length - 1);
    usersUpdate();
    resetValues();
});

loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    let foundUsers = users.filter((user) => user.email === loginEmail.value.trim() && user.password === loginPassword.value);
    if (foundUsers.length > 0) {
        if(foundUsers[0].loggedIn){
            alert("You are already logged in!");
        }
        else{
            foundUsers[0].loggedIn = true;  
            usersUpdate();
            loadUsers();
            alert("Login successful");
            switchLogin();
        }
    } else {
        alert("Incorrect email or password");
    }
});

userTableBody.addEventListener('click', (e) => {
    const index = parseInt(e.target.dataset.index, 10);
    if (e.target.classList.contains('delete')) {
        
        users.splice(index, 1);
        usersUpdate();
        loadUsers(); 
    }
    else if (e.target.classList.contains('edit')) {
        const row = e.target.closest('tr'); 
        const cells = row.querySelectorAll('td'); 
        
        cells.forEach((cell, idx) => {
            if (idx < cells.length - 1) {
                const currentValue = cell.textContent; 
                cell.innerHTML = `<input type="text" class="ulist-container-input" value="${currentValue}">`; 
            }
        });

        e.target.textContent = 'שמור';
        e.target.classList.remove('edit'); 
        e.target.classList.add('save'); 
    }

    else if (e.target.classList.contains('save')) {
        const row = e.target.closest('tr'); 
        const cells = row.querySelectorAll('td'); 
        
      
        const updatedUser = {
            firstname: cells[0].querySelector('input').value,
            lastname: cells[1].querySelector('input').value,
            email: cells[2].querySelector('input').value,
            password: cells[3].querySelector('input').value,
            loggedIn: false 
        };
        
        users[index] = updatedUser; 
        usersUpdate();
        loadUsers(); 
    }
    
    else if (e.target.classList.contains('logout')) {
        users[index].loggedIn = false;
        usersUpdate();
        loadUsers();
    }
});



//------ FUNCTIONS
const switchLogin = () => {
    if(!loginSwitch){
        registerForm.style.display = 'none';
        loginForm.style.display = 'flex';
        loginClick.textContent  = "!אין לך משתמש? הירשם"
        loginSwitch = true;
    }
    else {
        registerForm.style.display = 'flex';
        loginForm.style.display = 'none';
        loginClick.textContent  = "התחברות";
        loginSwitch = false;       
    }
}
const usersUpdate = () => {
    localStorage.setItem('users', JSON.stringify(users));
}

const addUserToTable = (user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>
            <button class="delete" data-index="${index}">מחק</button>
            <button class="edit" data-index="${index}">עריכה</button>
            ${user.loggedIn ? `<button class="logout" data-index="${index}">התנתק</button>` : ''}
        </td>
    `;
    userTableBody.appendChild(row);
}

const resetValues = () => {
    fName.value = '';
    lName.value = '';
    eMail.value = '';
    password.value = '';
};

const loadUsers = () => {
    userTableBody.innerHTML = ''; // Clear existing rows
    users.forEach((user, index) => {
        addUserToTable(user, index);
    });
}

loadUsers();
