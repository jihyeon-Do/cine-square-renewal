import React, { useRef, useState, useEffect } from 'react';

interface personInfo {
  name: string;
  work: string;
  averageScore: number;
  img: string;
}

interface person {
  person: Array<personInfo>;
}

export default function PersonListBox({ person }: person) {
  return (
    <div className="person-info">
      <ul>
        {person.map((v: any, i: any) => (
          <li key={i}>
            <div>
              <figure>
                <img
                  src={v.img === '' ? '../images/profile_picture.png' : v.img}
                  alt=""
                />
              </figure>
              <div>
                <p className="person-name">{v.name}</p>
                <p className="person-work">{v.work}</p>
              </div>
            </div>
            <div>{v.averageScore}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
