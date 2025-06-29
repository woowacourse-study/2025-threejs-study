import { loadGLBModel } from '../loaders/loadGLBModel';

const createNote = () => {
  return new Promise((resolve) => {
    loadGLBModel('./models/note.glb', (note) => {
      note.scale.set(10, 10, 10);
      resolve(note);
    });
  });
};

export const createNotes = (count) => {
  const promises = [];

  for (let i = 0; i < count; i++) {
    const promise = createNote().then((note) => {
      note.position.set(0, i * 10, 0);
      return note;
    });
    promises.push(promise);
  }

  return Promise.all(promises);
};
