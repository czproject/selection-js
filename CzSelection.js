/** Cz Selection Library
 * @author		Jan Pecha <janpecha@email.cz>, 2013
 * @license		New BSD License
 * @version		2013-02-25-10
 */

var Cz = Cz || {};
Cz.Selection = Cz.Selection || {};

Cz.Selection.getText = function (textarea) {
	return textarea.value.substring(this.getStartPos(textarea), this.getEndPos(textarea));
};


Cz.Selection.getLines = function (textarea) {
	var startPos = this.getStartLinePos(textarea);
	var endPos = this.getEndLinePos(textarea);
	
	return textarea.value.substring(startPos, endPos).replace("\r", '').split("\n");
};


Cz.Selection.insert = function (textarea, pos, text) {
	textarea.value = textarea.value.substring(0, pos) +
		text +
		textarea.value.substring(pos);
};


Cz.Selection.wrap = function (textarea, prefix, suffix) {
	var start = this.getStartPos(textarea);
	var end = this.getEndPos(textarea);
	
	textarea.value = textarea.value.substring(0, start) +
		prefix +
		textarea.value.substring(start, end)
		+ suffix
		+ textarea.value.substring(end);
	
	// TODO: aby zustal vybran jen uzivatelem vybrany text a ne i prefix|suffix (nastaveni pozice kurzoru)
};


Cz.Selection.unwrap = function (textarea, prefix, suffix) {
	var start = this.getStartPos(textarea);
	var end = this.getEndPos(textarea);
	var value = textarea.value;
	
	// normalize start
	var io = value.substring(start - prefix.length, start + prefix.length).indexOf(prefix);
	if(io >= 0)
	{
		if((start - prefix.length) < 0)
		{
			start += (start - prefix.length) * -1;
		}
		
		start += io;
	}
	
	// normalize end
	var io = value.substring(end - suffix.length, end + suffix.length).indexOf(suffix);
	if(io >= 0)
	{
		end -= (suffix.length - io);
	}
	
	var first = textarea.value.substring(0, start);
	var second = textarea.value.substring(end);
	
	var prefixPos = first.lastIndexOf(prefix);
	var suffixPos = second.indexOf(suffix);
	
	textarea.value = first.substring(0, prefixPos) +
		first.substring(prefixPos + prefix.length) +
		textarea.value.substring(start, end) +
		second.substring(0, suffixPos) +
		second.substring(suffixPos + suffix.length);
	// TODO: aby zustal vybran jen uzivatelem vybrany text a ne i prefix|suffix (nastaveni pozice kurzoru)
};


Cz.Selection.wrapLines = function (textarea, prefix, suffix, ignoreSpaces) {
	if(typeof ignoreSpaces === "undefined")
	{
		ignoreSpaces = true;
	}
	
	// convert to (bool)
	ignoreSpaces = !!ignoreSpaces;
	
	var start = this.getStartLinePos(textarea);
	var end = this.getEndLinePos(textarea);
	var lines = this.getLines(textarea);
	var res = new Array();
	var first = textarea.value.substring(0, start - 1);
	
	if(first != '')
	{
		res.push(first);
	}
	
	for(var i = 0; i < lines.length; i++)
	{
		if(!ignoreSpaces)
		{
			res.push(prefix + lines[i] + suffix);
		}
		else
		{
			var trimed = this.trim(lines[i]);
			
			if(trimed == '') // ignore empty lines
			{
				res.push(lines[i]);
				continue;
			}
			
			var trimedLen = trimed.length;
			var firstCharPos = lines[i].indexOf(trimed[0]);
			trimed = prefix + trimed + suffix;
			trimed = lines[i].substring(0, firstCharPos) + trimed;
			trimedLen += firstCharPos;
			trimed += lines[i].substring(trimedLen);
			
			res.push(trimed);
		}
	}
	
	first = textarea.value.substring(end + 1);
	
	if(first != '')
	{
		res.push(first);
	}
	
	textarea.value = res.join("\n");
	// TODO: aby zustal vybran jen uzivatelem vybrany text a ne i prefix|suffix (nastaveni pozice kurzoru)
};


Cz.Selection.getStartPos = function (textarea) {
	return textarea.selectionStart;
};


Cz.Selection.getEndPos = function (textarea) {
	return textarea.selectionEnd;
};


Cz.Selection.getLength = function (textarea) {
	return this.getEndPos(textarea) - this.getStartPos(textarea);
};


Cz.Selection.getStartLinePos = function (textarea) {
	return textarea.value.substring(0, this.getStartPos(textarea)).lastIndexOf("\n") + 1;
};


Cz.Selection.getEndLinePos = function (textarea) {
	var selEndPos = this.getEndPos(textarea);
	return selEndPos + textarea.value.substring(selEndPos).indexOf("\n");
};


Cz.Selection.trim = function (str) {
	if(String.prototype.trim)
	{
		return str.trim();
	}
	
	return str.replace(/^\s+|\s+$/g,'');
};

