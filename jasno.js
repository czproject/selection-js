/** .jasno - a tiny JavaScript framework
 * 
 * @author		Jan Pecha, <janpecha@email.cz>
 * @version		2013-02-25-1
 * @license		New BSD License
 */

var Jasno = Jasno || {};

/****** HTML Class Operations ******/
/**
 * @param	HTMLElement
 * @param	String
 * @return	void
 */
Jasno.addClass = function(el, classNm) {
	if(!el.className)
	{
		el.className = classNm;
	}
	else
	{
		el.className = el.className + ' ' + classNm;
	}
}

/**
 * @param	HTMLElement
 * @param	String
 * @return	void
 */
Jasno.removeClass = function(el, classNm) {
	if(el.className)
	{
		while((pos = el.className.indexOf(classNm)) >= 0)
		{
			el.className = el.className.slice(0, pos) + el.className.slice(pos + classNm.length);
		}
	}
}

/**
 * @param	HTMLElement
 * @param	String
 * @return	bool
 */
Jasno.hasClass = function(el, classNm) {
	return (' ' + el.className + ' ').indexOf(' ' + classNm + ' ') > -1;
}



/****** Events ******/
/**
 * @param	event
 * @return	FALSE
 */
Jasno.cancelEvent = function(e) {
	e = e ? e : window.event;

	if(e.stopPropagation)
	{
		e.stopPropagation();
	}	

	if(e.preventDefault)
	{
		e.preventDefault();
	}

	e.cancelBubble = true;
	e.cancel = true;
	e.returnValue = false;

	return false;
}

/**
 * @param	HTMLElement
 * @param	String  event type (click, etc.)
 * @param	handler
 * @return	bool
 */
Jasno.addEvent = function(el, type, handler) {
	if(el.addEventListener)
	{
		el.addEventListener(type, handler, false);
		return true;
	}
	else
	{
		if(el.attachEvent)
		{
			return el.attachEvent('on' + type, handler);
		}
	}
	return false;
}

/**
 * @param	event
 * @return	HTMLElement
 */
Jasno.getSrcElement = function(e){
	if(window.event)
	{
		return event.srcElement;
	}
	else
	{
		return e.target;	//event.target (OP, FF)
	}
}



/****** CSS ******/
/**
 * @param	HTMLElement
 * @param	String
 * @return	String
 */
Jasno.getCss = function(el, propertyName) {
	if (obj.currentStyle)
	{
		return obj.currentStyle[styleProperty];
	}
	else if (window.getComputedStyle)
	{
		return document.defaultView.getComputedStyle(obj, null).getPropertyValue(styleProperty);
	}
}


/****** Language ******/
/**
 * @link	http://jspro.com/raw-javascript/testing-for-empty-values/
 * @param	mixed
 * @return	bool
 */
Jasno.empty = function (data) {
	if(typeof(data) == 'number' || typeof(data) == 'boolean')
	{ 
		return false; 
	}
	
	if(typeof(data) == 'undefined' || data === null)
	{
		return true; 
	}
	
	if(typeof(data.length) != 'undefined')
	{
		return data.length == 0;
	}
	
	var count = 0;
	for(var i in data)
	{
		if(data.hasOwnProperty(i))
		{
			count ++;
		}
	}
	
	return count == 0;
}

