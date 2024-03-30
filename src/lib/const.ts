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
  {
    color: "#E8384F",
    value: "red"
  },
  {
    color: "#E67E22",
    value: "orange"
  },
  {
    color: "#F1C40F",
    value: "yellow"
  },
  {
    color: "#A4CF30",
    value: "green"
  },
  {
    color: "#1ABC9C",
    value: "cyan"
  },
  {
    color: "#016EF1",
    value: "blue"
  },
  {
    color: "#7A6FF0",
    value: "purple"
  },
  {
    color: "#E362E3",
    value: "pink"
  },
  {
    color: "#8DA3A6",
    value: "gray"
  },
  {
    color: "#222222",
    value: "black"
  },
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