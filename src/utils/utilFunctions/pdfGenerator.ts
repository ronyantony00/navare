import jsPDF from 'jspdf';

interface PDFContent {
  title?: string;
  content: any[];
}

export const generatePDF = (pageContent: PDFContent, filename: string = 'document.pdf') => {
  if (!pageContent || !pageContent.content) {
    return;
  }

  // eslint-disable-next-line new-cap
  const PDFDocument = new jsPDF();

  // Add title
  PDFDocument.setFontSize(20);
  PDFDocument.setFont('helvetica', 'bold');
  PDFDocument.text(pageContent.title || 'Document', 20, 20);

  // Add content
  PDFDocument.setFontSize(12);
  PDFDocument.setFont('helvetica', 'normal');

  // Convert rich text content to PDF - improved to capture all content types
  let currentY = 40;

  if (pageContent.content && Array.isArray(pageContent.content)) {
    pageContent.content.forEach((block: any) => {
      if (block.type === 'heading' && block.children) {
        // Handle headings
        let headingText = '';
        block.children.forEach((child: any) => {
          if (child.text) {
            headingText += child.text;
          }
        });

        if (headingText.trim()) {
          // Add heading with larger font
          PDFDocument.setFontSize(16);
          PDFDocument.setFont('helvetica', 'bold');
          PDFDocument.text(headingText.trim(), 20, currentY);
          currentY += 8; // Reduced from 15 to 8 for tighter spacing

          // Reset to normal font for content
          PDFDocument.setFontSize(12);
          PDFDocument.setFont('helvetica', 'normal');
        }
      } else if (block.type === 'paragraph' && block.children) {
        // Handle paragraphs
        let paragraphText = '';
        block.children.forEach((child: any) => {
          if (child.text) {
            paragraphText += child.text;
          }
        });

        if (paragraphText.trim()) {
          // Split text to fit page width
          const splitText = PDFDocument.splitTextToSize(paragraphText.trim(), 170);

          // Check if we need a new page
          if (currentY + (splitText.length * 7) > 280) {
            PDFDocument.addPage();
            currentY = 20;
          }

          PDFDocument.text(splitText, 20, currentY);
          currentY += (splitText.length * 7); // Reduced from 5 to 2 for tighter paragraph spacing
        }
      } else if (block.type === 'list' && block.children) {
        // Handle lists
        block.children.forEach((listItem: any) => {
          if (listItem.children) {
            let itemText = '';
            listItem.children.forEach((child: any) => {
              if (child.text) {
                itemText += child.text;
              }
            });

            if (itemText.trim()) {
              const bulletText = `• ${itemText.trim()}`;
              const splitText = PDFDocument.splitTextToSize(bulletText, 160);

              // Check if we need a new page
              if (currentY + (splitText.length * 7) > 280) {
                PDFDocument.addPage();
                currentY = 20;
              }

              PDFDocument.text(splitText, 25, currentY);
              currentY += (splitText.length * 7) + 3;
            }
          }
        });
      } else if (block.type === 'quote' && block.children) {
        // Handle quotes
        let quoteText = '';
        block.children.forEach((child: any) => {
          if (child.text) {
            quoteText += child.text;
          }
        });

        if (quoteText.trim()) {
          const splitText = PDFDocument.splitTextToSize(`"${quoteText.trim()}"`, 160);

          // Check if we need a new page
          if (currentY + (splitText.length * 7) > 280) {
            PDFDocument.addPage();
            currentY = 20;
          }

          PDFDocument.text(splitText, 25, currentY);
          currentY += (splitText.length * 7) + 5;
        }
      }
    });
  }

  // Save the PDF
  PDFDocument.save(filename);
};
