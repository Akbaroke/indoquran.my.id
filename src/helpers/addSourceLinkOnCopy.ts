export default function addSourceLinkOnCopy(): void {
  document.addEventListener('copy', (e: ClipboardEvent) => {
    const copiedText = window.getSelection()?.toString() || '';

    const sourceLink = `\n\nSumber: ${window.location.href}`;
    const finalText = copiedText + sourceLink;

    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', finalText);
    }

    if (e.preventDefault) {
      e.preventDefault();
    }
  });
}
