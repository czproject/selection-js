/** Cz Selection Library
 * @author		Jan Pecha <janpecha@email.cz>, 2013
 * @license		New BSD License
 * @version		2013-02-25-4
 */

var Cz = Cz || {};
Cz.Selection = Cz.Selection || {};

Cz.Selection.getText = function (textarea) {
	return textarea.value.substring(this.getStartPos(textarea), this.getEndPos(textarea));
};


Cz.Selection.getLines = function (textarea) {
	var selEndPos = this.getEndPos(textarea);
	var startPos = textarea.value.substring(0, this.getStartPos(textarea)).lastIndexOf("\n");
	var endPos = selEndPos + textarea.value.substring(selEndPos).indexOf("\n");
	
	return textarea.value.substring(startPos + 1, endPos).replace("\r", '').split("\n");
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

