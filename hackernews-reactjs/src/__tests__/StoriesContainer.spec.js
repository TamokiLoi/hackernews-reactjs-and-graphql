import { cleanup, render, waitFor } from '@testing-library/react';
import React from 'react';
import { STORY_INCREMENT } from '../constants';
import { StoriesContainer } from '../containers/StoriesContainer';
import { singularStory, storyIds } from '../fixtures';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { getStory, getStoryIds } from '../services/hackerNewsApi';

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll.js');

jest.mock('../services/hackerNewsApi.js', () => ({
    getStory: jest.fn(),
    getStoryIds: jest.fn(),
}));

test('renders the story container with a story', async () => {
    useInfiniteScroll.mockImplementation(() => ({
        count: STORY_INCREMENT,
    }));
    getStory.mockImplementation(() => Promise.resolve(singularStory));
    getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

    const { getByText, queryByTestId } = render(<StoriesContainer />);
    await waitFor(() => [
        expect(getByText('Hacker News Stories')).toBeTruthy(),
        expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
        expect(queryByTestId('story-by').textContent).toEqual('By: Karl Hadwen'),
    ]);
});