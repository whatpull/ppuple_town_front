// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

// 혼합(Vue, Context) 주입
export default ({ app }, inject) => {
    // v4 : Create a version 4 (random) UUID
    inject('uuidv4', uuidv4);
}