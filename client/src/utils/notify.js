import {Notyf} from "notyf";
import 'notyf/notyf.min.css';

/**
 *
 * @param type
 * @param message
 * @param duration
 * @param x
 * @param y
 * @returns {Notyf}
 */
export default function(type, message,duration=4000,x='rigth',y='bottom'){
    const notyf = new Notyf({
        duration: duration,
        position: {
            x: x,
            y: y,
        }
    });

    if(type === 'error'){
        return notyf.error(message);
    }else if(type === 'success'){
        return notyf.success(message);
    }
}