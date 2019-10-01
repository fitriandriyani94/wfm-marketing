class AuthenticationService {
    registerSuccessfulLogin(username, password, role) {
        sessionStorage.setItem('authenticatedUser', username);
        sessionStorage.setItem('authenticatedRole', role);
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user === null) return false
        return true
    }

    isAdminLoggedIn() {
        let role = sessionStorage.getItem('authenticatedRole')
        let user = sessionStorage.getItem('authenticatedUser')
        if(role === "KBG" && user !== null) return true
        return false
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user === null) {
            return ''
        } else {
            return user
        }
    }
}

export default new AuthenticationService()