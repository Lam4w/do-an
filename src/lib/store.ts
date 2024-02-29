import axios from "axios";
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
}

const useSnapshotContent = create<SnapshotContentStore>((set) => ({
  contentMain: {},
  setContentMain(newContent: JSONContent) {
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
  }
}))

export default useSnapshotContent