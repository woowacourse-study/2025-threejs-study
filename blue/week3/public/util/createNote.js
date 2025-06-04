import { loadGLBModel } from "../../loaders/loadGLBModel";

export const createNote = () => {
  return new Promise((resolve) => {
    loadGLBModel("/models/note.glb", (note) => {
      note.scale.set(10, 10, 10);
      resolve(note);
    });
  });
};
