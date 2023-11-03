import React from "react";
import {render,waitFor,screen} from '@testing-library/react';
import News from "./News";

describe('News component', () => {
 test('renders news articles correctly', async () => {
     global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ articles: [] }),
    })
 );
render(<News/>)

await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5c262edcf55c438aa6986a27587940e7"
   
    );
})
 });


});