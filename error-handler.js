// error-handler.js
class ErrorBoundary {
    static init() {
        window.addEventListener('error', (e) => this.handleGlobalError(e));
        window.addEventListener('unhandledrejection', (e) => this.handlePromiseRejection(e));
    }
    
    static handleGlobalError(event) {
        event.preventDefault();
        console.error('Application error:', event.error);
        this.showErrorToast(
            'Application Error',
            'Please refresh the page. ' + (event.error ? event.error.message : 'Unknown error')
        );
    }
    
    static handlePromiseRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        this.showErrorToast('System Error', 'An async operation failed.');
    }
    
    static showErrorToast(title, message) {
        const existing = document.querySelector('.error-toast');
        if(existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.innerHTML = `
            <div class="error-toast-content">
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <strong>${title}</strong>
                    <p>${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="background:none;border:none;color:white;cursor:pointer;">&times;</button>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => { if(toast.parentNode) toast.remove() }, 8000);
    }
}