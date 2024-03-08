import { JSONContent } from "novel";
import { create } from 'zustand'
import { useGetSnapshot } from "./client/queries";
import { Snapshot } from "@prisma/client";

type Settings = {
  layout: string,
  template: string,
  spacing: string,
  fontSize: string,
  color: string, 
  titleAlignment: string,
};

type SnapshotContentStore = {
  contentMain: JSONContent;
  setContentMain: (newContent: JSONContent) => void;
  contentSide: JSONContent;
  setContentSide: (newContent: JSONContent) => void;
  settings: Settings
  setSettings: (name: string, value: string | number) => void;
  setDefaultSettings: (settings: Settings) => void;
  title: string;
  setTitle: (newTitle: string) => void;
  resetSnapshot: () => void;
  id: string;
  setId: (newId: string) => void;
  cvId: string;
  setCvId: (newId: string) => void;
}

const useSnapshotContent = create<SnapshotContentStore>((set) => ({
  contentMain: {},
  setContentMain: (newContent) => {
    set((state) => ({
      ...state,
      contentMain: newContent
    }))
    // set(() => ({ contentMain: newContent }))
  },
  contentSide: {},
  setContentSide: (newContent) => {
    set((state) => ({
      ...state,
      contentSide: newContent
    }))
  },
  settings: {
    layout: "oneCol",
    template: "Indius",
    spacing: "spacingBase",
    fontSize: "fontBase",
    color: "#00000", 
    titleAlignment: "center",
  },
  setSettings: (name, value) => {
    set((state) => ({
      ...state,
      settings: {
        ...state.settings,
        [name]: value
      }
    }))
  },
  setDefaultSettings: (defaultSettings) => {
    set((state) => ({
      ...state,
      settings: defaultSettings
    }))
  },
  title: "",
  setTitle: (newTitle) => {
    set((state) => ({
      ...state,
      title: newTitle
    }))
  },
  resetSnapshot: () => {
    set((state) => ({
      ...state,
      title: "",
      contentMain: {},
      contentSide: {},
      settings: {
        layout: "oneCol",
        template: "Indius",
        spacing: "spacingBase",
        fontSize: "fontBase",
        color: "#00000", 
        titleAlignment: "center",
      }
    }))
  },
  id: "",
  setId: (newId) => {
    set((state) => ({
      ...state,
      id: newId, 
    }))
  },
  cvId: "",
  setCvId: (newId) => {
    set((state) => ({
      ...state,
      cvId: newId,
    }))
  },
}))

export default useSnapshotContent