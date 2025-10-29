import React, { createContext, useReducer, useEffect } from 'react';

export const ProfileContext = createContext();

// storage keys
const STORAGE_KEY_PROFILES = 'userProfiles_v1';
const STORAGE_KEY_ITEMS = 'sharedItems_v1';

const defaultProfile = {
  id: 1,
  name: 'Lakshya Deewan',
  avatar: 'https://via.placeholder.com/150',
  bio: 'Software Developer at XYZ Corp',
};

const initialState = {
  profiles: [defaultProfile],
  selectedId: defaultProfile.id,
  // shared items is the additional global list feature
  items: [],
};

function reducer(state, action) {
  switch (action.type) {
    // profiles
    case 'SET_PROFILES':
      return { ...state, profiles: action.payload };
    case 'ADD_PROFILE': {
      const newProfile = { ...action.payload };
      return {
        ...state,
        profiles: [...state.profiles, newProfile],
        selectedId: newProfile.id,
      };
    }
    case 'REMOVE_PROFILE': {
      const profiles = state.profiles.filter((p) => p.id !== action.payload);
      const selectedId = profiles.length ? profiles[0].id : null;
      return { ...state, profiles, selectedId };
    }
    case 'UPDATE_PROFILE': {
      const profiles = state.profiles.map((p) =>
        p.id === action.payload.id ? { ...p, ...action.payload.updates } : p
      );
      return { ...state, profiles };
    }
    case 'SELECT_PROFILE':
      return { ...state, selectedId: action.payload };

    // shared items
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEM': {
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM': {
      return { ...state, items: state.items.filter((it) => it.id !== action.payload) };
    }

    default:
      return state;
  }
}

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const savedProfiles = localStorage.getItem(STORAGE_KEY_PROFILES);
      const savedItems = localStorage.getItem(STORAGE_KEY_ITEMS);
      return {
        ...init,
        profiles: savedProfiles ? JSON.parse(savedProfiles) : init.profiles,
        items: savedItems ? JSON.parse(savedItems) : init.items,
      };
    } catch (e) {
      // ignore parse errors
    }
    return init;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(state.profiles));
    } catch (e) {
      // ignore
    }
  }, [state.profiles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(state.items));
    } catch (e) {
      // ignore
    }
  }, [state.items]);

  // profiles API
  const addProfile = (profile) => {
    const id = profile.id || Date.now();
    dispatch({ type: 'ADD_PROFILE', payload: { ...profile, id } });
  };

  const removeProfile = (id) => {
    dispatch({ type: 'REMOVE_PROFILE', payload: id });
  };

  const updateProfile = (id, updates) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { id, updates } });
  };

  const selectProfile = (id) => {
    dispatch({ type: 'SELECT_PROFILE', payload: id });
  };

  const selectedProfile = state.profiles.find((p) => p.id === state.selectedId) || null;

  // items API (shared list)
  const addItem = (item) => {
    const id = item.id || Date.now();
    dispatch({ type: 'ADD_ITEM', payload: { ...item, id } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles: state.profiles,
        selectedProfile,
        addProfile,
        removeProfile,
        updateProfile,
        selectProfile,
        // items
        items: state.items,
        addItem,
        removeItem,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};