// security-manager.js
class SecurityManager {
    static allowedTags = ['div', 'p', 'b', 'i', 'ul', 'li', 'br', 'strong', 'em', 'span', 'h2', 'h3', 'h4'];
    
    // Basic HTML sanitizer for client-side use without heavy libraries
    static sanitizeHTML(input) {
        if (!input) return '';
        // Create a dummy element
        const div = document.createElement('div');
        // Set content
        div.innerHTML = input;
        
        // Recursively clean nodes
        this.cleanNodes(div);
        
        return div.innerHTML;
    }

    static cleanNodes(element) {
        const nodes = element.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];
            if (node.nodeType === 1) { // Element node
                if (!this.allowedTags.includes(node.tagName.toLowerCase())) {
                    node.remove();
                } else {
                    // Remove all attributes except class and style
                    Array.from(node.attributes).forEach(attr => {
                        if (!['class', 'style'].includes(attr.name)) {
                            node.removeAttribute(attr.name);
                        }
                    });
                    this.cleanNodes(node);
                }
            }
        }
    }
    
    static validateDataStructure(data) {
        const requiredKeys = ['title', 'tags', 'content'];
        for (const [key, value] of Object.entries(data)) {
            if (!value || typeof value !== 'object') {
                console.warn(`Invalid data structure for key: ${key}`);
                continue;
            }
            for (const req of requiredKeys) {
                if (!value.hasOwnProperty(req)) {
                    console.error(`Missing required property "${req}" in ${key}`);
                }
            }
        }
        return true;
    }
}