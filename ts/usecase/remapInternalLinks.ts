import BlogConfig from '../../blog.config';

/**
 * remap internal links to their localhost counterparts
 * so that visitors won't go out of the test environment
 */
export function remapInternalLinks() {
    const anchors = document.querySelectorAll<HTMLAnchorElement>(`a[href^="${BlogConfig.origin}"]`);
    anchors.forEach(anchor => {
        anchor.href = window.location.origin + anchor.pathname;
    });
}
