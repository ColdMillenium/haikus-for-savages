import create from 'zustand'

const useStore = create(set => ({
  username: "",
  setUsername: (username) => set({ username: username}),
}))

export default useStore;