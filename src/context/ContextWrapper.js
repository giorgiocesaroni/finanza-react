import React, { useState, createContext, useEffect } from "react";
import { useTestDatabase } from "../repository/useTestDatabase";
import { useOnline } from "../utility/useOnline";
import { login, logout } from "../auth/auth-with-google";

export const Context = createContext();

export const ContextWrapper = (props) => {
  const [testDatabase, testAddEntry, testUpdateEntry, testDeleteEntry] =
    useTestDatabase();

  const isOnline = useOnline();

  const [isOpen, setOpen] = useState(false);

  const [context, setContext] = useState({
    auth: null,
    database: testDatabase,
    state: {
      isEditing: false,
      editingId: null,
    },
  });

  const testDatabaseDAO = {
    addEntry: testAddEntry,
    updateEntry: testUpdateEntry,
    deleteEntry: testDeleteEntry,
  };

  useEffect(() => {
    updateContext({ database: testDatabase });
  }, [testDatabase]);

  function updateContext(update) {
    return setContext((prev) => ({ ...prev, ...update }));
  }

  function toggleEditing(id) {
    if (id) {
      return updateContext({ state: { isEditing: true, editingId: id } });
    }
    return updateContext({ state: { isEditing: false, editingId: null } });
  }

  return (
    <Context.Provider
      value={{
        context,
        updateContext,
        toggleEditing,
        testDatabaseDAO,
        isOnline,
        isOpen,
        setOpen,
        login,
        logout,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
