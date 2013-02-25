/** Cz Selection Library
 * @author		Jan Pecha <janpecha@email.cz>, 2013
 * @license		New BSD License
 * @version		2013-02-25-1
 */

var Cz = Cz || {};
Cz.Selection = Cz.Selection || {};

Cz.Selection.getText = function (textarea) {
	return textarea.value.substr(textarea.selectionStart, (textarea.selectionEnd - textarea.selectionStart));
};

