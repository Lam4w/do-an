import { Columns2, PanelLeft, PanelRight } from "lucide-react";

export const markdownSyntax = [
  {
    ele: "Heading 1",
    syntax: "#",
    caret: 1,
  },
  {
    ele: "Heading 2",
    syntax: "##",
    caret: 1,
  },
  {
    ele: "Heading 3",
    syntax: "###",
    caret: 3,
  },
  {
    ele: "Bold",
    syntax: "****",
    caret: 1,
  },
  {
    ele: "Italic",
    syntax: "**",
    caret: 0,
  },
  {
    ele: "Blockquote",
    syntax: ">",
    caret: 1,
  },
  {
    ele: "Unordered List",
    syntax: "-",
    caret: 2,
  },
  {
    ele: "Divider",
    syntax: "---",
    caret: 3,
  },
];

export const designTemplates = [
  {
    template: "Indius",
  },
  {
    template: "Vega",
  },
  {
    template: "Gemma",
  },
];

export const titleAlignment = [
  {
    value: "alignLeft",
    alignment: "Left",
  },
  {
    value: "alignCenter",
    alignment: "Center",
  },
  {
    value: "alignRight",
    alignment: "Right",
  },
]

export const defaultColors = [
  "#E8384F",
  "#E74C3C",
  "#E67E22",
  "#F1C40F",
  "#A4CF30",
  "#2ECC71", 
  "#1ABC9C",
  "#016EF1",
  "#7A6FF0",
  "#E362E3",
  "#8DA3A6",
  "#222222",
]

export const defaultContent = JSON.stringify({
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Wow, this editor instance exports its content as JSON."
        }
      ]
    }
  ]
})

export const fontSize = [
  'fontSm',
  'fontBase',
  'fontMd',
  'fontLg',
]

export const spacingSize = [
  'spacingSm',
  'spacingBase',
  'spacingMd',
  'spacingLg',
]

export const columnsLayout = [
  {
    value: "column-1-2",
    icon: PanelLeft,
  },
  {
    value: "column-1-1",
    icon: Columns2,
  },
  {
    value: "column-2-1",
    icon: PanelRight,
  }
]

export type EditorBtns =
  | 'text'
  | 'container'
  | 'section'
  | 'contactForm'
  | 'link'
  | '2Col'
  | 'video'
  | '__body'
  | 'image'
  | null
  | '3Col'

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
  opacity: '100%',
}