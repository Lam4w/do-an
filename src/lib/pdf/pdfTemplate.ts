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

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">

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

            body {
              max-width: 100vw;
              overflow-x: hidden;
            }
            
            .container {
              padding: 0;
            }

            /* TEMPLATE 1 */

            // .indius {
            //   padding: 24px;
            // } 

            /* TITLE ALIGNMENT */

            /* left */

            .indius.alignLeft h1 {
              text-align: left;
            }

            /* center */

            .indius.alignCenter h1 {
              text-align: center;
            }

            /* right */

            .indius.alignRight h1 {
              text-align: right;
            }

            /*  FONT  */

            /* small */

            .indius.fontSm h1 {
              font-size: 48px; 
            }

            .indius.fontSm h2 {
              font-size: 18px;
            }

            .indius.fontSm h3 {
              font-size: 15px;
            }

            .indius.fontSm p {
              font-size: 12px;
            }

            /* base */

            .indius.fontBase h1 {
              font-size: 52px; 
            }

            .indius.fontBase h2 {
              font-size: 19.2px;
            }

            .indius.fontBase h3 {
              font-size: 16px;
            }

            .indius.fontBase p {
              font-size: 12.8px;
            }

            /* medium */

            .indius.fontMd h1 {
              font-size: 54px; 
            }

            .indius.fontMd h2 {
              font-size: 21.6px;
            }

            .indius.fontMd h3 {
              font-size: 18px;
            }

            .indius.fontMd p {
              font-size: 14.4px;
            }

            /* large */

            .indius.fontLg h1 {
              font-size: 55.5px; 
            }

            .indius.fontLg h2 {
              font-size: 24px;
            }

            .indius.fontLg h3 {
              font-size: 20px;
            }

            .indius.fontLg p {
              font-size: 16px;
            }

            /* SPACING */

            /* small */

            .indius.spacingSm {
              line-height: 1.2;
            }

            /* base */

            .indius.spacingBase {
              line-height: 1.5;
            }

            /* mdeium */

            .indius.spacingMd {
              line-height: 1.7;
            }

            /* large */

            .indius.spacingLg {
              line-height: 2;
            }

            /* COLLUMN LAYOUT */

            .indius.column-1-2 {
              padding: 24px;
            }

            .indius.column-1-2 {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              grid-row: 1;
            }

            .indius.column-1-2 div:nth-child(1) {
              grid-column: span 1 / span 1;
              margin-block: 24px;
              padding-inline: 24px 30px;
              height: 100%;
              border-right: 2px solid #cea52c;
            }

            .indius.column-1-2 div:nth-child(2) {
              grid-column: span 2 / span 2;
              margin-block: 24px;
              padding-inline: 30px 24px;
            }

            /* COLOR */

            /* red */

            .indius.red hr {
              border: 1.2px solid #E8384F;
              margin-block: 24px;
            }

            .indius.column-1-2.red div:nth-child(1) {
              border-right: 2px solid #E8384F;
            }

            .indius.red code {
              background-color: rgba(232, 56, 79, 0.15);
              color: #E8384F;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* orange */

            .indius.orange hr {
              border: 1.2px solid #E67E22;
              margin-block: 21px;
            }

            .indius.column-1-2.orange div:nth-child(1) {
              border-right: 2px solid #E67E22;
            }

            .indius.orange code {
              background-color: rgba(230, 126, 34, 0.15);
              color: #E67E22;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* yellow */

            .indius.yellow hr {
              border: 1.2px solid #cea52c;
              margin-block: 21px;
            }

            .indius.column-1-2.yellow div:nth-child(1) {
              border-right: 2px solid #cea52c;
            }

            .indius.yellow code {
              background-color: rgb(206, 165, 44, 0.15);
              color: #cea52c;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* green */

            .indius.green hr {
              border: 1.2px solid #A4CF30;
              margin-block: 21px;
            }

            .indius.column-1-2.green div:nth-child(1) {
              border-right: 2px solid #A4CF30;
            }

            .indius.green code {
              background-color: rgba(46, 204, 113, 0.15);
              color: #1b7943;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* blue */

            .indius.blue hr {
              border: 1.2px solid #016EF1;
              margin-block: 21px;
            }

            .indius.column-1-2.blue div:nth-child(1) {
              border-right: 2px solid #016EF1;
            }

            .indius.blue code {
              background-color: rgba(1, 110, 241, 0.15);
              color: #016EF1;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* cyan */

            .indius.cyan hr {
              border: 1.2px solid #1ABC9C;
              margin-block: 21px;
            }

            .indius.column-1-2.cyan div:nth-child(1) {
              border-right: 2px solid #1ABC9C;
            }

            .indius.cyan code {
              background-color: rgba(17, 132, 109, 0.15);
              color: #1ABC9C;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* purple */

            .indius.purple hr {
              border: 1.2px solid #7A6FF0;
              margin-block: 21px;
            }

            .indius.column-1-2.purple div:nth-child(1) {
              border-right: 2px solid #7A6FF0;
            }

            .indius.purple code {
              background-color: rgba(122, 111, 240, 0.15);
              color: #7A6FF0;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* pink */

            .indius.pink hr {
              border: 1.2px solid #E362E3;
              margin-block: 21px;
            }

            .indius.column-1-2.pink div:nth-child(1) {
              border-right: 2px solid #E362E3;
            }

            .indius.pink code {
              background-color: rgba(227, 98, 227, 0.15);
              color: #E362E3;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* gray */

            .indius.gray hr {
              border: 1.2px solid #8DA3A6;
              margin-block: 24px;
            }

            .indius.column-1-2.gray div:nth-child(1) {
              border-right: 2px solid #8DA3A6;
            }

            .indius.gray code {
              background-color: rgba(141, 163, 166, 0.15);
              color: #8DA3A6;
              padding: 4px 6px;
              border-radius: 10%;
            }

            /* black */

            .indius.black hr {
              border: 1.2px solid #222222;
              margin-block: 24px;
            }

            .indius.column-1-2.black div:nth-child(1) {
              border-right: 2px solid #222222;
            }

            .indius.black code {
              background-color: rgba(34, 34, 34, 0.15);
              color: #222222;
              padding: 4px 6px;
              border-radius: 10%;
            }

            /* GLOBAL */

            .indius hr {
              margin-block: 24px;
            }

            .indius h1 {
              padding-bottom: 5px;
              position: relative;
            }

            .indius h1 b, .indius h1 strong {
              font-weight: 700;
            }

            b, strong {
              font-weight: 500;
            }

            .indius h2 {
              padding-bottom: 4px;
              margin-top: 19.2px;
              position: relative;
            }

            .indius h3 {
              margin-top: 8px;
            }

            .indius p {
              margin-top: 6.4px;
              margin-bottom: 0;
            }

            .indius ul {
              list-style-type: disc;
              list-style-position: outside;
              padding-left: 20px;
              margin: 0;
              display: block;
            }

            .indius li {
              padding-left: 15px;
            }

            .indius table {
              width: 100%;
            }

            .indius strong {
              font-weight: 500;
            }

            .indius table td {
              justify-content: center;
            }

            .indius table p {
              margin: 0;
            }

            .indius table h3 {
              margin: 0;
            }

            .indius td:nth-child(1) {
              width: 40%;
            }

            .indius p img {
              height: 140px;
              border-radius: 4px;
              float: left;
              margin-right: 2rem;
            }

            /* TEMPLATE 2 */

            .vega {
              padding: 24px;
            }

            /* TITLE ALIGNMENT */

            /* left */

            .vega.alignLeft h1 {
              text-align: left;
            }

            /* center */

            .vega.alignCenter h1 {
              text-align: center;
            }

            /* right */

            .vega.alignRight h1 {
              text-align: right;
            }

            /*  FONT  */

            /* small */

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

            /* base */

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

            /* large */

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

            /* SPACING */

            /* small */

            .vega.spacingSm {
              line-height: 1.2;
            }

            /* base */

            .vega.spacingBase {
              line-height: 1.5;
            }

            /* medium */

            .vega.spacingMd {
              line-height: 1.7;
            }

            /* large */

            .vega.spacingLg {
              line-height: 2;
            }

            /* COLLUMN LAYOUT */

            /* 1-2 */

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

            /* 1-1 */

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

            /* 2 - 1 */

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

            /* COLOR */

            /* black */

            .vega.black h1:after, .vega.black h2:after {
              content: "";
              background: black;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega.black code {
              background-color: rgba(34, 34, 34, 0.15);
              color: #222222;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* red */

            .vega.red h1:after, .vega.red h2:after {
              content: "";
              background: #E8384F;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega.red code {
              background-color: rgba(232, 56, 79, 0.15);
              color: #E8384F;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* orange */

            .vega.orange h1:after, .vega.orange h2:after {
              content: "";
              background: #E67E22;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega.orange code {
              background-color: rgba(230, 126, 34, 0.15);
              color: #E67E22;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* yellow */

            .vega.yellow h1:after, .vega.yellow h2:after {
              content: "";
              background: #F1C40F;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega.yellow code {
              background-color: rgb(206, 165, 44, 0.15);
              color: #cea52c;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* green */

            .vega.green h1:after, .vega.green h2:after {
              content: "";
              background: #1b7943;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega.green code {
              background-color: rgba(46, 204, 113, 0.15);
              color: #1b7943;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* cyan */

            .vega.cyan h1:after, .vega.cyan h2:after {
              content: "";
              background: #1ABC9C;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega.cyan code {
              background-color: rgba(17, 132, 109, 0.15);
              color: #1ABC9C;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* blue */

            .vega.blue h1:after, .vega.blue h2:after {
              content: "";
              background: #016EF1;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega.blue code {
              background-color: rgba(1, 110, 241, 0.15);
              color: #016EF1;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* purple */

            .vega.purple h1:after, .vega.purple h2:after {
              content: "";
              background: #7A6FF0;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega.purple code {
              background-color: rgba(122, 111, 240, 0.15);
              color: #7A6FF0;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* pink */

            .vega.pink h1:after, .vega.pink h2:after {
              content: "";
              background: #E362E3;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega.pink code {
              background-color: rgba(227, 98, 227, 0.15);
              color: #E362E3;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* gray */

            .vega.gray h1:after, .vega.gray h2:after {
              content: "";
              background: #8DA3A6;
              position: absolute;
              bottom: 0;
              left: 0;
              height: 1px;
              width: 50%;
            }

            .vega.gray code {
              background-color: rgba(141, 163, 166, 0.15);
              color: #8DA3A6;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* GLOBAL */

            .vega hr {
              width: 50%;
              margin: 0;
            }

            .vega h1 {
              padding-bottom: 5px;
              position: relative;
            }

            .vega h1 b, .vega h1 strong {
              font-weight: 700;
            }

            b, strong {
              font-weight: 500;
            }

            .vega h2 {
              padding-bottom: 3px;
              margin-bottom: 1px;
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
              margin-top: 0;
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

            .vega p img {
              height: 140px;
              border-radius: 4px;
              float: left;
              margin-right: 2rem;
            }

            /* TEMPLATE gemma */

            .gemma {
              padding: 24px;
            }

            /* TITLE ALIGNMENT */

            /* left */

            .gemma.alignLeft h1 {
              text-align: left;
            }

            /* center */

            .gemma.alignCenter h1 {
              text-align: center;
            }

            /* right */

            .gemma.alignRight h1 {
              text-align: right;
            }

            /*  FONT  */

            /* small */

            .gemma.fontSm h1 {
              font-size: 27px; 
            }

            .gemma.fontSm h2 {
              font-size: 18px;
            }

            .gemma.fontSm h3 {
              font-size: 15px;
            }

            .gemma.fontSm p {
              font-size: 12px;
            }

            /* base */

            .gemma.fontBase h1 {
              font-size: 28.8px; 
            }

            .gemma.fontBase h2 {
              font-size: 19.2px;
            }

            .gemma.fontBase h3 {
              font-size: 16px;
            }

            .gemma.fontBase p {
              font-size: 12.8px;
            }

            /* medium */

            .gemma.fontMd h1 {
              font-size: 32.4px; 
            }

            .gemma.fontMd h2 {
              font-size: 21.6px;
            }

            .gemma.fontMd h3 {
              font-size: 18px;
            }

            .gemma.fontMd p {
              font-size: 14.4px;
            }

            /* large */

            .gemma.fontLg h1 {
              font-size: 36px; 
            }

            .gemma.fontLg h2 {
              font-size: 24px;
            }

            .gemma.fontLg h3 {
              font-size: 20px;
            }

            .gemma.fontLg p {
              font-size: 16px;
            }

            /* SPACING */

            /* small */

            .gemma.spacingSm {
              line-height: 1.2;
            }

            /* base */

            .gemma.spacingBase {
              line-height: 1.5;
            }

            /* mdeium */

            .gemma.spacingMd {
              line-height: 1.7;
            }

            /* large */

            .gemma.spacingLg {
              line-height: 2;
            }

            /* COLLUMN LAYOUT */

            /* 1-2 */

            .gemma.column-1-2 {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              grid-row: 1;
              gap: 20px
            }

            .gemma.column-1-2 div:nth-child(1) {
              grid-column: span 1 / span 1;
            }

            .gemma.column-1-2 div:nth-child(2) {
              grid-column: span 2 / span 2;
            }

            /* 1-1 */

            .gemma.column-1-1 {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              grid-row: 1;
              gap: 20px
            }

            .gemma.column-1-1 div:nth-child(1) {
              grid-column: span 1 / span 1;
            }

            .gemma.column-1-1 div:nth-child(2) {
              grid-column: span 1 / span 1;
            }

            /* 2 - 1 */

            .gemma.column-2-1 {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              grid-row: 1;
              gap: 20px
            }

            .gemma.column-2-1 div:nth-child(1) {
              grid-column: span 2 / span 2;
            }

            .gemma.column-2-1 div:nth-child(2) {
              grid-column: span 1 / span 1;
            }

            /* COLOR */

            /* black */

            .gemma h2:before {
              background: #222222;
              content: "";
              height: 2px;
              left: 0;
              position: absolute;
              width: 32px;
              top: 50%;
              transform: translateY(-50%);
            }

            .gemma.black li::marker {
              color: #222222;
            }

            .vega.black code {
              background-color: rgba(34, 34, 34, 0.15);
              color: #222222;
              padding: 1px 6px;
              border-radius: 10%;
            }

            /* red */

            .gemma.red h2::before {
              background: #E8384F;
              content: "";
              height: 2px;
              left: 0;
              position: absolute;
              width: 32px;
              top: 50%;
              transform: translateY(-50%);
            }

            .gemma.red code {
              background-color: rgba(232, 56, 79, 0.15);
              color: #E8384F;
              padding: 1px 6px;
              border-radius: 10%;
            }

            .gemma.red li::marker {
              color: #E8384F;
            }

            /* orange */

            .gemma.orange h2::before {
              background: #E67E22;
              content: "";
              height: 2px;
              left: 0;
              position: absolute;
              width: 32px;
              top: 50%;
              transform: translateY(-50%);
            }

            .gemma.orange code {
              background-color: rgba(230, 126, 34, 0.15);
              color: #E67E22;
              padding: 1px 6px;
              border-radius: 10%;
            }

            .gemma.orange li::marker {
              color: #E67E22;
            }

            /* yellow */

            .gemma.yellow h2::before {
              background: #F1C40F;
              content: "";
              height: 2px;
              left: 0;
              position: absolute;
              width: 32px;
              top: 50%;
              transform: translateY(-50%);
            }

            .gemma.yellow code {
              background-color: rgba(241, 196, 15, 0.15);
              color: #F1C40F;
              padding: 1px 6px;
              border-radius: 10%;
            }

            .gemma.yellow li::marker {
              color: #F1C40F;
            }

            /* green */

            .gemma.green h2::before {
              background: #A4CF30;
              content: "";
              height: 2px;
              left: 0;
              position: absolute;
              width: 32px;
              top: 50%;
              transform: translateY(-50%);
            }

            .gemma.green code {
              background-color: rgba(164, 207, 48, 0.15);
              color: #A4CF30;
              padding: 1px 6px;
              border-radius: 10%;
            }

            .gemma.green li::marker {
              color: #A4CF30;
            }

            /* cyan */

            .gemma.cyan h2::before {
              background: #1ABC9C;
              content: "";
              height: 2px;
              left: 0;
              position: absolute;
              width: 32px;
              top: 50%;
              transform: translateY(-50%);
            }

            .gemma.cyan code {
              background-color: rgba(26, 188, 156, 0.15);
              color: #1ABC9C;
              padding: 1px 6px;
              border-radius: 10%;
            }

            .gemma.cyan li::marker {
              color: #1ABC9C;
            }

            /* blue */

            .gemma.blue h2::before {
              background: #016EF1;
              content: "";
              height: 2px;
              left: 0;
              position: absolute;
              width: 32px;
              top: 50%;
              transform: translateY(-50%);
            }

            .gemma.blue code {
              background-color: rgba(1, 110, 241, 0.15);
              color: #016EF1;
              padding: 1px 6px;
              border-radius: 10%;
            }

            .gemma.blue li::marker {
              color: #016EF1;
            }

            /* purple */

            .gemma.purple h2::before {
              background: #7A6FF0;
              content: "";
              height: 2px;
              left: 0;
              position: absolute;
              width: 32px;
              top: 50%;
              transform: translateY(-50%);
            }

            .gemma.purple code {
              background-color: rgba(122, 111, 240, 0.15);
              color: #7A6FF0;
              padding: 1px 6px;
              border-radius: 10%;
            }

            .gemma.purple li::marker {
              color: #7A6FF0;
            }

            /* pink */

            .gemma.pink h2::before {
              background: #E362E3;
              content: "";
              height: 2px;
              left: 0;
              position: absolute;
              width: 32px;
              top: 50%;
              transform: translateY(-50%);
            }

            .gemma.pink code {
              background-color: rgba(227, 98, 227, 0.15);
              color: #E362E3;
              padding: 1px 6px;
              border-radius: 10%;
            }

            .gemma.pink li::marker {
              color: #E362E3;
            }

            /* gray */

            .gemma.gray h2::before {
              background: #8DA3A6;
              content: "";
              height: 2px;
              left: 0;
              position: absolute;
              width: 32px;
              top: 50%;
              transform: translateY(-50%);
            }

            .gemma.gray code {
              background-color: rgba(141, 163, 166, 0.15);
              color: #8DA3A6;
              padding: 1px 6px;
              border-radius: 10%;
            }

            .gemma.gray li::marker {
              color: #8DA3A6;
            }

            /* GLOBAL */


            .gemma h1 {
              padding-bottom: 0px;
              position: relative;
            }

            .gemma h1 b, .gemma h1 strong {
              font-weight: 700;
            }

            b, strong {
              font-weight: 500;
            }

            .gemma h2 {
              padding-bottom: 4px;
              margin-top: 19.2px;
              position: relative;
              padding-left: 40px;
              text-transform: uppercase;
              font-weight: 550;
            }

            .gemma h3 {
              margin-top: 8px;
            }

            .gemma p {
              margin-top: 0px;
              margin-bottom: 0;
            }

            .gemma ul {
              list-style-type: square;
              list-style-position: outside;
              padding-left: 20px;
              margin: 0;
              display: block;
            }

            .gemma li {
              padding-left: 15px;
            }

            .gemma table {
              width: 100%;
            }

            .gemma strong {
              font-weight: 500;
            }

            .gemma table td {
              justify-content: center;
            }

            .gemma table p {
              margin: 0;
            }

            .gemma table h3 {
              margin: 0;
            }

            .gemma td:nth-last-child(1) {
              text-align: right;
            }

            .gemma hr {
              border: 1px solid #ddd9d9;
              margin-block: 12px;
            }

            .gemma p img {
              height: 140px;
              border-radius: 4px;
              float: left;
              margin-right: 2rem;
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