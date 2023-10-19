import React, { useState, useEffect } from 'react'
import  NewsItem  from './Item/NewsItem'
import Search from './Search';

const NewsList = () => {
    const [articlesFromNewsApi, setArticlesFromNewsApi] = useState([])
    const [articlesFromNWTimesApi, setArticlesFromNWTimesApi] = useState([])
    const [articlesFromTheGuardianApi, setArticlesFromTheGuardianApi] = useState([])

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getNewsApiArticles = async () => {
            try {
                const response = await fetch(
                    'https://newsapi.org/v2/everything?q=everything&apiKey=1d2374b0989c48a98e8b6c8acda8da44'
                );
            
                if (response.ok) {
                  const data = await response.json();
                  setArticlesFromNewsApi(data.articles);
                  console.log(data.articles);
                } else {
                  console.error('Failed to fetch data:', response.status, response.statusText);
                }
              } catch (error) {
                console.error('Error while fetching data:', error);
              }
        }

        getNewsApiArticles()
    }, [])

    useEffect(()=> {
        const getNYTimesArticles = async () => {
            try {
              const response = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=p1YztcMima6YxxxJ5DwSBXvGqDrhoilX');
          
              if (response.ok) {
                const data = await response.json();
                console.log('here',data.response.docs);
                setArticlesFromNWTimesApi(data.response.docs);
              } else {
                console.error('Failed to fetch data:', response.status, response.statusText);
              }
            } catch (error) {
              console.error('Error while fetching data:', error);
            }
          };
        getNYTimesArticles()

    }, [])

    useEffect(()=> {
        const getTheGuardianArticles = async () => {
            try {
              const response = await fetch(`https://content.guardianapis.com/search?api-key=549d592b-eb81-4fbc-80cc-a657797e1879`);
          
              if (response.ok) {
                const data = await response.json();
                setArticlesFromTheGuardianApi(data.response.results);
              } else {
                console.error('Failed to fetch data:', response.status, response.statusText);
              }
            } catch (error) {
              console.error('Error while fetching data:', error);
            }
          };
          getTheGuardianArticles()

    }, [])

    const newsAPIArticles = articlesFromNewsApi.map(article => {
        return {
          title: article.title,
          url: article.url,
          urlToImage: article.urlToImage,
          description: article.description
        };
    });

    const nyTimesArticles = articlesFromNWTimesApi.map(article => {
        return {
            title: article.abstract,
            url: article.web_url,
            urlToImage: article.multimedia.length > 0 ? article.multimedia[0].url : '',
            description: article.abstract
        };
    });

    const theGuardianArticles = articlesFromTheGuardianApi.map(article => {
        return {
            title: article.sectionName,
            url: article.webUrl,
            urlToImage: article.webUrl,
            description: article.webTitle
        };
    });

    const mergedArticles = [...newsAPIArticles, ...nyTimesArticles, ...theGuardianArticles];

    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    const filteredArticles = mergedArticles.filter(article => {
        return article.title.toLowerCase().includes(searchTerm.toLowerCase()); 
    });
    
    return (
        <>
           <Search onSearch={handleSearch} />
            <div className="flex flex-wrap justify-center">

                {filteredArticles.map(article => {
                    return(
                        <NewsItem 
                            title={article.title                        }
                            description={article.description}
                            url={article.url}
                            urlToImage={article.urlToImage}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default NewsList