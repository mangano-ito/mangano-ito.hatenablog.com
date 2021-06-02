import BlogConfig from '../../blog.config';

/**
 * validate configuration
 */
export function validate() {
    if (!BlogConfig.origin) {
        throw new Error('Your original blog URL is not set. Check blog.config.ts.');
    }
}
