/** Cz Selection Library
 * @author		Jan Pecha <janpecha@email.cz>, 2013
 * @license		New BSD License
 * @version		2013-02-25-7
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
	
	// TODO: aby zustal vybran jen uzivatelem vybrany text a ne i prefix|suffix
	// TODO: nastaveni pozice kurzoru
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

