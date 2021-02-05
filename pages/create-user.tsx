import React, { useState, useReducer } from "react";
import {
  initialState,
  createUserReducer,
  createUser,
  IUserData,
} from "../lib/api";
import LayoutPage from "../components/layout-page";

import styles from "../styles/Home.module.css";

const userState = {
  firstName: "",
  lastName: "",
};

const CreateUserPage: React.FC = () => {
  const [{ isLoading, isSuccess, hasError, message }, dispatch] = useReducer(
    createUserReducer,
    initialState
  );
  const [userData, setUserData] = useState<IUserData>(userState);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const { firstName, lastName } = userData;
  return (
    <LayoutPage title="Create User">
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          createUser(dispatch, userData);
        }}
        className={styles.form}
        title="form"
      >
        <input
          name="firstName"
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={handleChange}
          className={styles.input}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
          data-testid="submit"
        >
          Create user
        </button>
      </form>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {isSuccess && (
            <p role="success" className={styles.msgSuccess}>
              {message}
            </p>
          )}
          {hasError && (
            <p role="alert" className={styles.msgError}>
              {message}
            </p>
          )}
        </div>
      )}
    </LayoutPage>
  );
};

export default CreateUserPage;
