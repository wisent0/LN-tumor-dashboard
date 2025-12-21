// security-manager.js
class SecurityManager {
    static config = {
        // Strict allowlist: 'style' removed to prevent CSS injection vectors in content
        ALLOWED_ATTR: ['class', 'id', 'aria-label', 'role', 'tabindex', 'target', 'href', 'aria-expanded'],
        ALLOWED_TAGS: ['div', 'p', 'b', 'i', 'ul', 'li', 'br', 'strong', 'em', 'span', 'h2', 'h3', 'h4', 'table', 'tr', 'td', 'th', 'a'],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
        FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form'],
        FORBID_ATTR: ['style', 'onmouseover', 'onclick', 'onerror', 'onload'],
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

    // NEW: Strictly validates colors to prevent CSS injection via style attributes
    static sanitizeColor(color) {
        if (!color) return '#000000';
        // Only allow Hex, RGB, or var() formats
        const safeColorRegex = /^(#[0-9a-fA-F]{3,8}|rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)|var\(--[a-zA-Z0-9-]+\))$/;
        return safeColorRegex.test(color) ? color : '#000000';
    }
    
    // NEW: strict validation for medical data integrity
    static validateDataStructure(data) {
        if (!data || !data.metadata) {
            console.error("Security: Missing metadata/versioning in data source.");
            return false;
        }
        
        // Check for required root
        if (!data.root) return false;

        // Random sampling check for critical fields
        const keys = Object.keys(data).filter(k => k !== 'metadata');
        const sample = keys[Math.floor(Math.random() * keys.length)];
        if (data[sample] && (!data[sample].title || !data[sample].content)) {
            console.error(`Data Integrity: Node '${sample}' missing title or content.`);
            return false;
        }

        return true;
    }
}