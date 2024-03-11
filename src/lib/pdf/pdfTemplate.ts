export const pdfTemplate = (
  content: string 
) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          
            <title>Document</title>
        </head>
        
        <body>
          <style>   
            @media print body {
              font-size: 16px;
              color: lightgrey;
            }
    
            @media print .no-break-inside {
              /* apply this class to every component that shouldn't be cut off between two pages of the PDF */
              break-inside: avoid;
            }
    
            @media print .break-before {
              /* apply this class to every component that should always display on the next page */
              break-before: always;
            }

            .vega.alignLeft h1 {
              text-align: left;
            }

            .vega.alignCenter h1 {
              text-align: center;
            }

            .vega.alignRight h1 {
              text-align: right;
            }

            .vega.fontSm h1 {
              font-size: 27px; 
            }

            .vega.fontSm h2 {
              font-size: 18px;
            }

            .vega.fontSm h3 {
              font-size: 15px;
            }

            .vega.fontSm p {
              font-size: 12px;
            }

            .vega.fontBase h1 {
              font-size: 28.8px; 
            }

            .vega.fontBase h2 {
              font-size: 19.2px;
            }

            .vega.fontBase h3 {
              font-size: 16px;
            }

            .vega.fontBase p {
              font-size: 12.8px;
            }

            /* medium */

            .vega.fontMd h1 {
              font-size: 32.4px; 
            }

            .vega.fontMd h2 {
              font-size: 21.6px;
            }

            .vega.fontMd h3 {
              font-size: 18px;
            }

            .vega.fontMd p {
              font-size: 14.4px;
            }

            .vega.fontLg h1 {
              font-size: 36px; 
            }

            .vega.fontLg h2 {
              font-size: 24px;
            }

            .vega.fontLg h3 {
              font-size: 20px;
            }

            .vega.fontLg p {
              font-size: 16px;
            }

            .vega.spacingSm {
              line-height: 1.2;
            }

            .vega.spacingBase {
              line-height: 1.5;
            }

            .vega.spacingMd {
              line-height: 1.7;
            }

            .vega.spacingLg {
              line-height: 2;
            }

            .vega.column-1-2 {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              grid-row: 1;
              gap: 20px
            }

            .vega.column-1-2 div:nth-child(1) {
              grid-column: span 1 / span 1;
            }

            .vega.column-1-2 div:nth-child(2) {
              grid-column: span 2 / span 2;
            }

            .vega.column-1-1 {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              grid-row: 1;
              gap: 20px
            }

            .vega.column-1-1 div:nth-child(1) {
              grid-column: span 1 / span 1;
            }

            .vega.column-1-1 div:nth-child(2) {
              grid-column: span 1 / span 1;
            }

            .vega.column-2-1 {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              grid-row: 1;
              gap: 20px
            }

            .vega.column-2-1 div:nth-child(1) {
              grid-column: span 2 / span 2;
            }

            .vega.column-2-1 div:nth-child(2) {
              grid-column: span 1 / span 1;
            }

            .vega hr {
              width: 50%;
              margin: 0;
            }

            .vega h1 {
              padding-bottom: 5px;
              position: relative;
            }

            .vega h1:after {
              content: "";
              background: black;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega h1 b, .vega h1 strong {
              font-weight: 700;
            }

            b, strong {
              font-weight: 500;
            }

            .vega h2 {
              padding-bottom: 4px;
              margin-top: 19.2px;
              position: relative;
            }

            .vega h2:after {
              content: "";
              background: black;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega h3 {
              margin-top: 8px;
            }

            .vega p {
              margin-top: 6.4px;
              margin-bottom: 0;
            }

            .vega ul {
              list-style-type: "-";
              list-style-position: outside;
              padding-left: 12px;
              margin: 0;
              display: block;
            }

            .vega li {
              padding-left: 15px;
            }

            .vega table {
              width: 100%;
            }

            .vega strong {
              font-weight: 500;
            }

            .vega table td {
              justify-content: center;
            }

            .vega table p {
              margin: 0;
            }

            .vega table h3 {
              margin: 0;
            }

            .vega td:nth-last-child(1) {
              text-align: right;
            }

            .vega hr {
              border: 1px solid #ddd9d9;
            }

            .vega code {
              background-color: rgba(46, 204, 113, 0.15);
              color: #1b7943;
              padding: 4px 6px;
              border-radius: 10%;
            }
          </style>
          <main class="w-[800px] mx-auto p-[20px] ">
            <div>
              ${content}
            </div>
          </main>
        </body>
        <script src="https://cdn.tailwindcss.com" ></script>
      </html>
  `;
};