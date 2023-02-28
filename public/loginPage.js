'use strict'

const userForm = new UserForm();

UserForm.loginFormCallback = (data)=>{
    const loginCallback = (response)=> {
        if(response.success === true) {
            location.reload();
        } else {
            UserForm.setLoginErrorMessage(response.error)
        }
    }
    ApiConnector.login(data, loginCallback);
}

UserForm.registerFormCallback = (data)=>{
    const registerCallback = (response)=> {
        if(response.success === true) {
            location.reload();
        } else {
            UserForm.setRegisterErrorMessage(response.error)
        }
    }
    ApiConnector.register(data, registerCallback);
}

