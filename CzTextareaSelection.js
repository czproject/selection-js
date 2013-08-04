
var Cz;
(function (Cz) {
	var TextareaSelection = (function () {
		function TextareaSelection(textarea) {
			this.textarea = textarea;
		}
		TextareaSelection.prototype.getText = function () {
			return Cz.Selection.getText(this.textarea);
		};

		TextareaSelection.prototype.getLines = function () {
			return Cz.Selection.getLines(this.textarea);
		};

		TextareaSelection.prototype.insert = function (text, pos) {
			return Cz.Selection.insert(this.textarea, text, pos);
		};

		TextareaSelection.prototype.replace = function (text, alwaysReplace) {
			return Cz.Selection.replace(this.textarea, text, alwaysReplace);
		};

		TextareaSelection.prototype.wrap = function (prefix, suffix) {
			Cz.Selection.wrap(this.textarea, prefix, suffix);
		};

		TextareaSelection.prototype.unwrap = function (prefix, suffix) {
			Cz.Selection.unwrap(this.textarea, prefix, suffix);
		};

		TextareaSelection.prototype.wrapLines = function (prefix, suffix, ignoreSpaces) {
			Cz.Selection.wrapLines(this.textarea, prefix, suffix, ignoreSpaces);
		};

		TextareaSelection.prototype.unwrapLines = function (prefix, suffix, ignoreSpaces) {
			Cz.Selection.unwrapLines(this.textarea, prefix, suffix, ignoreSpaces);
		};

		TextareaSelection.prototype.getStartPos = function () {
			return Cz.Selection.getStartPos(this.textarea);
		};

		TextareaSelection.prototype.getEndPos = function () {
			return Cz.Selection.getEndPos(this.textarea);
		};

		TextareaSelection.prototype.getLength = function () {
			return Cz.Selection.getLength(this.textarea);
		};
		
		TextareaSelection.prototype.focus = function () {
			return this.textarea.focus();
		};
		
		return TextareaSelection;
	})();
	Cz.TextareaSelection = TextareaSelection;
})(Cz || (Cz = {}));

