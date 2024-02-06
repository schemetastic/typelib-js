import {type} from "./lib/type";
import {typeErrorIf} from "./lib/type-error-if";



// Add to `window` if possible 
(function addToWindowScope(){
	try{
		window.type = type;
		window.typeErrorIf = typeErrorIf;
	} catch{}
})()


export {type, typeErrorIf};