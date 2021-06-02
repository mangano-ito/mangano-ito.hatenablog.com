import { removeUserStyle } from "./usecase/removeUserStyle";
import { remapInternalLinks } from "./usecase/remapInternalLinks";
import { log } from './usecase/log';
import '../postcss/main.pcss';
import { validate } from "./usecase/validate";

validate();
removeUserStyle();
remapInternalLinks();
log();
