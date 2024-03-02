import { JSONContent } from "novel";
import { create } from 'zustand'

type Settings = {
  layout: string,
  template: string,
  spacing: number,
  fontSize: number,
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
}

const useSnapshotContent = create<SnapshotContentStore>((set) => ({
  contentMain: {},
  setContentMain(newContent) {
    set((state) => ({
      ...state,
      contentMain: newContent
    }))
  },
  contentSide: {},
  setContentSide(newContent) {
    set((state) => ({
      ...state,
      contentSide: newContent
    }))
  },
  settings: {
    layout: "onecol",
    template: "Indius",
    spacing: 1,
    fontSize: 12,
    color: "#00000", 
    titleAlignment: "center",
  },
  setSettings(name, value) {
    set((state) => ({
      ...state,
      settings: {
        ...state.settings,
        [name]: value
      }
    }))
  },
  setDefaultSettings(defaultSettings) {
    set((state) => ({
      ...state,
      settings: defaultSettings
    }))
  },
  title: "",
  setTitle(newTitle) {
    set((state) => ({
      ...state,
      title: newTitle
    }))
  },
}))

export default useSnapshotContent