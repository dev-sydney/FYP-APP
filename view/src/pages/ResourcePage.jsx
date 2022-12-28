import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import authContext from '../contexts/AuthContext';

/* ------FORM COMPONENTS FOR ADDING RESOURCES------ */
import AddProfessorForm from '../components/AddProfessorForm';
import AddLectureRoomForm from '../components/AddLectureRoomForm';
import AddCourseForm from '../components/AddCourseForm';
import AddFacultyForm from '../components/AddFacultyForm';

import ModalBackground from '../components/ModalBackground';
/**
 * This component renders all the controls for managing the various resources(lecture rooms,faculties,professors, etc)
 * @returns
 */
const ResourcePage = () => {
  const authContxt = useContext(authContext);
  const navigateTo = useNavigate();
  //TODO: CHECK IF THE USER IS AUTHORISED TO VISIT THIS PAGE(LOGIN AND PRIVILEGE)
  useEffect(() => {});
  const [isAddProfessorActive, setIsAddProfessorActive] = useState(false);
  const [isAddLectureRoomActive, setIsAddLectureRoomActive] = useState(false);
  const [isAddNewCourseActive, setIsAddNewCourseActive] = useState(false);
  const [isAddNewFacultyActive, setIsAddNewFacultyActive] = useState(false);

  const onBtnClick = (state, setStateFn) => () => {
    setStateFn(!state);
  };
  return (
    <Fragment>
      <h2>ResourcePage</h2>
      <button
        onClick={onBtnClick(isAddProfessorActive, setIsAddProfessorActive)}
      >
        Add professor
      </button>
      <button
        onClick={onBtnClick(isAddLectureRoomActive, setIsAddLectureRoomActive)}
      >
        Add lecture room
      </button>
      <button
        onClick={onBtnClick(isAddNewCourseActive, setIsAddNewCourseActive)}
      >
        Add new course
      </button>
      <button
        onClick={onBtnClick(isAddNewFacultyActive, setIsAddNewFacultyActive)}
      >
        Add new faculty
      </button>
      {/* NOTE:----CONDTIONAL RENDERING FOR THE ADD PROFESSOR FORM MODAL---- */}
      {isAddProfessorActive ? (
        <ModalBackground
          children={
            <AddProfessorForm
              isAddProfessorActive={isAddProfessorActive}
              setIsAddProfessorActive={setIsAddProfessorActive}
            />
          }
        />
      ) : (
        ''
      )}
      {/* NOTE:----CONDTIONAL RENDERING FOR THE ADD LECTURE-ROOM FORM MODAL---- */}
      {isAddLectureRoomActive ? (
        <ModalBackground
          children={
            <AddLectureRoomForm
              isAddLectureRoomActive={isAddLectureRoomActive}
              setIsAddLectureRoomActive={setIsAddLectureRoomActive}
            />
          }
        />
      ) : (
        ''
      )}
      {/* NOTE:----CONDTIONAL RENDERING FOR THE ADD FACULTY FORM MODAL---- */}
      {isAddNewFacultyActive ? (
        <ModalBackground
          children={
            <AddFacultyForm
              isAddNewFacultyActive={isAddNewFacultyActive}
              setIsAddNewFacultyActive={setIsAddNewFacultyActive}
            />
          }
        />
      ) : (
        ''
      )}
      {/* NOTE:----CONDTIONAL RENDERING FOR THE ADD COURSE FORM MODAL---- */}
      {isAddNewCourseActive ? (
        <ModalBackground
          children={
            <AddCourseForm
              isAddNewCourseActive={isAddNewCourseActive}
              setIsAddNewCourseActive={setIsAddNewCourseActive}
            />
          }
        />
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default ResourcePage;
