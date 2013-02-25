/** Cz Selection Library
 * @author		Jan Pecha <janpecha@email.cz>, 2013
 * @license		New BSD License
 * @version		2013-02-25-3
 */

var Cz = Cz || {};
Cz.Selection = Cz.Selection || {};

Cz.Selection.getText = function (textarea) {
	return textarea.value.substring(this.getStartPos(textarea), this.getEndPos(textarea));
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

