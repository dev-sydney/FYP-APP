import React from 'react';
import { UilUserPlus, UilTimes } from '@iconscout/react-unicons';

import './../styles/departmentCoursesStyle.scss';

const AssignedLecturersPage = () => {
  return (
    <div className="assigned__container">
      <section className="headings__section">
        <div className="icon">
          <UilUserPlus
            size="45"
            color="#8E18B9"
            style={{
              padding: '.5em',
              borderRadius: '50%',
              background: '#8e18b930',
            }}
          />
        </div>
        <h1>
          Manage <br />
          Professors
        </h1>
      </section>

      <section className="lists__section">
        <div className="list__items">
          <div className="profItem">
            <div className="prof__info">
              <img
                src={`/img/users/user-2-1669769802456.jpeg`}
                style={{
                  maxHeight: '4em',
                  minHeight: '4em',
                  minWidth: '4em',
                  maxWidth: '4em',
                  borderRadius: '20px',
                  marginTop: '.4em',
                }}
                className="prof_photo"
              />
              <div className="name__privilege">
                <h2>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  dolorem sunt temporibus molestias quibusdam, error, repellat
                  quae quidem est quisquam atque. Perspiciatis excepturi
                  corrupti omnis nihil velit, blanditiis fugiat placeat!
                </h2>
                <p>lecturer</p>
              </div>
              <div
                className="list_controls"
                style={{ display: 'flex', marginLeft: 'auto' }}
              >
                <div
                  className="deallocate_icon"
                  //   style={{ marginRight: '.4em' }}
                >
                  <UilTimes
                    size="40"
                    color="#FF0000"
                    style={{
                      padding: '.5em',
                      borderRadius: '50%',
                      backgroundColor: '#ca14141a',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="profItem">
            <div className="prof__info">
              <img
                src={`/img/users/user-2-1669769802456.jpeg`}
                style={{
                  maxHeight: '4em',
                  minHeight: '4em',
                  minWidth: '4em',
                  maxWidth: '4em',
                  borderRadius: '20px',
                  marginTop: '.4em',
                }}
                className="prof_photo"
              />
              <div className="name__privilege">
                <h2>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  dolorem sunt temporibus molestias quibusdam, error, repellat
                  quae quidem est quisquam atque. Perspiciatis excepturi
                  corrupti omnis nihil velit, blanditiis fugiat placeat!
                </h2>
                <p>lecturer</p>
              </div>
            </div>
          </div>
          <div className="profItem">
            <div className="prof__info">
              <img
                src={`/img/users/user-2-1669769802456.jpeg`}
                style={{
                  maxHeight: '4em',
                  minHeight: '4em',
                  minWidth: '4em',
                  maxWidth: '4em',
                  borderRadius: '20px',
                  marginTop: '.4em',
                }}
                className="prof_photo"
              />
              <div className="name__privilege">
                <h2>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  dolorem sunt temporibus molestias quibusdam, error, repellat
                  quae quidem est quisquam atque. Perspiciatis excepturi
                  corrupti omnis nihil velit, blanditiis fugiat placeat!
                </h2>
                <p>lecturer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssignedLecturersPage;
