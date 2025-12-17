// security-manager.js
class SecurityManager {
    static config = {
        // Strict allowlist: 'style' removed to prevent CSS injection vectors in content
        ALLOWED_ATTR: ['class', 'id', 'aria-label', 'role', 'tabindex', 'target', 'href'],
        ALLOWED_TAGS: ['div', 'p', 'b', 'i', 'ul', 'li', 'br', 'strong', 'em', 'span', 'h2', 'h3', 'h4', 'table', 'tr', 'td', 'th', 'a'],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
        FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form'],
        FORBID_ATTR: ['style', 'onmouseover', 'onclick'],
        USE_PROFILES: { html: true }
    };

    static sanitizeHTML(input) {
        if (!input) return '';
        if (typeof input !== 'string') return '';

        if (window.DOMPurify) {
            return window.DOMPurify.sanitize(input, this.config);
        }

        console.error('CRITICAL: DOMPurify failed to load. Content blocked.');
        return '<i>Content blocked for security.</i>';
    }
    
    static validateDataStructure(data) {
        if (!data || !data.metadata) {
            console.error("Security: Missing metadata/versioning in data source.");
            return false;
        }
        return true;
    }
}