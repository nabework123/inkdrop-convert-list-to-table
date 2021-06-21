"use babel";

const tableTemplate = `
|Title|Status|
|---|---|
`;
const listCharsReg = /[-ー*+]/;

function convert() {
  const editor = inkdrop.getActiveEditor();
  if (editor) {
    const cm = editor.cm;
    const selectedTextList = cm.getSelections("\n");
    console.debug(selectedTextList);
    const convertedTextList = selectedTextList.map((selectedText) => {
      const convertedText = selectedText
        .split("\n")
        .map((line) => {
          return `|${line.replace(listCharsReg, "").trim()}||`;
        })
        .join("\n");
      return `${tableTemplate}${convertedText}\n`;
    });
    cm.replaceSelections(convertedTextList);
  } else {
    console.info("no active editor");
  }
}

module.exports = {
  activate() {
    this.subscription = inkdrop.commands.add(document.body, {
      "convert-list-to-table": () => convert(),
    });
  },

  deactivate() {
    this.subscription.dispose();
  },
};
