import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Article } from '../components/Article';
import { GET_ALL_ARTICLES } from '../graphql/get-all-articles';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ArticlesContainerWrapper, GlobalStyle } from '../styles/ArticleContainerStyles';

export const ArticlesContainer = () => {

    const { count } = useInfiniteScroll();
    const { data: { allArticles = [] } = {} } = useQuery(GET_ALL_ARTICLES);

    return (
        <>
            <GlobalStyle />
            <ArticlesContainerWrapper data-test-id="articles-container">
                <h1>News Stories</h1>
                {
                    allArticles &&
                    allArticles.slice(0, count).map(article => <Article key={article.id} article={article} />)
                }
            </ArticlesContainerWrapper>
        </>
    )
}
