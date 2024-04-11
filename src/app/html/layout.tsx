import { Work_Sans } from 'next/font/google'
import '../_styles/indius.css'
import '../_styles/vega.css'
import '../_styles/gemma.css'
import '../_styles/defaultTemplateStylings.css'

const workSans = Work_Sans({ subsets: ['latin'] })

export default function HtmlLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={workSans.className}>
      {/* <div className="">hello</div> */}
      {children}
    </div>
  );
}