// Imports
import decode from 'jwt-decode';

class AuthService {
    // Retrieve saved data from token
    getProfile() {
        return decode(this.getToken());
    }
    // Check if the user is still logged in
    loggedIn() {
        // Checks if saved token/if saved token is valid
        const token = this.getToken();
        // Use type coercion to check if token is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }
    // Check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
    // Retrieve token from local storage
    getToken() {
        return localStorage.getItem('id_token');
    }
    // Set token to local storage and load homepage
    login(idToken) {
        // Saves token to local storage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }
    // Clear token from local storage and force logout with reload
    logout() {
        // Clear token and profile data from local storage
        localStorage.removeItem('id_token');
        // Reload and reset
        window.location.assign('/');
    }
}

export default new AuthService();
