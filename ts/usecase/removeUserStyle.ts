const USER_STYLE_QUERY = 'link[rel="stylesheet"][href^="https://usercss.blog.st-hatena.com/blog_style/"]';

/**
 * remove original user style
 */
export function removeUserStyle() {
    document.querySelector<HTMLLinkElement>(USER_STYLE_QUERY)?.remove();
}
