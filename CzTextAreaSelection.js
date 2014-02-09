/**
 * Cz Selection Library
 *
 * @author		Jan Pecha <janpecha@email.cz>, 2013
 * @license		New BSD License
 */

var Cz;
(function (Cz) {
	var TextAreaSelection = (function () {
		function TextAreaSelection(textarea) {
			this.textarea = textarea;
		}
		TextAreaSelection.prototype.getText = function () {
			return Cz.Selection.getText(this.textarea);
		};

		TextAreaSelection.prototype.getLines = function () {
			return Cz.Selection.getLines(this.textarea);
		};

		TextAreaSelection.prototype.insert = function (text, pos, selectInsertedText) {
			return Cz.Selection.insert(this.textarea, text, pos, selectInsertedText);
		};

		TextAreaSelection.prototype.replace = function (text, alwaysReplace, selectReplacedText) {
			return Cz.Selection.replace(this.textarea, text, alwaysReplace, selectReplacedText);
		};

		TextAreaSelection.prototype.replaceLines = function (text, alwaysReplace, selectReplacedText) {
			return Cz.Selection.replaceLines(this.textarea, text, alwaysReplace, selectReplacedText);
		};

		TextAreaSelection.prototype.wrap = function (prefix, suffix, selectAll) {
			Cz.Selection.wrap(this.textarea, prefix, suffix, selectAll);
		};

		TextAreaSelection.prototype.unwrap = function (prefix, suffix) {
			Cz.Selection.unwrap(this.textarea, prefix, suffix);
		};

		TextAreaSelection.prototype.wrapLines = function (prefix, suffix, ignoreSpaces) {
			Cz.Selection.wrapLines(this.textarea, prefix, suffix, ignoreSpaces);
		};

		TextAreaSelection.prototype.unwrapLines = function (prefix, suffix, ignoreSpaces) {
			Cz.Selection.unwrapLines(this.textarea, prefix, suffix, ignoreSpaces);
		};

		TextAreaSelection.prototype.getLength = function () {
			return Cz.Selection.getLength(this.textarea);
		};

		TextAreaSelection.prototype.focus = function () {
			this.textarea.focus();
		};

		return TextAreaSelection;
	})();
	Cz.TextAreaSelection = TextAreaSelection;
})(Cz || (Cz = {}));

