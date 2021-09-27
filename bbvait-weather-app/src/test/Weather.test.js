import React from 'react'
import  '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from "@testing-library/react";
import { prettyDOM } from "@testing-library/react";
import { renderHook, act } from '@testing-library/react-hooks'
import Weather from '../components/Weather'
test("renders content Weather", () => {   
   /* const city = 'Madrid';
    const { result } = renderHook(() => Weather(city))

    act(() => 
   console.log(result.current) 
    )*/
  });