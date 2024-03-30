'use client'

import React, { ChangeEventHandler } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import {
  AlignCenter,
  AlignCenterVertical,
  AlignEndVertical,
  AlignHorizontalDistributeStart,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignStartVertical,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
  LucideImageDown,
} from 'lucide-react'
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/Tabs'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { useEditor } from '@/providers/pageEditor/PageEditorProvider'
import { Slider } from '@/components/ui/Slider'
import { Checkbox } from '@/components/ui/Checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip'


const SettingsTab = () => {
  const { state, dispatch } = useEditor()

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id
    let value = e.target.value
    const styleObject = {
      [styleSettings]: value,
    }

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    })
  }

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id
    let value = e.target.value
    const styleObject = {
      [settingProperty]: value,
    }

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    })
  }

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Typography', 'Dimensions', 'Decorations', 'Flexbox']}
    >
      <AccordionItem
        value="Custom"
        className="px-6 py-0  "
      >
        <AccordionTrigger className="!no-underline">Custom</AccordionTrigger>
        <AccordionContent>
          {state.editor.selectedElement.type === 'link' &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground">Link Path</Label>
                <Input
                  id="href"
                  placeholder="https:domain.example.com/pathname"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.href}
                />
              </div>
            )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="Typography"
        className="px-6 py-0  border-y-[1px]"
      >
        <AccordionTrigger className="!no-underline">
          Typography
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 ">
          <div className="flex flex-col gap-2 ">
            <Label className="text-muted-foreground">Text Align</Label>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'textAlign',
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.textAlign}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="left"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignLeft size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Align left</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="right"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignRight size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Align right</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="center"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignCenter size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Align center</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="justify"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                      >
                        <AlignJustify size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Align justify</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Font Family</Label>
            <Input
              id="DM Sans"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.fontFamily}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Color</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundColor:
                    state.editor.selectedElement.styles.color,
                }}
              />
              <Input
                id="color"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.color}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className='flex flex-col space-y-2'>
              <Label className="text-muted-foreground">Weight</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: 'font-weight',
                      value: e,
                    },
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Font Weights</SelectLabel>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="normal">Regular</SelectItem>
                    <SelectItem value="lighter">Light</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col space-y-2'>
              <Label className="text-muted-foreground">Size</Label>
              <Input
                placeholder="px"
                id="fontSize"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.fontSize}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="Dimensions"
        className=" px-6 py-0 "
      >
        <AccordionTrigger className="!no-underline">
          Dimensions
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div className='flex flex-col space-y-2'>
                    <Label className="text-muted-foreground">Height</Label>
                    <Input
                      id="height"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.height}
                    />
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <Label className="text-muted-foreground">Width</Label>
                    <Input
                      placeholder="px"
                      id="width"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.width}
                    />
                  </div>
                </div>
              </div>
              <Label className="text-base text-black">Margin</Label>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div className='flex flex-col space-y-2'>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      id="marginTop"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.marginTop}
                    />
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      placeholder="px"
                      id="marginBottom"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.marginBottom}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className='flex flex-col space-y-2'>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="marginLeft"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.marginLeft}
                    />
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      placeholder="px"
                      id="marginRight"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.marginRight}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-base text-black">Padding</Label>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div className='flex flex-col space-y-2'>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      placeholder="px"
                      id="paddingTop"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.paddingTop}
                    />
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      placeholder="px"
                      id="paddingBottom"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.paddingBottom}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className='flex flex-col space-y-2'>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="paddingLeft"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.paddingLeft}
                    />
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      placeholder="px"
                      id="paddingRight"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.paddingRight}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="Decorations"
        className="px-6 py-0 "
      >
        <AccordionTrigger className="!no-underline">
          Decorations
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div>
            <Label className="text-muted-foreground">Opacity</Label>
            <div className="flex items-center justify-end">
              <small className="">
                {typeof state.editor.selectedElement.styles?.opacity ===
                'number'
                  ? state.editor.selectedElement.styles?.opacity
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.opacity || '0'
                      ).replace('%', '')
                    ) || 0}
                %
              </small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: 'opacity',
                    value: `${e[0]}%`,
                  },
                })
              }}
              defaultValue={[
                typeof state.editor.selectedElement.styles?.opacity === 'number'
                  ? state.editor.selectedElement.styles?.opacity
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.opacity || '0'
                      ).replace('%', '')
                    ) || 0,
              ]}
              max={100}
              step={1}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Border Color</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundColor:
                    state.editor.selectedElement.styles.borderColor,
                }}
              />
              <Input
                placeholder="#HFI245"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="borderColor"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.borderColor}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className='flex flex-col space-y-2'>
              <Label className="text-muted-foreground">Border Styles</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: 'border-style',
                      value: e,
                    },
                  })
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Styles</SelectLabel>
                    <SelectItem value="dotted">Dotted</SelectItem>
                    <SelectItem value="dashed">Dashed</SelectItem>
                    <SelectItem value="solid">Solid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col space-y-2'>
              <Label className="text-muted-foreground">Border width</Label>
              <Input
                placeholder="px"
                id="borderWidth"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.borderWidth}
              />
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Border Radius</Label>
            <div className="flex items-center justify-end">
              <small className="">
                {typeof state.editor.selectedElement.styles?.borderRadius ===
                'number'
                  ? state.editor.selectedElement.styles?.borderRadius
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.borderRadius || '0'
                      ).replace('px', '')
                    ) || 0}
                px
              </small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: 'borderRadius',
                    value: `${e[0]}px`,
                  },
                })
              }}
              defaultValue={[
                typeof state.editor.selectedElement.styles?.borderRadius ===
                'number'
                  ? state.editor.selectedElement.styles?.borderRadius
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.borderRadius || '0'
                      ).replace('%', '')
                    ) || 0,
              ]}
              max={100}
              step={1}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Color</Label>
            <div className="flex  border-[1px] rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundColor:
                    state.editor.selectedElement.styles.backgroundColor,
                }}
              />
              <Input
                placeholder="#HFI245"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundColor"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.backgroundColor}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Image</Label>
            <div className="flex  border-[1px] rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundImage:
                    state.editor.selectedElement.styles.backgroundImage,
                }}
              />
              <Input
                placeholder="url()"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundImage"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.backgroundImage}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Image Position</Label>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'backgroundSize',
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.backgroundSize?.toString()}
            >
              <TabsList className="flex items-center flex-row justify-start border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="cover"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <ChevronsLeftRightIcon size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cover</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="contain"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignVerticalJustifyCenter size={22} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Contain</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="auto"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <LucideImageDown size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Auto</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="Flexbox"
        className="px-6 py-0  "
      >
        <AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center justify-between gap-2 pt-3">
            <Label className="text-muted-foreground">Flex</Label>
            <Checkbox 
              id="display" 
              onCheckedChange={(val) => {
                handleOnChanges({
                  target: {
                    id: 'display',
                    value: val ? 'flex' : 'block',
                  },
                })
              }} />
          </div>
          <div className='flex flex-col space-y-2 pt-3'>
            <Label className="text-muted-foreground">Justify Content</Label>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'justifyContent',
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.justifyContent}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="space-between"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignHorizontalSpaceBetween size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Space between</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="space-evenly"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignHorizontalSpaceAround size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Space evenly</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="center"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignHorizontalJustifyCenterIcon size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Center</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="start"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                      >
                        <AlignHorizontalJustifyStart size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Start</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="end"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                      >
                        <AlignHorizontalJustifyEndIcon size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>End</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsList>
            </Tabs>
          </div>
          <div className='flex flex-col space-y-2 pt-3'>
            <Label className="text-muted-foreground">Align Items</Label>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'alignItems',
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.alignItems}
            >
              <TabsList className="flex items-center justify-start flex-row border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="normal"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                      >
                        <AlignHorizontalDistributeStart size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Normal</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="start"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignStartVertical size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Start</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="center"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignCenterVertical size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Center</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="end"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                      >
                        <AlignEndVertical size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>End</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsList>
            </Tabs>
          </div>
          <div className='flex flex-col space-y-2 pt-3'>
            <Label className="text-muted-foreground">Direction</Label>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'flexDirection',
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.alignItems}
            >
              <TabsList className="flex items-center justify-start flex-row border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="row"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                      >
                        <AlignHorizontalJustifyStart size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Row</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="row-reverse"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignHorizontalJustifyEnd size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Row reverse</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="column"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                      >
                        <AlignVerticalJustifyStart size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Column</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger
                        value="column-reverse"
                        className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                      >
                        <AlignVerticalJustifyEnd size={18} />
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Column reverse</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default SettingsTab